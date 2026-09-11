import site from "./brand-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    const typeStyle = `<style id="hero-title-size-fix">
      html:lang(ja) .hero-kicker {
        font-size: clamp(3.2rem, 5.6vw, 5.9rem) !important;
        line-height: .95 !important;
        letter-spacing: .025em !important;
        font-weight: 500 !important;
        margin-bottom: 18px !important;
      }
      @media (max-width: 1100px) {
        html:lang(ja) .hero-kicker {
          font-size: clamp(3rem, 6.2vw, 4.7rem) !important;
        }
      }
      @media (max-width: 850px) {
        html:lang(ja) .hero-kicker {
          font-size: clamp(2.65rem, 13vw, 3.45rem) !important;
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
