import worker from "./worker.js";

const LOGO_URL = "https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/1DE59A7B-F9B1-46A1-8E04-49435E076147.png";

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

    const style = `<style id="brand-logo-style">
      .brand-logo{margin-right:auto;display:flex;align-items:center;width:auto!important}
      .brand-logo img{display:block;width:clamp(170px,20vw,260px);height:auto;max-height:48px;object-fit:contain;object-position:left center;filter:drop-shadow(0 1px 4px rgba(0,0,0,.28))}
      @media(max-width:850px){.brand-logo img{width:175px;max-height:40px}.nav{gap:14px}.lang{padding:7px 10px;font-size:.78rem}}
      @media(max-width:390px){.brand-logo img{width:150px}.lang{font-size:.72rem;padding:6px 8px}}
    </style>`;
    html = html.replace("</head>", style + "\n</head>");

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("cache-control", "public, max-age=60");
    return new Response(html, {status:response.status,statusText:response.statusText,headers});
  }
};
