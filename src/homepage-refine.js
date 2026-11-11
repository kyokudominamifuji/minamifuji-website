/* トップページの仕上げ（2026-11）。
   - 「英語字幕講談」セクションを追加し、講談ライブ字幕（/subtitles）へ案内する
   - 「南不二の挑戦」を出演依頼の前へ移す（演目 → 字幕 → 挑戦 → 出演依頼 の流れ）
   - 見出しの折り返し・演目一覧の長さ・公演カードのチラシ配置・フッターを整える
   文字列置換なので、置換元が見つからないときは何もしない（ページは壊さない）。 */

export default function refineHomepage(html, path) {
  if (!["/", "/en", "/en/"].includes(path) || html.includes('id="mf-refine-2026-11"')) return html;
  const en = path.startsWith("/en");
  const about = en ? "/en/subtitles" : "/subtitles";

  // 1) ナビゲーションに「字幕ツール」
  html = html.replace(
    /(<nav class="navlinks"[^>]*>[\s\S]*?)(<a href="#contact")/,
    (m, a, b) => a + '<a href="' + about + '" data-ja="字幕ツール" data-en="Subtitle Tool">' + (en ? "Subtitle Tool" : "字幕ツール") + '</a>\n      ' + b
  );

  // 2) 英語字幕講談セクション
  const L = en ? {
    kicker: "KŌDAN WITH ENGLISH SUBTITLES",
    h: "Kōdan, beyond<br>the language barrier.",
    p1: "Since 2025, Minamifuji has performed kōdan with English subtitles at Fuji to Ao, a guesthouse in Fuji City, so that audiences who do not speak Japanese can enjoy the story too.",
    p2: "To make this possible, he built his own subtitle tool — and has now made it free for everyone who wants to share Japanese stories.",
    toolK: "FREE TOOL", toolH: "Kōdan Live Subtitles",
    toolP: "Load a script, rehearse once, and project English and Chinese subtitles that follow your live telling.",
    toolA: "About the tool", toolB: "Open the tool",
    pts: ["Follows your voice line by line", "Japanese · English · Chinese", "Free · No sign-up"]
  } : {
    kicker: "KŌDAN WITH ENGLISH SUBTITLES",
    h: "講談を、<br>言葉の壁の向こうへ。",
    p1: "2025年から、富士市のゲストハウス「富士と碧」で英語字幕付きの講談会を続けています。日本語がわからないお客様にも、物語の面白さをそのまま届けるために。",
    p2: "その字幕を支えるために自分で開発した道具を、日本の物語を届けたいすべての人のために、無料で公開しました。",
    toolK: "FREE TOOL", toolH: "講談ライブ字幕",
    toolP: "台本を入れて練習するだけ。本番では、語りに合わせて英語・中国語の字幕を映します。",
    toolA: "ツールについて・想い", toolB: "ツールを使ってみる",
    pts: ["語りに合わせて字幕が進む", "日本語・English・中文", "無料・登録不要"]
  };
  const subtitles =
    '<section class="mf-subs" id="subtitles" aria-labelledby="mf-subs-title"><div class="wrap mf-subs-grid">' +
    '<div class="mf-subs-copy"><span class="mf-subs-kicker">' + L.kicker + '</span>' +
    '<h2 id="mf-subs-title">' + L.h + '</h2><p>' + L.p1 + '</p><p>' + L.p2 + '</p></div>' +
    '<aside class="mf-subs-card"><span class="mf-subs-kicker">' + L.toolK + '</span><h3>' + L.toolH + '</h3>' +
    '<div class="mf-subs-screen" aria-hidden="true"><small>「さて、その時でございます――」</small><b>And it was at that very moment—</b></div>' +
    '<p>' + L.toolP + '</p><ul>' + L.pts.map(x => '<li>' + x + '</li>').join("") + '</ul>' +
    '<div class="mf-subs-actions"><a class="mf-subs-btn" href="' + about + '">' + L.toolA + ' <span aria-hidden="true">→</span></a>' +
    '<a class="mf-subs-link" href="/subtitles/kodan">' + L.toolB + ' <span aria-hidden="true">↗</span></a></div></aside>' +
    '</div></section>';

  // 3) 挑戦セクションを出演依頼の前へ移し、その前に字幕セクションを置く
  const contactTag = '<section class="contact" id="contact">';
  const cStart = html.indexOf('<section id="challenge"');
  let challenge = "";
  if (cStart >= 0) {
    const cEnd = html.indexOf("</section>", cStart);
    if (cEnd > cStart) {
      challenge = html.slice(cStart, cEnd + 10);
      html = html.slice(0, cStart) + html.slice(cEnd + 10);
    }
  }
  if (html.includes(contactTag)) {
    html = html.replace(contactTag, subtitles + "\n" + challenge + "\n" + contactTag);
  } else if (challenge) {
    html = html.replace("<footer", challenge + "\n<footer"); // 念のため元に戻す
  }
  // 挑戦カード「世界へ、届ける。」から字幕セクションへ
  html = html.replace(/(<span class="cb-no">03 \/ WORLD<\/span>[\s\S]*?<\/p>)/, m =>
    m + '<a class="mf-cb-more" href="#subtitles">' + (en ? "English-subtitled kōdan" : "英語字幕講談について") + ' <span aria-hidden="true">↓</span></a>');

  // 見出しが単語の途中で折り返さないように
  html = html.replace('<h2 id="mf-paths-title">講談との出会い方、三つ。</h2>',
    '<h2 id="mf-paths-title"><span class="mf-nb">講談との</span><span class="mf-nb">出会い方、</span><span class="mf-nb">三つ。</span></h2>');

  // 4) フッター
  html = html.replace(
    /<footer><div class="wrap foot">[\s\S]*?<\/div><\/footer>/,
    '<footer class="mf-foot"><div class="wrap mf-foot-grid">' +
    '<div><b class="mf-foot-name">' + (en ? "Kyokudo Minamifuji" : "旭堂南不二") + '</b><span>' + (en ? "Kōdan storyteller · Fuji City, Shizuoka" : "講談師　静岡県富士市") + '</span></div>' +
    '<nav aria-label="footer"><a href="#stage">' + (en ? "Schedule" : "出演情報") + '</a><a href="#repertoire">' + (en ? "Repertoire" : "主な演目") + '</a>' +
    '<a href="' + about + '">' + (en ? "Subtitle Tool" : "字幕ツール") + '</a><a href="#contact">' + (en ? "Inquiries" : "出演依頼") + '</a>' +
    '<a href="https://www.instagram.com/373.fuji/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>' +
    '<a href="https://kamigata-kodan.jp/" target="_blank" rel="noopener noreferrer">' + (en ? "Kamigata Kodan Association ↗" : "上方講談協会 ↗") + '</a></nav>' +
    '<small>© 2026 Kyokudo Minamifuji</small></div></footer>'
  );

  const css = `
<style id="mf-refine-2026-11">
/* 見出しの折り返し */
#mf-three-paths .mf-path-intro{grid-template-columns:1.35fr 1fr}
#mf-three-paths h2,.contact h2,.mf-subs h2{text-wrap:balance}
.contact h2{font-size:clamp(2.4rem,5vw,4.4rem);line-height:1.2}
/* 公演カード：PCではチラシを右に置いて縦長を抑える */
@media(min-width:900px){
  .event>div:nth-child(2){display:grid;grid-template-columns:minmax(0,1fr) 210px;column-gap:40px;align-content:start}
  .event>div:nth-child(2)>*{grid-column:1}
  .event>div:nth-child(2)>.event-flyer{grid-column:2;grid-row:1 / span 6;margin:4px 0 0;width:100%;max-width:none}
}
/* 演目：PCでは2列にして一覧を見渡しやすく */
@media(min-width:900px){
  .repertoire-group{display:grid;grid-template-columns:1fr 1fr;column-gap:44px}
  .repertoire-group>h4,.repertoire-group>.group-intro,.repertoire-group>:not(.story){grid-column:1 / -1}
  .repertoire-group .story-list{display:grid;grid-template-columns:1fr 1fr;column-gap:44px}
}
.mf-nb{display:inline-block}
/* 英語字幕講談 */
.mf-subs{background:#14120f;color:#f3ede3;padding:104px 0;border-top:1px solid rgba(214,182,123,.18)}
.mf-subs-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:64px;align-items:center}
.mf-subs-kicker{display:block;font:800 .72rem/1.6 system-ui,sans-serif;letter-spacing:.2em;color:#d6b67b}
.mf-subs h2{font:500 clamp(2rem,4.4vw,3.4rem)/1.38 "Yu Mincho","Hiragino Mincho ProN",serif;margin:14px 0 26px;letter-spacing:.02em}
.mf-subs-copy p{color:#d5ccbe;line-height:2;margin:0 0 1.1em;max-width:520px}
.mf-subs-card{border:1px solid rgba(214,182,123,.35);background:rgba(255,255,255,.03);padding:32px 30px}
.mf-subs-card h3{font:600 1.6rem/1.4 "Yu Mincho","Hiragino Mincho ProN",serif;margin:10px 0 18px}
.mf-subs-screen{background:#000;border:1px solid #3a342c;aspect-ratio:16/6;display:flex;flex-direction:column;justify-content:flex-end;padding:0 18px 16px;margin-bottom:18px}
.mf-subs-screen small{color:#a99e8c;font:500 .78rem/1.6 "Yu Mincho","Hiragino Mincho ProN",serif}
.mf-subs-screen b{color:#fff;font:600 clamp(1rem,2vw,1.25rem)/1.35 Georgia,serif}
.mf-subs-card p{color:#cfc6b8;font-size:.92rem;line-height:1.9;margin:0 0 14px}
.mf-subs-card ul{list-style:none;margin:0 0 24px;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.mf-subs-card li{font-size:.78rem;border:1px solid rgba(214,182,123,.4);color:#ecdcbc;padding:3px 10px;border-radius:999px}
.mf-subs-actions{display:flex;flex-wrap:wrap;align-items:center;gap:14px 22px}
.mf-subs-btn{display:inline-flex;gap:10px;align-items:center;background:#d6b67b;color:#14120f;font-weight:800;text-decoration:none;padding:13px 22px;font-size:.92rem}
.mf-subs-btn:hover,.mf-subs-btn:focus-visible{background:#f0d9a8}
.mf-subs-link{color:#f2e3c6;font-weight:700;font-size:.88rem;text-decoration:none;border-bottom:1px solid #cfab75;padding-bottom:3px}
.mf-cb-more{display:inline-block;margin-top:14px;color:#e7cf9f;font-size:.84rem;text-decoration:none;border-bottom:1px solid rgba(231,207,159,.5)}
/* フッター */
.mf-foot{background:#0f0e0c;color:#a59c8e;padding:44px 0 110px;font-size:.84rem}
.mf-foot-grid{display:grid;grid-template-columns:auto 1fr;gap:18px 40px;align-items:start}
.mf-foot-name{display:block;color:#f1e9dc;font:500 1.2rem/1.5 "Yu Mincho","Hiragino Mincho ProN",serif}
.mf-foot nav{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:10px 22px}
.mf-foot a{color:#d8cdbb;text-decoration:none}
.mf-foot a:hover{color:#fff}
.mf-foot small{grid-column:1 / -1;border-top:1px solid #2a2622;padding-top:18px;color:#7d7569}
@media(max-width:850px){
  #mf-three-paths .mf-path-intro{grid-template-columns:1fr}
  .mf-subs{padding:72px 0}
  .mf-subs-grid{grid-template-columns:1fr;gap:34px}
  .mf-subs-card{padding:24px 20px}
  .mf-foot-grid{grid-template-columns:1fr}
  .mf-foot nav{justify-content:flex-start}
}
@media(min-width:851px){.mf-foot{padding-bottom:44px}}
@media(max-width:560px){.repertoire-closing{font-size:1.12rem!important;line-height:1.9!important}}
</style>
`;
  return html.replace("</head>", css + "</head>");
}
