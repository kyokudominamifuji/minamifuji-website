import worker from "./worker.js";

const LOGO_URL = "https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/1DE59A7B-F9B1-46A1-8E04-49435E076147.png";
const INSTAGRAM_URL = "https://www.instagram.com/373.fuji/";

export default {
  async fetch(request, env, ctx) {
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
        <div>
          <div class="instagram-handle">@373.fuji</div>
          <p data-ja="Instagramの最新投稿を、この場所に自動表示できるよう準備しています。" data-en="This section is being prepared to automatically display the latest Instagram posts.">Instagramの最新投稿を、この場所に自動表示できるよう準備しています。</p>
        </div>
        <a class="instagram-link" href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" data-ja="Instagramを見る ↗" data-en="View Instagram ↗">Instagramを見る ↗</a>
      </div>
    </div>
  </section>`;

    html = html.replace(
      '<section class="contact" id="contact">',
      instagramSection + '\n<section class="contact" id="contact">'
    );

    const style = `<style id="brand-logo-style">
      .brand-logo{margin-right:auto;display:flex;align-items:center;width:auto!important}
      .brand-logo img{display:block;width:clamp(170px,20vw,260px);height:auto;max-height:48px;object-fit:contain;object-position:left center;filter:drop-shadow(0 1px 4px rgba(0,0,0,.28))}
      .instagram{background:#fffdf8}
      .instagram-card{display:flex;justify-content:space-between;align-items:center;gap:32px;padding:34px 0;border-top:1px solid var(--ink);border-bottom:1px solid var(--ink)}
      .instagram-handle{font-family:Georgia,serif;font-size:clamp(1.8rem,4vw,3rem);letter-spacing:.02em;margin-bottom:8px}
      .instagram-card p{margin:0;color:var(--muted);max-width:680px}
      .instagram-link{display:inline-block;flex:0 0 auto;border-bottom:1px solid var(--ink);padding-bottom:4px;font-weight:700}
      @media(max-width:850px){.brand-logo img{width:175px;max-height:40px}.nav{gap:14px}.lang{padding:7px 10px;font-size:.78rem}.instagram-card{align-items:flex-start;flex-direction:column}}
      @media(max-width:390px){.brand-logo img{width:150px}.lang{font-size:.72rem;padding:6px 8px}}
    </style>`;
    html = html.replace("</head>", style + "\n</head>");

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("cache-control", "public, max-age=60");
    return new Response(html, {status:response.status,statusText:response.statusText,headers});
  }
};
