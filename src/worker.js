import site from "./index.js";

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

  const detailLink = e.detail_url
    ? `<a class="event-detail-link" href="${esc(e.detail_url)}" data-ja="${esc(e.detail_label_ja || "公演詳細を見る →")}" data-en="${esc(e.detail_label_en || "Event details →")}">${esc(e.detail_label_ja || "公演詳細を見る →")}</a>`
    : "";
  const flyerSrc = e.flyer_url;
  const flyer = flyerSrc
    ? `<figure class="event-flyer"><a href="${esc(flyerSrc)}" target="_blank" rel="noopener noreferrer"><img src="${esc(flyerSrc)}" alt="${esc(e.title_ja || "公演チラシ")}" loading="lazy"></a><figcaption data-ja="チラシをタップすると拡大できます" data-en="Tap the flyer to enlarge">チラシをタップすると拡大できます</figcaption></figure>`
    : "";

  const capacity = hasCapacity
    ? `<div class="fact"><small data-ja="定員" data-en="CAPACITY">定員</small><b data-ja="${esc(capacityJa)}" data-en="${esc(capacityEn || capacityJa)}">${esc(capacityJa)}</b></div>`
    : "";
  const program = e.program_ja
    ? `<div class="event-program"><small data-ja="演目" data-en="PROGRAM">演目</small><p data-ja="${esc(e.program_ja)}" data-en="${esc(e.program_en || e.program_ja)}">${esc(e.program_ja)}</p></div>`
    : "";

  return `<article class="event" data-event-id="${esc(e.id || e.date)}"${e.featured ? ' data-featured="true"' : ""}>
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
          <div class="event-actions">${reservation}${detailLink}</div>
        </div>
      </article>`;
}


// メディア掲載。新しいものを上に追加する。記事の全文は載せず、見出し・ひとこと紹介・リンクだけ。
const MEDIA = [
  {
    date: "2025.08",
    outlet_ja: "Yahoo!ニュース エキスパート",
    outlet_en: "Yahoo! News Japan (Expert)",
    title: "【富士市】英語字幕付き講談! 富士市出身の講談師・旭堂南不二さんが挑む新境地 ‘Kodan’",
    summary_ja: "英語字幕付きの講談への挑戦と、富士駅前のゲストハウス「富士と碧」での講談会が、日英併記で紹介されました。",
    summary_en: "A bilingual feature on Minamifuji's English-subtitled Kōdan and his performances at Guesthouse Fuji to Ao near Fuji Station.",
    url: "https://news.yahoo.co.jp/expert/articles/f3ea2ac3d38e141858d2edfa1532231c8d5db4f4"
  }
];

export function mediaSectionMarkup() {
  if (!MEDIA.length) return "";
  const items = MEDIA.map(m => `<li class="mf-media-item">
          <div class="mf-media-meta"><span>${esc(m.date)}</span><span data-ja="${esc(m.outlet_ja)}" data-en="${esc(m.outlet_en || m.outlet_ja)}">${esc(m.outlet_ja)}</span></div>
          <a class="mf-media-title" href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">${esc(m.title)} ↗</a>
          <p data-ja="${esc(m.summary_ja)}" data-en="${esc(m.summary_en || m.summary_ja)}">${esc(m.summary_ja)}</p>
        </li>`).join("\n        ");
  return `<section class="mf-media" id="media">
    <div class="wrap">
      <div class="eyebrow">MEDIA</div>
      <h2 data-ja="メディア掲載" data-en="In the Media">メディア掲載</h2>
      <ul class="mf-media-list">
        ${items}
      </ul>
    </div>
  </section>`;
}

function noUpcomingEventMarkup(unavailable = false) {
  const ja = unavailable
    ? "公演予定を一時的に取得できません。時間をおいて再度ご覧いただくか、Instagramで最新のお知らせをご確認ください。"
    : "現在、掲載中の公演予定はありません。新しいお知らせはInstagramでもご案内しています。";
  const en = unavailable
    ? "The performance schedule is temporarily unavailable. Please try again later or check Instagram for updates."
    : "There are no upcoming performances listed right now. Please check Instagram for news.";
  return '<div class="event-empty" role="status">' +
    '<p data-ja="' + esc(ja) + '" data-en="' + esc(en) + '">' + esc(ja) + '</p>' +
    '<div class="event-empty-links"><a href="https://www.instagram.com/373.fuji/" target="_blank" rel="noopener noreferrer" data-ja="Instagramで活動を見る ↗" data-en="View Instagram ↗">Instagramで活動を見る ↗</a>' +
    '<a href="mailto:373fuji@gmail.com?subject=%E8%AC%9B%E8%AB%87%E5%85%AC%E6%BC%94%E3%81%AE%E3%81%94%E6%A1%88%E5%86%85" data-ja="公演について問い合わせる ↗" data-en="Ask about performances ↗">公演について問い合わせる ↗</a></div>' +
    '</div>';
}

