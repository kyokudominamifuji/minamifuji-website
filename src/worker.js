import site from "./index.js";
import gannojiFlyer from "./flyer-gannoji-2026-10-03.js";

const EVENTS_URL = "https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/src/events.json";

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function tokyoToday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const get = type => parts.find(p => p.type === type)?.value || "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function weekday(dateString) {
  const labels = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  return labels[new Date(`${dateString}T12:00:00+09:00`).getDay()] || "";
}

function renderEvent(e) {
  const [year, month, day] = String(e.date || "").split("-");
  const hasCapacity = Boolean(e.capacity_ja || e.capacity_en);
  const capacityJa = String(e.capacity_ja || "").replace(/^定員\s*/, "");
  const capacityEn = String(e.capacity_en || "").replace(/^Capacity\s*:?[ ]*/i, "");
  const reservation = e.reservation_url
    ? `<a class="reserve" href="${esc(e.reservation_url)}" target="_blank" rel="noopener noreferrer" data-ja="${esc(e.reservation_label_ja || "ご予約はこちら ↗")}" data-en="${esc(e.reservation_label_en || "Book here ↗")}">${esc(e.reservation_label_ja || "ご予約はこちら ↗")}</a>`
    : "";

  const flyerSrc = e.id === "2026-10-03-gannoji-nagoya" ? gannojiFlyer : e.flyer_url;
  const flyer = flyerSrc
    ? `<figure class="event-flyer"><a href="${esc(flyerSrc)}" target="_blank" rel="noopener noreferrer"><img src="${esc(flyerSrc)}" alt="${esc(e.title_ja || "公演チラシ")}" loading="lazy"></a><figcaption data-ja="チラシをタップすると拡大できます" data-en="Tap the flyer to enlarge">チラシをタップすると拡大できます</figcaption></figure>`
    : "";

  const capacity = hasCapacity
    ? `<div class="fact"><small data-ja="定員" data-en="CAPACITY">定員</small><b data-ja="${esc(capacityJa)}" data-en="${esc(capacityEn || capacityJa)}">${esc(capacityJa)}</b></div>`
    : "";
  const program = e.program_ja
    ? `<div class="event-program"><small data-ja="演目" data-en="PROGRAM">演目</small><p data-ja="${esc(e.program_ja)}" data-en="${esc(e.program_en || e.program_ja)}">${esc(e.program_ja)}</p></div>`
    : "";

  return `<article class="event" data-event-id="${esc(e.id || e.date)}">
        <div class="date"><div class="year">${esc(year)}</div><div class="day">${esc(`${month}.${day}`)}</div><div class="dow">${esc(weekday(e.date))}</div></div>
        <div>
          <div class="eyebrow" data-ja="${esc(e.category_ja)}" data-en="${esc(e.category_en)}">${esc(e.category_ja)}</div>
          <h3 data-ja="${esc(e.title_ja)}" data-en="${esc(e.title_en || e.title_ja)}">${esc(e.title_ja)}</h3>
          <p class="tagline" data-ja="${esc(e.tagline_ja)}" data-en="${esc(e.tagline_en || e.tagline_ja)}">${esc(e.tagline_ja)}</p>
          <div class="facts">
            <div class="fact"><small data-ja="会場" data-en="VENUE">会場</small><b data-ja="${esc(e.venue_ja)}" data-en="${esc(e.venue_en || e.venue_ja)}">${esc(e.venue_ja)}</b></div>
            <div class="fact"><small data-ja="時間" data-en="TIME">時間</small><b data-ja="${esc(e.time_ja)}" data-en="${esc(e.time_en || e.time_ja)}">${esc(e.time_ja)}</b></div>
            <div class="fact"><small data-ja="料金" data-en="TICKETS">料金</small><b data-ja="${esc(e.price_ja)}" data-en="${esc(e.price_en || e.price_ja)}">${esc(e.price_ja)}</b></div>
            ${capacity}
          </div>
          ${program}
          ${flyer}
          <div class="event-actions">${reservation}</div>
        </div>
      </article>`;
}

