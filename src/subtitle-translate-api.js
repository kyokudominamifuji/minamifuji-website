// 授業ライブ字幕（スマホ版）用の翻訳API — POST /subtitles/api/translate
// Cloudflare Workers AI を使用（wrangler.jsonc の "ai" バインディング）。
// 入力：{ text, src: "ja"|"en"|"zh", targets: ["en","zh"...], glossary: [{ja,en,zh}], context }
// 出力：{ source, ja?, en?, zh?, model }
const LLM_MODEL = "@cf/google/gemma-4-26b-a4b-it";
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
const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" }
});
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

export async function handleTranslate(request, env) {
  if (request.method !== "POST") return json({ error: "POST only" }, 405);
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== url.host) return json({ error: "forbidden" }, 403);
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
    const out = await env.AI.run(LLM_MODEL, {
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
      max_tokens: 600, temperature: 0.2
    });
    const data = parseJsonLoose(llmText(out));
    if (data && targets.every(t => typeof data[t] === "string" && data[t].trim())) {
      const res = { model: "llm", source: typeof data.source === "string" && data.source.trim() ? data.source.trim() : text };
      for (const t of targets) res[t] = data[t].trim();
      return json(res);
    }
  } catch (e) { /* fall through to MT */ }

  // 2) 予備：機械翻訳モデル（中国語は簡体字になる場合あり）
  try {
    const res = { model: "mt", source: text };
    await Promise.all(targets.map(async t => {
      const out = await env.AI.run(MT_MODEL, { text, source_lang: MT_LANG[src], target_lang: MT_LANG[t] });
      res[t] = String(out?.translated_text || "").trim();
    }));
    return json(res);
  } catch (e) {
    return json({ error: "translation failed" }, 502);
  }
}