// ---------------------------------------------------------------------------
// 公演データ（src/events.json）から3つを作る:
//   upcoming … これからの公演カード
//   past     … 「これまでの公演」一覧（新しい順・年ごと。今年はひらいた状態）
//   jsonLd   … Google検索向けの公演データ（schema.org Event）。これからの公演のみ
// ---------------------------------------------------------------------------
const SITE_ORIGIN = "https://kyokudominamifuji.com";
const WEEKDAY_JA = ["日", "月", "火", "水", "木", "金", "土"];

function isListed(e) {
  return e && e.status !== "hidden" && e.status !== "draft" && e.date;
}

function minamifujiPiece(e) {
  const ja = (String(e.program_ja || "").match(/旭堂\s*南不二\s*『([^』]+)』/) || [])[1]
    || (String(e.tagline_ja || "").match(/旭堂\s*南不二\s*『([^』]+)』/) || [])[1] || "";
  const en = (String(e.program_en || "").match(/Kyokudo Minamifuji\s+—\s+([^/]+?)\s*(?:\/|$)/) || [])[1]
    || (String(e.tagline_en || "").match(/Kyokudo Minamifuji\s+—\s+([^/]+?)\s*(?:\/|$)/) || [])[1] || "";
  return { ja, en };
}

function placeLabel(category = "") {
  const parts = String(category).split(/\s*[／/]\s*/);
  return parts.length > 1 ? parts[parts.length - 1] : "";
}

function renderPastItem(e) {
  const [year, month, day] = e.date.split("-");
  const dow = new Date(`${e.date}T12:00:00+09:00`).getDay();
  const piece = minamifujiPiece(e);
  const placeJa = placeLabel(e.category_ja);
  const placeEn = placeLabel(e.category_en);
  const pieceHtml = piece.ja
    ? `<span class="mf-archive-piece" data-ja="${esc(`演目『${piece.ja}』`)}" data-en="${esc(piece.en ? `Program: ${piece.en}` : `Program: ${piece.ja}`)}">${esc(`演目『${piece.ja}』`)}</span>`
    : "";
  const detail = e.detail_url
    ? `<a class="mf-archive-link" href="${esc(e.detail_url)}" data-ja="詳細 →" data-en="Details →">詳細 →</a>`
    : "";
  return `<li class="mf-archive-item">
          <time datetime="${esc(e.date)}"><span class="mf-archive-md">${esc(`${Number(month)}.${Number(day)}`)}</span><span class="mf-archive-dow" data-ja="${esc(WEEKDAY_JA[dow] || "")}" data-en="${esc(weekday(e.date).slice(0, 3))}">${esc(WEEKDAY_JA[dow] || "")}</span></time>
          <div class="mf-archive-body">
            <b data-ja="${esc(e.title_ja)}" data-en="${esc(e.title_en || e.title_ja)}">${esc(e.title_ja)}</b>
            <span class="mf-archive-meta">${placeJa ? `<span class="mf-archive-place" data-ja="${esc(placeJa)}" data-en="${esc(placeEn || placeJa)}">${esc(placeJa)}</span>` : ""}${pieceHtml}</span>
          </div>
          ${detail}
        </li>`;
}

function pastEventsMarkup(past, thisYear) {
  if (!past.length) return "";
  const years = [...new Set(past.map(e => e.date.slice(0, 4)))].sort((a, b) => b.localeCompare(a));
  const groups = years.map(y => {
    const items = past.filter(e => e.date.startsWith(y));
    const countJa = `${y}年 · ${items.length}公演`;
    const countEn = `${y} · ${items.length} performance${items.length === 1 ? "" : "s"}`;
    return `<details class="mf-archive-year"${y === thisYear || y === years[0] ? " open" : ""}>
        <summary data-ja="${esc(countJa)}" data-en="${esc(countEn)}">${esc(countJa)}</summary>
        <ol class="mf-archive-list">
        ${items.map(renderPastItem).join("\n        ")}
        </ol>
      </details>`;
  }).join("\n      ");
  return `<div class="mf-archive" id="archive">
      <div class="mf-archive-head">
        <div class="eyebrow">ARCHIVE</div>
        <h3 data-ja="これまでの公演" data-en="Past Performances">これまでの公演</h3>
        <p data-ja="主催公演のほか、上方講談協会の講談会などに出演しています。" data-en="Besides his own shows, Minamifuji appears regularly at Kamigata Kōdan Association performances.">主催公演のほか、上方講談協会の講談会などに出演しています。</p>
      </div>
      ${groups}
    </div>`;
}

