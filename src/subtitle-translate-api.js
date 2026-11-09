// 授業ライブ字幕（スマホ版）用の翻訳API — POST /subtitles/api/translate
// Cloudflare Workers AI を使用（wrangler.jsonc の "ai" バインディング）。
// 入力：{ text, src: "ja"|"en"|"zh", targets: ["en","zh"...], glossary: [{ja,en,zh}], context }
// 出力：{ source, ja?, en?, zh?, model }
// 標準のAI。Gemma 4 は答える前に長く「考える」ため40秒以上かかり、使えなかった（2026-11-09）。
const LLM_MODEL = "@cf/meta/llama-4-scout-17b-16e-instruct";
// 速さ比べ用に指定できるAI（これ以外は指定できない）
const LLM_CHOICES = [
  "@cf/meta/llama-4-scout-17b-16e-instruct",
  "@cf/qwen/qwen3-30b-a3b-fp8",
  "@cf/mistralai/mistral-small-3.1-24b-instruct",
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/google/gemma-4-26b-a4b-it"
];
const pickModel = m => LLM_CHOICES.includes(m) ? m : LLM_MODEL;
async function runLLM(env, model, messages, max_tokens, timeoutMs = 12000) {
  const t = Date.now();
  // Qwen3 は /no_think で「考える」を止める
  if (model.includes("qwen3")) messages = messages.map((m, i) => i === messages.length - 1 ? { ...m, content: m.content + "\n/no_think" } : m);
  try {
    const out = await Promise.race([
      env.AI.run(model, { messages, max_tokens, temperature: 0.2 }),
      new Promise((_, rej) => setTimeout(() => rej(new Error("timeout " + timeoutMs + "ms")), timeoutMs))
    ]);
    return { text: llmText(out), ms: Date.now() - t };
  } catch (e) {
    return { text: "", ms: Date.now() - t, error: String(e && e.message || e).slice(0, 200) };
  }
}
const MT_MODEL = "@cf/meta/m2m100-1.2b";
const NAMES = { ja: "Japanese", en: "English", zh: "Traditional Chinese as used in Taiwan (繁體中文)" };
const MT_LANG = { ja: "japanese", en: "english", zh: "chinese" };
const MAX_TEXT = 400;
const MAX_TERMS = 80;

const hits = new Map(); // isolate-local, best-effort rate limit
function limited(ip) {
  const now = Date.now(), win = 60_000, max = 90;
  const h = (hits.get(ip) || []).filter(t => now - t < win);
  h.push(now); hits.set(ip, h);
  if (hits.size > 5000) hits.clear();
  return h.length > max;
}
const LOCAL_ORIGIN = /^http:\/\/(localhost|127\.0\.0\.1):87[78]\d$/;
const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" }
});
// パソコン内の起動.cmd（localhost）から呼ばれたときだけ CORS を付ける
async function withCors(request, promise) {
  const res = await promise, origin = request.headers.get("origin") || "";
  if (!LOCAL_ORIGIN.test(origin) || request.method === "OPTIONS") return res;
  const h = new Headers(res.headers); h.set("access-control-allow-origin", origin); h.set("vary", "origin");
  return new Response(res.body, { status: res.status, headers: h });
}
function checkOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  if (LOCAL_ORIGIN.test(origin)) return true;
  try { return new URL(origin).host === new URL(request.url).host; } catch { return false; }
}
function preflight(request) {
  const origin = request.headers.get("origin") || "";
  if (!LOCAL_ORIGIN.test(origin)) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: { "access-control-allow-origin": origin, "access-control-allow-methods": "POST", "access-control-allow-headers": "content-type", "access-control-max-age": "86400", "vary": "origin" } });
}
const clean = (s, n) => String(s ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, n);

