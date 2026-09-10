import site from "./index.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    let html = await response.text();

    // Keep public-facing profile focused on the storyteller brand.
    html = html
      .replace("高座で語り、大学でも講談を教える講談師。", "一席一会。二つとない講談を届ける講談師。")
      .replace("高座だけでなく、大学で講談を教え、講演やワークショップにも取り組んでいます。世界に向けては、英語での導入と日本語の講談、英語字幕による発信も準備しています。", "講談会やイベントでの高座に加え、講演やワークショップにも取り組んでいます。世界に向けては、英語での導入と日本語の講談、英語字幕による発信も準備しています。")
      .replace("講談会・イベント出演、大学・文化施設での講演、ワークショップ、取材・企画のご相談はメールでお問い合わせください。", "講談会・イベント出演、文化施設などでの講演、ワークショップ、取材・企画のご相談はメールでお問い合わせください。");

    // Reservation button: Google Form.
    html = html.replace(
      /href="mailto:373fuji@gmail\.com\?subject=[^"]+"/,
      'href="https://forms.gle/1AqQEx7TZe2fJvqE8" target="_blank" rel="noopener noreferrer"'
    );

    // Add capacity for the Nov. 1 performance.
    html = html.replace(
      '          </div>\n          <a class="reserve"',
      '          </div>\n          <div class="capacity" data-ja="定員50名" data-en="Capacity: 50">定員50名</div>\n          <a class="reserve"'
    );

    const fix = `
<style id="hero-name-layout-fix">
  /* Keep the stage name together on one line across desktop/tablet widths. */
  .hero h1 {
    white-space: nowrap !important;
    max-width: none !important;
    font-size: clamp(3.2rem, 5.6vw, 5.9rem) !important;
    letter-spacing: .025em !important;
  }

  .capacity {
    margin-top: 12px;
    color: var(--muted);
    font-size: .9rem;
    font-weight: 700;
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