async function upcomingEventsMarkup() {
  try {
    const minute = Math.floor(Date.now() / 60000);
    const res = await fetch(`${EVENTS_URL}?v=${minute}`, {
      headers: { "cache-control": "no-cache" }
    });
    if (!res.ok) return null;

    const events = await res.json();
    if (!Array.isArray(events)) return null;

    const today = tokyoToday();
    const upcoming = events
      .filter(e => e && e.status !== "hidden" && e.status !== "draft" && e.date && e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));

    if (!upcoming.length) {
      return `<div class="event-empty" data-ja="現在、掲載中の公演情報はありません。次回公演をお楽しみに。" data-en="There are no upcoming performances listed at the moment.">現在、掲載中の公演情報はありません。次回公演をお楽しみに。</div>`;
    }

    return upcoming.map(renderEvent).join("\n");
  } catch {
    return null;
  }
}

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return response;
    }

    let html = await response.text();

    html = html
      .replace("高座で語り、大学でも講談を教える講談師。", "一席一会。二つとない講談を届ける講談師。")
      .replace("高座だけでなく、大学で講談を教え、講演やワークショップにも取り組んでいます。世界に向けては、英語での導入と日本語の講談、英語字幕による発信も準備しています。", "講談会やイベントでの高座に加え、講演やワークショップにも取り組んでいます。世界に向けては、英語での導入と日本語の講談、英語字幕による発信も準備しています。")
      .replace("講談会・イベント出演、大学・文化施設での講演、ワークショップ、取材・企画のご相談はメールでお問い合わせください。", "講談会・イベント出演、文化施設などでの講演、ワークショップ、取材・企画のご相談はメールでお問い合わせください。");

    const eventsMarkup = await upcomingEventsMarkup();
    if (eventsMarkup) {
      html = html.replace(/<article class="event">[\s\S]*?<\/article>/, eventsMarkup);
    }

    const fix = `
<style id="site-runtime-fixes">
  .hero h1 {
    white-space: nowrap !important;
    max-width: none !important;
    font-size: clamp(3.2rem, 5.6vw, 5.9rem) !important;
    letter-spacing: .025em !important;
  }

  .facts {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }

  .event + .event {
    border-top: 0;
  }

  .event-program {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--line);
  }

  .event-program small {
    display: block;
    color: var(--muted);
    font-size: .7rem;
    letter-spacing: .12em;
    margin-bottom: 8px;
  }

  .event-program p {
    margin: 0;
    line-height: 1.9;
    font-size: .92rem;
  }

  .event-flyer {
    margin: 30px 0 8px;
    width: min(320px, 100%);
  }

  .event-flyer a {
    display: block;
  }

  .event-flyer img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--line);
    box-shadow: 0 12px 30px rgba(0,0,0,.10);
  }

  .event-flyer figcaption {
    margin-top: 8px;
    color: var(--muted);
    font-size: .72rem;
  }

  .event-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    margin-top: 20px;
  }

  .event-actions .reserve {
    margin-top: 0;
    display: inline-block;
    border-bottom: 1px solid var(--ink);
    padding-bottom: 4px;
    font-weight: 700;
  }

  .event-empty {
    border-top: 1px solid var(--ink);
    border-bottom: 1px solid var(--ink);
    padding: 42px 0;
    color: var(--muted);
  }

  @media (max-width: 1100px) {
    .hero h1 {
      font-size: clamp(3rem, 6.2vw, 4.7rem) !important;
    }
    .facts {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
  }

  @media (max-width: 850px) {
    .hero h1 {
      white-space: nowrap !important;
      font-size: clamp(2.65rem, 13vw, 3.45rem) !important;
      letter-spacing: .01em !important;
    }
    .facts {
      grid-template-columns: 1fr !important;
    }
    .event-flyer {
      width: min(360px, 100%);
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
