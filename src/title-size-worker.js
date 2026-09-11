import worker from "./brand-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await worker.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();
    const style = `
<style id="title-size-adjustment">
  html[lang="ja"] .hero-kicker {
    font-family: "Yu Mincho", "Hiragino Mincho ProN", serif !important;
    font-size: clamp(2.65rem, 4.7vw, 4.9rem) !important;
    line-height: 1 !important;
    font-weight: 500 !important;
    letter-spacing: .03em !important;
    margin-bottom: 24px !important;
  }

  @media (max-width: 1100px) {
    html[lang="ja"] .hero-kicker {
      font-size: clamp(2.45rem, 5.3vw, 3.95rem) !important;
    }
  }

  @media (max-width: 850px) {
    html[lang="ja"] .hero-kicker {
      font-size: clamp(2.15rem, 10.5vw, 2.9rem) !important;
      margin-bottom: 20px !important;
    }
  }
</style>`;

    html = html.replace("</head>", style + "\n</head>");
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("cache-control", "public, max-age=60");
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