function parseJsonLoose(s) {
  if (s && typeof s === "object") return s;
  s = String(s || "").replace(/<think>[\s\S]*?<\/think>/g, "");
  const a = s.indexOf("{"), b = s.lastIndexOf("}");
  if (a < 0 || b <= a) return null;
  try { return JSON.parse(s.slice(a, b + 1)); } catch { return null; }
}
function llmText(out) {
  if (!out) return "";
  if (typeof out.response === "string" || (out.response && typeof out.response === "object")) return out.response;
  const c = out.choices && out.choices[0];
  return c ? (c.message?.content ?? c.text ?? "") : "";
}

export const handleTranslate = (request, env) => withCors(request, translateInner(request, env));
async function translateInner(request, env) {
  if (request.method === "OPTIONS") return preflight(request);
  if (!checkOrigin(request)) return json({ error: "forbidden" }, 403);
  if (request.method !== "POST") return json({ error: "POST only" }, 405);
  if (!env || !env.AI) return json({ error: "AI binding is not configured" }, 503);
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  if (limited(ip)) return json({ error: "too many requests" }, 429);

  let body;
  try { body = await request.json(); } catch { return json({ error: "bad json" }, 400); }
  const src = ["ja", "en", "zh"].includes(body.src) ? body.src : "ja";
  const text = clean(body.text, MAX_TEXT);
  const targets = [...new Set((Array.isArray(body.targets) ? body.targets : []).filter(t => ["ja", "en", "zh"].includes(t) && t !== src))];
  if (!text) return json({ error: "empty" }, 400);
  if (!targets.length) return json({ source: text, model: "none" });
  const glossary = (Array.isArray(body.glossary) ? body.glossary : []).slice(0, MAX_TERMS)
    .map(g => ({ ja: clean(g.ja, 40), en: clean(g.en, 60), zh: clean(g.zh, 40), yomi: clean(g.yomi, 40) }))
    .filter(g => g.ja || g.en || g.zh);
  const context = clean(body.context, 300);
  const model = pickModel(body.model), debug = !!body.debug;
  let llmDebug = null;

  // 1) LLM：用語集を参考に、聞き間違いを直してから翻訳
  try {
    const gl = glossary.length
      ? glossary.map(g => "- " + ["ja", "en", "zh"].filter(k => g[k]).map(k => `${k}: ${g[k]}`).join(" | ") + (g.yomi ? ` (reading: ${g.yomi})` : "")).join("\n")
      : "(none)";
    const keys = ["source", ...targets];
    const system =
`You translate live subtitles for a university lecture or a Japanese storytelling (kōdan) performance.
The input is automatic speech-recognition output in ${NAMES[src]}. It may contain recognition errors, especially homophones (same sound, wrong characters/words).
Glossary of terms used in this class (always prefer these exact forms and translations):
${gl}

Tasks:
1. "source": the input with ONLY clear recognition errors fixed (prefer glossary terms when the sound matches). Do not rephrase, summarize or add words.
2. Translate the corrected source into: ${targets.map(t => `"${t}" = ${NAMES[t]}`).join(", ")}. Use the glossary translations exactly. Keep it natural and concise, suitable for subtitles.
Reply with JSON only, with exactly these keys: ${keys.map(k => `"${k}"`).join(", ")}.`;
    const user = (context ? `Previous subtitle (context only, do not translate): ${context}\n\n` : "") + `Input: ${text}`;
    const r = await runLLM(env, model, [{ role: "system", content: system }, { role: "user", content: user }], 320);
    const data = parseJsonLoose(r.text);
    if (data && targets.every(t => typeof data[t] === "string" && data[t].trim())) {
      const res = { model: "llm", source: typeof data.source === "string" && data.source.trim() ? data.source.trim() : text };
      for (const t of targets) res[t] = data[t].trim();
      if (debug) res.debug = { model, ms: r.ms };
      return json(res);
    }
    llmDebug = { model, ms: r.ms, error: r.error || "unparsable", raw: String(r.text || "").slice(0, 300) };
  } catch (e) { llmDebug = { model, error: String(e).slice(0, 200) }; }

  // 2) 予備：機械翻訳モデル（中国語は簡体字になる場合あり）
  try {
    const res = { model: "mt", source: text };
    await Promise.all(targets.map(async t => {
      const out = await env.AI.run(MT_MODEL, { text, source_lang: MT_LANG[src], target_lang: MT_LANG[t] });
      res[t] = String(out?.translated_text || "").trim();
    }));
    if (debug) res.debug = llmDebug;
    return json(res);
  } catch (e) {
    return json({ error: "translation failed" }, 502);
  }
}

