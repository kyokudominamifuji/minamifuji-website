import site from "./brand-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    const typeStyle = `<style id="hero-title-size-fix">
      html:lang(ja) .hero-kicker {
        font-size: clamp(2.85rem, 5vw, 5.2rem) !important;
        line-height: .98 !important;
        letter-spacing: .025em !important;
        font-weight: 500 !important;
        margin-bottom: 20px !important;
      }
      @media (max-width: 1100px) {
        html:lang(ja) .hero-kicker {
          font-size: clamp(2.7rem, 5.6vw, 4.2rem) !important;
        }
      }
      @media (max-width: 850px) {
        html:lang(ja) .hero-kicker {
          font-size: clamp(2.3rem, 11.5vw, 3rem) !important;
          letter-spacing: .01em !important;
        }
      }
    </style>`;

    html = html.replace("</head>", typeStyle + "\n</head>");

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
