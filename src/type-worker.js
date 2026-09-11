import site from "./brand-worker.js";

const FLYER_URL = "https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/futari-kai-2026-11-01.png";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    // NEWS is intentionally hidden until there are real article/detail pages.
    html = html.replace(/<section class="news" id="news">[\s\S]*?<\/section>/, "");
    html = html.replace('<a href="#news" data-ja="お知らせ" data-en="News">お知らせ</a>', "");

    const eventTagline = '<p class="tagline" data-ja="声と糸が、物語を紡ぐ。" data-en="Voice and strings weave a story.">声と糸が、物語を紡ぐ。</p>';
    const flyerOnTop = `${eventTagline}\n          <a class="event-flyer-link" href="/events/2026-11-01" aria-label="旭堂南不二・佐藤さくら子 二人会の詳細を見る"><img src="${FLYER_URL}" alt="2026年11月1日 旭堂南不二・佐藤さくら子 二人会 公演チラシ" loading="lazy"></a>`;
    html = html.replace(eventTagline, flyerOnTop);

    html = html.replace(
      '<div class="flyer"><b>公演チラシ</b><br>完成版をここに掲載します。</div>',
      `<div class="flyer flyer-image"><img src="${FLYER_URL}" alt="2026年11月1日 旭堂南不二・佐藤さくら子 二人会 公演チラシ" loading="lazy"></div>`
    );

    html = html.replace(
      '<div class="instagram-handle">@373.fuji</div>',
      `<div class="instagram-brand"><svg class="instagram-logo" viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.6" cy="6.7" r="1.15" fill="currentColor"/></svg><div class="instagram-handle">@373.fuji</div></div>`
    );

    const typeStyle = `<style id="hero-title-size-fix">
      html:lang(ja) .hero-kicker {
        font-size: clamp(2.85rem, 5vw, 5.2rem) !important;
        line-height: .98 !important;
        letter-spacing: .025em !important;
        font-weight: 500 !important;
        margin-bottom: 20px !important;
      }
      .event-flyer-link {
        display: block;
        width: min(360px, 100%);
        margin: 20px 0 26px;
      }
      .event-flyer-link img {
        display: block;
        width: 100%;
        height: auto;
        border: 1px solid var(--line);
        box-shadow: 0 10px 30px rgba(21,19,15,.10);
      }
      .flyer.flyer-image {
        padding: 0 !important;
        border: 0 !important;
        background: transparent !important;
      }
      .flyer.flyer-image img {
        display: block;
        width: min(560px, 100%);
        height: auto;
        margin: 0 auto;
        box-shadow: 0 12px 34px rgba(21,19,15,.12);
      }
      .instagram-brand {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 8px;
      }
      .instagram-logo {
        width: clamp(34px, 4vw, 46px);
        height: clamp(34px, 4vw, 46px);
        flex: 0 0 auto;
        color: var(--ink);
      }
      .instagram-brand .instagram-handle {
        margin-bottom: 0 !important;
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