function startTime(e) {
  const m = String(e.time_ja || "").match(/(\d{1,2}):(\d{2})\s*開演/) || String(e.time_en || "").match(/Start\s+(\d{1,2}):(\d{2})/);
  return m ? `${e.date}T${m[1].padStart(2, "0")}:${m[2]}:00+09:00` : e.date;
}

function eventJsonLd(e) {
  const [venueName, ...rest] = String(e.venue_ja || "").split(/\s*·\s*/);
  const address = rest.join(" ").replace(/（[^）]*）/g, "").trim();
  const price = (String(e.price_ja || "").match(/([\d,]+)\s*円/) || [])[1];
  const piece = minamifujiPiece(e);
  const data = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title_ja,
    startDate: startTime(e),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: venueName,
      address: { "@type": "PostalAddress", streetAddress: address || venueName, addressCountry: "JP" }
    },
    description: [e.category_ja, e.tagline_ja || (piece.ja ? `旭堂南不二『${piece.ja}』` : ""), e.time_ja, e.price_ja].filter(Boolean).join(" ／ "),
    performer: { "@type": "Person", name: "旭堂南不二", alternateName: "Kyokudo Minamifuji", url: `${SITE_ORIGIN}/` },
    url: `${SITE_ORIGIN}/#stage`,
    inLanguage: "ja"
  };
  if (e.flyer_url) data.image = [new URL(e.flyer_url, SITE_ORIGIN).href];
  if (price) {
    data.offers = {
      "@type": "Offer",
      price: price.replace(/,/g, ""),
      priceCurrency: "JPY",
      url: /^https?:/.test(e.reservation_url || "") ? e.reservation_url : `${SITE_ORIGIN}/#stage`,
      validFrom: "2026-01-01T00:00:00+09:00"
    };
  }
  return data;
}

