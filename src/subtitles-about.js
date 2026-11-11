// 講談ライブ字幕 紹介ページ — served at /subtitles （日本語）と /en/subtitles （英語）
// ツール本体は /subtitles/kodan （kodan-subtitles.js）。ここは「想い」と使い方の紹介。

const ORIGIN = "https://kyokudominamifuji.com";
const TOOL = "/subtitles/kodan";
const MAIL = "373fuji@gmail.com";

const T = {
  ja: {
    lang: "ja",
    title: "講談ライブ字幕｜誰もが無料で使える、講談の字幕ツール｜旭堂南不二",
    desc: "講談師・旭堂南不二が開発した「講談ライブ字幕」。台本を入れて練習するだけで、本番の語りに合わせて英語・中国語の字幕を映せます。誰でも無料で使えるツールとして公開しています。",
    home: "/", homeLabel: "旭堂南不二 公式サイト", switchHref: "/en/subtitles", switchLabel: "English",
    kicker: "KŌDAN LIVE SUBTITLES",
    h1: "講談を、<br>言葉の壁の<br class=\"sp\">向こうへ。",
    lead: "誰もが無料で使える講談の字幕ツール<br class=\"sp\">「講談ライブ字幕」を公開しました。",
    cta: "ツールを使ってみる", ctaSub: "無料・登録不要",
    ctaNote: "パソコン版 Google Chrome でお使いください",
    stageSpeaker: "「さて、その時でございます――」",
    stageSub: "And it was at that very moment—",
    whyKicker: "WHY I MADE THIS",
    whyH: "なぜ、つくったのか。",
    why: [
      "2025年から、富士市のゲストハウス「富士と碧」で、英語字幕付きの講談会を続けている。\n日本語がわからないお客様にも、講談の面白さを届けたい。\nその一心で始めた挑戦だ。",
      "でも、やってみると、字幕が大変だった。\n台本を訳して、語りに合わせて一行ずつ送って、笑いの「間」もこわさないようにする。\n正直、語りながら自分でやるのは無理。",
      "じゃあ、どうするか？？\n語りを聞いて、字幕が勝手に台本を追いかけてくれればいい。\nそこで、その道具を自分でつくってみた。",
      "せっかくつくったので、僕ひとりで使うのはもったいない。\n講談師も、落語家も、浪曲師も、地域の語り部さんも。\n日本の物語を届けたい人なら、誰でも無料で使えるようにした。",
      "まだまだ試行錯誤中。\n使ってみて「ここが変だぞ」というところがあったら、ぜひ教えてください。\n開発者も講談師も僕ひとりなので、お手柔らかに・・・"
    ],
    sign: "講談師　旭堂南不二",
    motto: "伝統を大事にしながら、新しい形で世界へ。<br>僕はこれを「講談界のカリフォルニアロール」と呼んでいる。",
    howKicker: "HOW IT WORKS",
    howH: "使い方は、三つの手順だけ。",
    steps: [
      ["台本を入れる", "Word・PDF・テキストの台本を入れると、AIが英訳・中国語訳とあらすじを用意します。訳はその場で直せます。"],
      ["声に出して練習する", "台本を読み上げると、音声認識の聞き間違い（固有名詞や古い言葉）を自動で見つけ、本番で正しく直すように覚えます。"],
      ["本番で映す", "語りに合わせて、いま語っている台本の行の英訳をプロジェクターに映します。台本にないアドリブは、その場で翻訳します。"]
    ],
    featKicker: "FEATURES",
    feats: [
      ["語りに追いつく", "声を聞いて台本の行を自動で追いかけます。ずれたら ↓ キーひとつで手動に。"],
      ["日本語・English・中文", "映す字幕は日本語・英語・中国語（繁体字）から選べます。"],
      ["開演前のあらすじ", "物語の背景と登場人物を、開演前や枕の間に英語で映せます。"],
      ["台本は手元に", "台本の読み取りと保存は、お使いのパソコンの中で行います。"]
    ],
    needKicker: "WHAT YOU NEED",
    needH: "用意するもの",
    needs: ["パソコン（Google Chrome）", "マイク（パソコン内蔵でも可）", "プロジェクターか大きなモニター", "インターネット接続"],
    whoH: "こんな方に",
    whos: ["英語字幕付きの講談会・落語会を開きたい方", "訪日・在日のお客様に日本の話芸を届けたい方", "学校や国際交流の場で、語りの文化を紹介したい方", "朗読・語り部・ガイドなど、物語を伝える活動をしている方"],
    noteKicker: "BEFORE YOU START",
    noteH: "ご利用にあたって",
    notes: [
      "無料でお使いいただけます。ただし、多くの方に使っていただくため、利用回数に上限を設けています。",
      "翻訳・照合のため、台本の文章や聞き取った文字は、翻訳AI（Cloudflare Workers AI）に送られます。音声認識には Google Chrome の機能を使います。",
      "AIの翻訳には誤りがあります。本番の前に、英訳を必ず確認してください。",
      "使う台本の著作権・上演の許可は、ご自身でご確認ください。",
      "開発中のツールです。不具合や「こうなったら使いやすい」というご意見を、ぜひお寄せください。"
    ],
    fbH: "感想・不具合のご連絡",
    fb: "使ってみた感想、うまく動かなかったこと、こんな芸で使ってみたという報告も大歓迎です。",
    fbSubject: "講談ライブ字幕について",
    fbBtn: "メールで送る",
    finalH: "日本の物語を、世界へ。",
    finalP: "あなたの高座にも、字幕を。",
    back: "公式サイトへ戻る"
  },
  en: {
    lang: "en",
    title: "Kōdan Live Subtitles | A free subtitle tool for Japanese storytelling | Kyokudo Minamifuji",
    desc: "Kōdan Live Subtitles, built by kōdan storyteller Kyokudo Minamifuji. Load your script, rehearse once, and project English and Chinese subtitles that follow your live performance. Free for everyone.",
    home: "/en/", homeLabel: "Kyokudo Minamifuji", switchHref: "/subtitles", switchLabel: "日本語",
    kicker: "KŌDAN LIVE SUBTITLES",
    h1: "Carrying kōdan<br>beyond the<br class=\"sp\">language barrier.",
    lead: "Kōdan Live Subtitles is now open to everyone —<br class=\"pc\">a free subtitle tool for Japanese storytelling.",
    cta: "Try the tool", ctaSub: "Free · No sign-up",
    ctaNote: "Works best in Google Chrome on a computer. The tool's interface is in Japanese.",
    stageSpeaker: "「さて、その時でございます――」",
    stageSub: "And it was at that very moment—",
    whyKicker: "WHY I MADE THIS",
    whyH: "Why I built it",
    why: [
      "Since 2025, I have been holding English-subtitled kōdan performances at Fuji to Ao, a guesthouse in Fuji City. I wanted audiences who do not understand Japanese to enjoy kōdan just as much.",
      "What I learned was how hard subtitles are. You translate the script, advance each line at the pace of the telling, and try not to break the comic timing. Kōdan is the art of one voice, yet subtitles needed a second pair of hands.",
      "So I decided to build a tool that listens to the performance and follows the script on its own.",
      "I do not want to keep it to myself. Kōdan and rakugo performers, rōkyoku singers, local storytellers — anyone who wants to share Japanese stories should be able to add subtitles without spending money. That is why it is free."
    ],
    sign: "Kyokudo Minamifuji, kōdan storyteller",
    motto: "Honoring tradition while reaching the world in new ways —<br>I call it the “California roll of kōdan.”",
    howKicker: "HOW IT WORKS",
    howH: "Three simple steps",
    steps: [
      ["Load your script", "Drop in a Word, PDF or text script. AI drafts English and Chinese translations and a synopsis, which you can edit."],
      ["Rehearse out loud", "Read the script aloud. The tool finds where speech recognition mishears names and old words, and learns to fix them."],
      ["Project it live", "As you perform, the English line for the passage you are telling appears on screen. Ad-libs are translated on the spot."]
    ],
    featKicker: "FEATURES",
    feats: [
      ["Follows your voice", "It tracks your place in the script automatically. If it drifts, take over with a single ↓ key."],
      ["Japanese · English · Chinese", "Project subtitles in Japanese, English or Traditional Chinese."],
      ["Synopsis before the show", "Show the story's background and characters in English before you begin."],
      ["Your script stays with you", "Scripts are read and saved on your own computer."]
    ],
    needKicker: "WHAT YOU NEED",
    needH: "What you need",
    needs: ["A computer with Google Chrome", "A microphone (built-in is fine)", "A projector or large screen", "An internet connection"],
    whoH: "Made for",
    whos: ["Kōdan and rakugo shows with English subtitles", "Sharing Japanese storytelling with international audiences", "Schools and cultural-exchange events", "Readers, storytellers and guides who share stories"],
    noteKicker: "BEFORE YOU START",
    noteH: "Please note",
    notes: [
      "The tool is free. To keep it available for everyone, usage is limited.",
      "For translation and matching, script text and recognized speech are sent to a translation AI (Cloudflare Workers AI). Speech recognition uses Google Chrome's built-in feature.",
      "AI translations can be wrong. Please check the English before your performance.",
      "Please make sure you have the rights to perform and translate your script.",
      "The tool is still in development. Bug reports and ideas are very welcome."
    ],
    fbH: "Feedback",
    fb: "Tell me how it went, what did not work, or which kind of performance you used it for.",
    fbSubject: "Kodan Live Subtitles feedback",
    fbBtn: "Send an email",
    finalH: "Japanese stories, for the world.",
    finalP: "Bring subtitles to your stage.",
    back: "Back to the official site"
  }
};

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function renderSubtitlesAbout(lang) {
  const t = T[lang] || T.ja;
  const url = ORIGIN + (t.lang === "en" ? "/en/subtitles" : "/subtitles");
  const mail = "mailto:" + MAIL + "?subject=" + encodeURIComponent(t.fbSubject);
  const ld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: t.lang === "en" ? "Kōdan Live Subtitles" : "講談ライブ字幕",
    url: ORIGIN + TOOL,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Google Chrome",
    inLanguage: ["ja", "en", "zh-Hant"],
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
    description: t.desc,
    author: { "@type": "Person", name: "旭堂南不二 Kyokudo Minamifuji", url: ORIGIN + "/" }
  };
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="ja" href="${ORIGIN}/subtitles">
<link rel="alternate" hreflang="en" href="${ORIGIN}/en/subtitles">
<link rel="alternate" hreflang="x-default" href="${ORIGIN}/subtitles">
<meta property="og:type" content="website">
<meta property="og:site_name" content="旭堂南不二 Kyokudo Minamifuji">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.desc)}">
<meta property="og:image" content="${ORIGIN}/images/og/kodan-subtitles-og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t.title)}">
<meta name="twitter:description" content="${esc(t.desc)}">
<meta name="twitter:image" content="${ORIGIN}/images/og/kodan-subtitles-og.jpg">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<style>
:root{--ink:#14120f;--ink2:#1d1b18;--paper:#f5f0e6;--paper2:#fbf8f2;--gold:#d6b67b;--gold2:#a67b3f;--red:#9f2d26;--mute:#6d665c;--line:#e2d9c8}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--paper);color:var(--ink);font:400 16px/1.9 "Yu Gothic","Hiragino Kaku Gothic ProN","Noto Sans JP",system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-wrap:anywhere}
a{color:inherit}
.serif{font-family:"Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif}
.wrap{width:min(1120px,calc(100% - 44px));margin:0 auto}
.narrow{width:min(760px,calc(100% - 44px));margin:0 auto}
.sp{display:none}
.top{position:absolute;inset:0 0 auto;z-index:5;padding:18px 0}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px}
.top a{color:#efe6d6;text-decoration:none;font-size:.85rem;letter-spacing:.04em}
.top .brand{font-family:"Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif;font-size:1rem}
.top .lang{border:1px solid rgba(239,230,214,.4);border-radius:999px;padding:5px 14px}
.hero{position:relative;background:radial-gradient(120% 90% at 80% 10%,#2a2520 0%,var(--ink) 58%);color:#f4eee5;padding:130px 0 0;overflow:hidden}
.kicker{display:block;font:800 .74rem/1.6 system-ui,sans-serif;letter-spacing:.22em;color:var(--gold)}
.hero h1{font:500 clamp(2.5rem,6.4vw,5rem)/1.28 "Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif;margin:18px 0 22px;letter-spacing:.02em}
.hero .lead{font-size:clamp(1rem,1.9vw,1.2rem);color:#ddd3c3;margin:0 0 34px;line-height:1.95}
.cta{display:flex;flex-wrap:wrap;align-items:center;gap:14px 22px}
.btn{display:inline-flex;align-items:center;gap:12px;background:var(--gold);color:var(--ink);text-decoration:none;font-weight:800;padding:16px 28px;border-radius:2px;font-size:1.02rem;letter-spacing:.04em;transition:.2s}
.btn:hover,.btn:focus-visible{background:#f0d9a8}
.btn small{font-weight:600;font-size:.76rem;opacity:.75}
.cta-note{font-size:.82rem;color:#b9ae9c}
.stage{margin:64px auto 0;max-width:880px;border:1px solid rgba(214,182,123,.28);border-bottom:none;background:linear-gradient(#24201b,#1a1714);padding:44px 24px 0;text-align:center}
.screen{position:relative;margin:0 auto;max-width:700px;aspect-ratio:16/7;background:#050505;border:1px solid #3a342c;display:flex;flex-direction:column;justify-content:flex-end;padding:0 4% 5%;box-shadow:0 30px 80px rgba(0,0,0,.5)}
.screen .ja{font:500 clamp(.8rem,1.8vw,1.05rem)/1.6 "Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif;color:#bdb2a1;margin-bottom:.5em}
.screen .en{font:600 clamp(1.05rem,2.9vw,1.85rem)/1.35 Georgia,"Times New Roman",serif;color:#fff;letter-spacing:.01em}
.screen .en span{border-right:2px solid var(--gold);padding-right:3px;animation:caret 1s steps(1) infinite}
@keyframes caret{50%{border-color:transparent}}
.desk{margin:26px auto 0;width:min(340px,70%);height:64px;background:linear-gradient(#6a4a2c,#4a321d);border-radius:3px 3px 0 0;position:relative}
.mat{height:18px;background:#7e1f1a;margin:0 -24px}
section{padding:96px 0}
h2{font:500 clamp(1.8rem,3.8vw,2.7rem)/1.45 "Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif;margin:14px 0 34px;letter-spacing:.02em}
.kicker.dark{color:var(--gold2)}
.why{background:var(--paper2)}
.why p{font:400 clamp(1rem,1.6vw,1.1rem)/2.15 "Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif;margin:0 0 1.4em}
.sign{margin-top:42px;padding-top:26px;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:6px}
.sign .motto{font-size:.95rem;color:var(--mute);line-height:1.95}
.sign b{font:600 1.05rem/1.6 "Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif;margin-top:10px}
.how{background:var(--ink);color:#f2ebdf}
.steps{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;counter-reset:s}
.steps li{border:1px solid rgba(214,182,123,.3);padding:30px 26px 32px;background:rgba(255,255,255,.025);counter-increment:s}
.steps li:before{content:"0" counter(s);display:block;font:500 2.6rem/1 Georgia,serif;color:var(--gold);margin-bottom:22px}
.steps h3{font:600 1.3rem/1.5 "Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif;margin:0 0 10px}
.steps p{margin:0;color:#cfc6b8;font-size:.93rem;line-height:1.9}
.feats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin-top:56px;border-top:1px solid rgba(214,182,123,.25)}
.feats div{padding:26px 20px 6px 0}
.feats h4{margin:0 0 6px;font-size:.98rem;color:#f2ebdf}
.feats p{margin:0;font-size:.86rem;color:#b9b0a2;line-height:1.85}
.two{display:grid;grid-template-columns:1fr 1fr;gap:60px}
.check{list-style:none;padding:0;margin:0}
.check li{padding:14px 0 14px 30px;border-bottom:1px solid var(--line);position:relative}
.check li:before{content:"";position:absolute;left:4px;top:24px;width:12px;height:7px;border-left:2px solid var(--red);border-bottom:2px solid var(--red);transform:rotate(-45deg)}
h3.sub{font:600 1.35rem/1.5 "Yu Mincho","Hiragino Mincho ProN","Noto Serif JP",serif;margin:0 0 14px}
.notes{background:var(--paper2)}
.notes ol{margin:0;padding-left:1.4em}
.notes li{margin:0 0 .9em;color:#3c372f}
.fb{margin-top:46px;padding:30px 30px 32px;border:1px solid var(--line);background:#fff}
.fb p{margin:0 0 18px;color:var(--mute)}
.btn.line{background:transparent;border:1px solid var(--red);color:var(--red);padding:12px 22px;font-size:.95rem}
.btn.line:hover{background:var(--red);color:#fff}
.final{background:var(--red);color:#fff;text-align:center;padding:100px 0}
.final h2{margin:0 0 10px}
.final p{margin:0 0 34px;font-size:1.05rem;opacity:.9}
.final .btn{background:#fff;color:var(--red)}
.final .back{display:block;margin-top:26px;color:#fbe2dc;font-size:.88rem}
footer{background:var(--ink);color:#a59c8e;font-size:.8rem;padding:26px 0}
footer .wrap{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
footer a{color:#d8cdbb;text-decoration:none}
@media(max-width:860px){
  .steps,.two{grid-template-columns:1fr}
  .feats{grid-template-columns:1fr 1fr}
  .two{gap:44px}
}
@media(max-width:560px){
  .sp{display:inline}.pc{display:none}
  section{padding:70px 0}
  .hero{padding-top:104px}
  .stage{margin-top:48px;padding:26px 12px 0}
  .feats{grid-template-columns:1fr}
  .feats div{padding:18px 0 4px}
  .btn{width:100%;justify-content:center}
  .fb{padding:24px 20px}
}
@media(prefers-reduced-motion:reduce){.screen .en span{animation:none}html{scroll-behavior:auto}}
</style>
</head>
<body>
<header class="top"><div class="wrap"><a class="brand" href="${t.home}">${esc(t.homeLabel)}</a><a class="lang" href="${t.switchHref}" hreflang="${t.lang === "en" ? "ja" : "en"}">${t.switchLabel}</a></div></header>
<main>
<section class="hero" aria-labelledby="h1">
  <div class="wrap">
    <span class="kicker">${t.kicker}</span>
    <h1 id="h1">${t.h1}</h1>
    <p class="lead">${t.lead}</p>
    <div class="cta"><a class="btn" href="${TOOL}">${esc(t.cta)} <small>${esc(t.ctaSub)}</small> <span aria-hidden="true">→</span></a><span class="cta-note">${esc(t.ctaNote)}</span></div>
  </div>
  <div class="stage" aria-hidden="true">
    <div class="screen"><div class="ja">${esc(t.stageSpeaker)}</div><div class="en"><span>${esc(t.stageSub)}</span></div></div>
    <div class="desk"></div>
    <div class="mat"></div>
  </div>
</section>

<section class="why" aria-labelledby="why-h">
  <div class="narrow">
    <span class="kicker dark">${t.whyKicker}</span>
    <h2 id="why-h">${esc(t.whyH)}</h2>
    ${t.why.map(p => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join("\n    ")}
    <div class="sign"><span class="motto">${t.motto}</span><b>${esc(t.sign)}</b></div>
  </div>
</section>

<section class="how" aria-labelledby="how-h">
  <div class="wrap">
    <span class="kicker">${t.howKicker}</span>
    <h2 id="how-h">${esc(t.howH)}</h2>
    <ol class="steps">
      ${t.steps.map(([h, p]) => `<li><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join("\n      ")}
    </ol>
    <div class="feats">
      ${t.feats.map(([h, p]) => `<div><h4>${esc(h)}</h4><p>${esc(p)}</p></div>`).join("\n      ")}
    </div>
  </div>
</section>

<section aria-labelledby="need-h">
  <div class="wrap two">
    <div><span class="kicker dark">${t.needKicker}</span><h2 id="need-h">${esc(t.needH)}</h2><ul class="check">${t.needs.map(n => `<li>${esc(n)}</li>`).join("")}</ul></div>
    <div><span class="kicker dark">FOR YOU</span><h2>${esc(t.whoH)}</h2><ul class="check">${t.whos.map(n => `<li>${esc(n)}</li>`).join("")}</ul></div>
  </div>
</section>

<section class="notes" aria-labelledby="note-h">
  <div class="narrow">
    <span class="kicker dark">${t.noteKicker}</span>
    <h2 id="note-h">${esc(t.noteH)}</h2>
    <ol>${t.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ol>
    <div class="fb"><h3 class="sub">${esc(t.fbH)}</h3><p>${esc(t.fb)}</p><a class="btn line" href="${mail}">${esc(t.fbBtn)} <span aria-hidden="true">↗</span></a></div>
  </div>
</section>

<section class="final" aria-labelledby="final-h">
  <div class="narrow">
    <h2 id="final-h">${esc(t.finalH)}</h2>
    <p>${esc(t.finalP)}</p>
    <a class="btn" href="${TOOL}">${esc(t.cta)} <span aria-hidden="true">→</span></a>
    <a class="back" href="${t.home}">${esc(t.back)}</a>
  </div>
</section>
</main>
<footer><div class="wrap"><span>© 2026 Kyokudo Minamifuji</span><a href="${t.home}">kyokudominamifuji.com</a></div></footer>
</body>
</html>`;
}