// 原稿の用語だけ、音声認識の聞き間違い候補を調べる — POST /subtitles/api/homophones
// 入力：{ terms: [{ja, yomi}], context }  出力：{ items: [{ja, yomi, confusions, risky}] }
export const handleHomophones = (request, env) => withCors(request, homophonesInner(request, env));
async function homophonesInner(request, env) {
  if (request.method === "OPTIONS") return preflight(request);
  if (!checkOrigin(request)) return json({ error: "forbidden" }, 403);
  if (request.method !== "POST") return json({ error: "POST only" }, 405);
  if (!env || !env.AI) return json({ error: "AI binding is not configured" }, 503);
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  if (limited(ip)) return json({ error: "too many requests" }, 429);
  let body;
  try { body = await request.json(); } catch { return json({ error: "bad json" }, 400); }
  const terms = (Array.isArray(body.terms) ? body.terms : []).slice(0, 30)
    .map(t => ({ ja: clean(t.ja, 20), yomi: clean(t.yomi, 30) })).filter(t => t.ja);
  if (!terms.length) return json({ items: [] });
  const context = clean(body.context, 1500);
  const model = pickModel(body.model), debug = !!body.debug;
  const system =
`You support a live speech-recognition subtitle tool used for Japanese lectures and kōdan (Japanese storytelling).
For each Japanese term from the speaker's manuscript, list what Japanese speech recognition might write INSTEAD when the speaker says that term:
homophones and near-homophones written with other kanji, and the all-hiragana / all-katakana spelling if recognizers often output it.
Rules:
- "yomi": the reading in hiragana as used in this manuscript.
- "confusions": at most 6 strings. Never include the term itself. Only include a spelling if, in a talk about this manuscript, seeing it would almost certainly mean a misrecognition of the term.
- Do not include spellings that are ordinary everyday words the speaker might really say (e.g. for 機関 do not include 期間). If every plausible confusion is such an everyday word, return an empty list and set "risky": true.
- Proper nouns (people, places, titles) usually have useful confusions with other kanji for the same reading.
Reply with JSON only: {"items":[{"ja":"...","yomi":"...","confusions":["..."],"risky":false}]} — one item per input term, same order.`;
  const user = (context ? `Manuscript excerpt (for context):\n${context}\n\n` : "") + "Terms:\n" + terms.map(t => "- " + t.ja + (t.yomi ? `（${t.yomi}）` : "")).join("\n");
  try {
    const r = await runLLM(env, model, [{ role: "system", content: system }, { role: "user", content: user }], 2000, 45000);
    const data = parseJsonLoose(r.text);
    const items = (data && Array.isArray(data.items) ? data.items : []).map(it => ({
      ja: clean(it.ja, 20), yomi: clean(it.yomi, 30),
      confusions: (Array.isArray(it.confusions) ? it.confusions : []).map(c => clean(c, 20)).filter(c => c && c !== clean(it.ja, 20)).slice(0, 6),
      risky: !!it.risky
    }));
    // 読み付きで返ってきても照合できるように（例：「講談（こうだん）」→「講談」）、順番でも対応づける
    items.forEach((it, i) => { if (!terms.some(t => t.ja === it.ja)) { const base = it.ja.replace(/[（(].*$/, "").trim(); it.ja = terms.some(t => t.ja === base) ? base : (terms[i] ? terms[i].ja : it.ja); } });
    const res = { items: items.filter(it => terms.some(t => t.ja === it.ja)) };
    if (debug) res.debug = { model, ms: r.ms, error: r.error, raw: data ? undefined : String(r.text || "").slice(0, 300) };
    return json(res);
  } catch (e) {
    return json({ error: "check failed" }, 502);
  }
}