async function eventsMarkup() {
  try {
    const minute = Math.floor(Date.now() / 60000);
    const res = await fetch(`${EVENTS_URL}?v=${minute}`, {
      headers: { "cache-control": "no-cache" }
    });
    if (!res.ok) return { upcoming: noUpcomingEventMarkup(true), past: "", jsonLd: "" };

    const events = await res.json();
    if (!Array.isArray(events)) return { upcoming: noUpcomingEventMarkup(true), past: "", jsonLd: "" };

    const today = tokyoToday();
    const listed = events.filter(isListed);
    const upcoming = listed
      .filter(e => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));
    const past = listed
      .filter(e => e.date < today && e.archive !== false)
      .sort((a, b) => b.date.localeCompare(a.date));

    const ld = upcoming.map(eventJsonLd);
    const jsonLd = ld.length
      ? `<script type="application/ld+json" id="mf-events-ld">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`
      : "";

    return {
      upcoming: upcoming.length ? upcoming.map(renderEvent).join("\n") : noUpcomingEventMarkup(false),
      past: pastEventsMarkup(past, today.slice(0, 4)),
      jsonLd
    };
  } catch {
    // Never reveal the old hardcoded show/booking form when upstream data fails.
    return { upcoming: noUpcomingEventMarkup(true), past: "", jsonLd: "" };
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

    const { upcoming, past, jsonLd } = await eventsMarkup();
    html = html.replace(/<article class="event">[\s\S]*?<\/article>/, () => upcoming + "\n" + past);
    if (jsonLd) html = html.replace("</head>", () => jsonLd + "\n</head>");

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

  /* Highlight the featured Nov 1 performance with an uncluttered poster + booking layout. */
  .event[data-featured="true"] {
    padding: 34px 30px;
    margin-bottom: 28px;
    border: 1px solid rgba(21,19,15,.16);
    border-top: 4px solid var(--red);
    background: #fffaf1;
    box-shadow: 0 16px 45px rgba(21,19,15,.05);
  }
  .event[data-featured="true"] > div:nth-child(2) {
    display: grid;
    grid-template-columns: minmax(0,1fr) minmax(220px,300px);
    column-gap: 30px;
    align-items: start;
    min-width: 0;
  }
  .event[data-featured="true"] > div:nth-child(2) > :not(.event-flyer-link) {
    grid-column: 1;
    min-width: 0;
  }
  .event[data-featured="true"] .event-flyer-link {
    grid-column: 2;
    grid-row: 1 / span 6;
    margin: 0;
    width: 100%;
  }
  .event[data-featured="true"] .facts {
    grid-template-columns: minmax(0,1fr) !important;
    gap: 14px;
  }
  .event[data-featured="true"] .fact b {
    display: block;
    line-height: 1.6;
    overflow-wrap: anywhere;
  }
  .event[data-featured="true"] .event-actions {
    gap: 10px;
    margin-top: 15px;
  }
  .event[data-featured="true"] .event-actions .reserve,
  .event-detail-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 45px;
    padding: 10px 15px;
    margin: 0;
    border: 1px solid var(--red);
    text-decoration: none;
    font-size: .85rem;
    line-height: 1.5;
    font-weight: 800;
    text-align: center;
  }
  .event[data-featured="true"] .event-actions .reserve {
    background: var(--red);
    color: #fff;
  }
  .event-detail-link { color: var(--red); background: transparent; }
  .event-detail-link:hover,.event-detail-link:focus-visible {background: rgba(159,45,38,.07);}
  @media (max-width: 1050px) {
    .event[data-featured="true"] > div:nth-child(2) {
      grid-template-columns: 1fr;
    }
    .event[data-featured="true"] .event-flyer-link {
      grid-column: 1;
      grid-row: auto;
      max-width: 360px;
      margin: 12px 0 20px;
    }
  }
  @media (max-width: 600px) {
    .event[data-featured="true"] {padding: 24px 18px;}
    .event[data-featured="true"] .event-actions {flex-direction: column;align-items:stretch;}
  }

  /* メディア掲載 */
  .mf-media{padding:64px 0;background:#f7f3ec;border-top:1px solid rgba(44,34,23,.12)}
  .mf-media h2{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-weight:500;font-size:clamp(1.8rem,3.4vw,2.6rem);margin:8px 0 22px}
  .mf-media-list{list-style:none;margin:0;padding:0;border-top:1px solid rgba(44,34,23,.17)}
  .mf-media-item{padding:18px 2px;border-bottom:1px solid rgba(44,34,23,.17)}
  .mf-media-meta{display:flex;gap:14px;font-size:.74rem;letter-spacing:.06em;color:#9a6c43;margin-bottom:6px}
  .mf-media-title{display:inline-block;font-weight:700;font-size:1rem;line-height:1.6;color:inherit;text-decoration:underline;text-decoration-color:rgba(161,61,40,.4);text-underline-offset:4px;overflow-wrap:anywhere}
  .mf-media-title:hover,.mf-media-title:focus-visible{color:#a13d28}
  .mf-media-item p{margin:6px 0 0;color:var(--muted);font-size:.86rem;line-height:1.8}

  /* これまでの公演 */
  .mf-archive{margin-top:56px;padding-top:34px;border-top:1px solid rgba(44,34,23,.25)}
  .mf-archive-head{margin-bottom:18px}
  .mf-archive-head h3{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-weight:500;font-size:clamp(1.6rem,3vw,2.2rem);line-height:1.3;margin:6px 0 8px}
  .mf-archive-head p{margin:0;color:var(--muted);font-size:.86rem;line-height:1.8}
  .mf-archive-year{border-top:1px solid rgba(44,34,23,.17)}
  .mf-archive-year:last-child{border-bottom:1px solid rgba(44,34,23,.17)}
  .mf-archive-year summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;padding:14px 2px;font-weight:700;font-size:.92rem;letter-spacing:.06em}
  .mf-archive-year summary::-webkit-details-marker{display:none}
  .mf-archive-year summary::after{content:"＋";color:#a13d28;font-weight:400}
  .mf-archive-year[open] summary::after{content:"－"}
  .mf-archive-list{list-style:none;margin:0 0 10px;padding:0}
  .mf-archive-item{display:grid;grid-template-columns:76px minmax(0,1fr) auto;gap:6px 18px;align-items:baseline;padding:13px 2px;border-top:1px dashed rgba(44,34,23,.16)}
  .mf-archive-item time{display:flex;gap:6px;align-items:baseline;white-space:nowrap}
  .mf-archive-md{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.25rem;letter-spacing:-.02em}
  .mf-archive-dow{font-size:.68rem;color:#9a6c43;letter-spacing:.08em}
  .mf-archive-body{min-width:0;display:flex;flex-direction:column;gap:3px}
  .mf-archive-body b{font-weight:700;font-size:.95rem;line-height:1.6;overflow-wrap:anywhere}
  .mf-archive-meta{display:flex;flex-wrap:wrap;gap:2px 14px;color:var(--muted);font-size:.8rem;line-height:1.7}
  .mf-archive-piece{color:#695c4d}
  .mf-archive-link{font-size:.78rem;font-weight:700;color:#a13d28;white-space:nowrap;text-decoration:none}
  .mf-archive-link:hover,.mf-archive-link:focus-visible{text-decoration:underline}
  @media (max-width:600px){
    .mf-archive-item{grid-template-columns:62px minmax(0,1fr);}
    .mf-archive-link{grid-column:2}
  }

  .event-empty p{margin:0 0 15px;line-height:1.85}
  .event-empty-links{display:flex;gap:12px 24px;flex-wrap:wrap}
  .event-empty-links a{font-size:.9rem;font-weight:700;color:var(--red);text-decoration:underline;text-underline-offset:4px}
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
