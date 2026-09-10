import site from "./index.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    let html = await response.text();
    const fix = `
<style id="hero-name-layout-fix">
  /* Keep the stage name together on one line across desktop/tablet widths. */
  .hero h1 {
    white-space: nowrap !important;
    max-width: none !important;
    font-size: clamp(3.2rem, 5.6vw, 5.9rem) !important;
    letter-spacing: .025em !important;
  }

  @media (max-width: 1100px) {
    .hero h1 {
      font-size: clamp(3rem, 6.2vw, 4.7rem) !important;
    }
  }

  @media (max-width: 850px) {
    .hero h1 {
      white-space: nowrap !important;
      font-size: clamp(2.65rem, 13vw, 3.45rem) !important;
      letter-spacing: .01em !important;
    }
  }
</style>`;

    html = html.replace("</head>", fix + "\n</head>");

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
