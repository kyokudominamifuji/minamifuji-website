import worker from "./worker.js";

const LOGO_URL = "https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/1DE59A7B-F9B1-46A1-8E04-49435E076147.png";
const INSTAGRAM_URL = "https://www.instagram.com/373.fuji/";
const EVENT_FORM_URL = "https://forms.gle/1AqQEx7TZe2fJvqE8";

function eventPage1101() {
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="2026年11月1日 旭堂南不二・佐藤さくら子 二人会。公演詳細・チラシ・ご予約はこちら。"><title>旭堂南不二・佐藤さくら子 二人会 | 2026.11.01</title><style>
  :root{--ink:#15130f;--paper:#fffdf8;--gold:#b1884f;--red:#9f2d26;--muted:#756d62;--line:rgba(21,19,15,.15)}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif;line-height:1.8}a{color:inherit}.wrap{width:min(920px,calc(100% - 32px));margin:auto}.top{padding:22px 0;border-bottom:1px solid var(--line)}.top img{display:block;width:min(260px,72vw);height:auto}.hero{padding:64px 0 42px}.eyebrow{color:var(--gold);font-size:.75rem;font-weight:800;letter-spacing:.18em}h1{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-weight:500;font-size:clamp(2.2rem,7vw,4.2rem);line-height:1.25;margin:10px 0 8px}.lead{font-family:"Yu Mincho",serif;font-size:1.25rem;margin:0;color:var(--muted)}.card{margin:34px 0;padding:28px;border:1px solid var(--line);background:#fff}.facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.fact small{display:block;color:var(--muted);font-size:.72rem;letter-spacing:.1em}.fact b{font-size:1rem}.cta{display:inline-flex;align-items:center;justify-content:center;min-height:56px;padding:0 26px;background:var(--red);color:#fff;text-decoration:none;font-weight:800;margin-top:28px}.flyer{margin:46px 0;padding:38px 24px;text-align:center;border:1px dashed var(--line);color:var(--muted);background:#fff}.note{font-size:.86rem;color:var(--muted)}.back{display:inline-block;margin:10px 0 56px;text-decoration:none;border-bottom:1px solid var(--ink)}@media(max-width:640px){.hero{padding-top:42px}.facts{grid-template-columns:1fr}.card{padding:22px}.cta{width:100%}}
  </style></head><body><div class="top"><div class="wrap"><a href="/"><img src="${LOGO_URL}" alt="講談師 旭堂南不二"></a></div></div><main class="wrap"><section class="hero"><div class="eyebrow">KŌDAN × SHAMISEN / 2026.11.01</div><h1>旭堂南不二・佐藤さくら子 二人会</h1><p class="lead">声と糸が、物語を紡ぐ。</p><div class="card"><div class="facts"><div class="fact"><small>日時</small><b>2026年11月1日（日）16:00開場 ／ 16:15開演</b></div><div class="fact"><small>会場</small><b>居酒屋 ポチ（静岡県富士市吉原4丁目10-48 2階）</b></div><div class="fact"><small>料金</small><b>前売 3,000円 ／ 当日 3,500円・1ドリンク付</b></div><div class="fact"><small>出演</small><b>旭堂南不二 ／ 佐藤さくら子</b></div></div><a class="cta" href="${EVENT_FORM_URL}" target="_blank" rel="noopener noreferrer">Googleフォームから申し込む →</a><p class="note">このページをQRコードにしてください。申込フォームや掲載内容を変更しても、QRコードはそのまま使えます。</p></div><div class="flyer"><b>公演チラシ</b><br>完成版をここに掲載します。</div><a class="back" href="/">旭堂南不二 公式サイトへ戻る</a></section></main></body></html>`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/events/2026-11-01" || url.pathname === "/events/2026-11-01/") {
      return new Response(eventPage1101(), {headers:{"content-type":"text/html; charset=UTF-8","cache-control":"public, max-age=60"}});
    }

    const response = await worker.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();
    html = html.replace(
      '<a class="brand" href="#top"><b>旭堂 南不二</b><small>KYOKUDO MINAMIFUJI</small></a>',
      `<a class="brand brand-logo" href="#top" aria-label="旭堂南不二 ホーム"><img src="${LOGO_URL}" alt="講談師 旭堂南不二 kyokudominamifuji.com"></a>`
    );

    const instagramSection = `
  <section class="instagram" id="instagram">
    <div class="wrap">
      <div class="section-head">
        <div><div class="eyebrow">INSTAGRAM</div><h2 data-ja="日々の活動" data-en="From Instagram">日々の活動</h2></div>
        <p data-ja="高座の舞台裏、公演のお知らせ、日々の講談活動をInstagramで発信しています。" data-en="Behind the scenes, performance news and everyday Kōdan activities on Instagram.">高座の舞台裏、公演のお知らせ、日々の講談活動をInstagramで発信しています。</p>
      </div>
      <div class="instagram-card">
        <div><div class="instagram-handle">@373.fuji</div><p data-ja="Instagramの最新投稿を、この場所に自動表示できるよう準備しています。" data-en="This section is being prepared to automatically display the latest Instagram posts.">Instagramの最新投稿を、この場所に自動表示できるよう準備しています。</p></div>
        <a class="instagram-link" href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" data-ja="Instagramを見る ↗" data-en="View Instagram ↗">Instagramを見る ↗</a>
      </div>
    </div>
  </section>`;

    html = html.replace('<section class="contact" id="contact">', instagramSection + '\n<section class="contact" id="contact">');

    const style = `<style id="brand-logo-style">
      .brand-logo{margin-right:auto;display:flex;align-items:center;width:auto!important}
      .brand-logo img{display:block;width:clamp(170px,20vw,260px);height:auto;max-height:48px;object-fit:contain;object-position:left center;filter:drop-shadow(0 1px 4px rgba(0,0,0,.28))}
      .instagram{background:#fffdf8}.instagram-card{display:flex;justify-content:space-between;align-items:center;gap:32px;padding:34px 0;border-top:1px solid var(--ink);border-bottom:1px solid var(--ink)}.instagram-handle{font-family:Georgia,serif;font-size:clamp(1.8rem,4vw,3rem);letter-spacing:.02em;margin-bottom:8px}.instagram-card p{margin:0;color:var(--muted);max-width:680px}.instagram-link{display:inline-block;flex:0 0 auto;border-bottom:1px solid var(--ink);padding-bottom:4px;font-weight:700}
      @media(max-width:850px){.brand-logo img{width:175px;max-height:40px}.nav{gap:14px}.lang{padding:7px 10px;font-size:.78rem}.instagram-card{align-items:flex-start;flex-direction:column}}@media(max-width:390px){.brand-logo img{width:150px}.lang{font-size:.72rem;padding:6px 8px}}
    </style>`;
    html = html.replace("</head>", style + "\n</head>");

    const headers = new Headers(response.headers); headers.delete("content-length"); headers.set("cache-control", "public, max-age=60");
    return new Response(html, {status:response.status,statusText:response.statusText,headers});
  }
};
