import igaSubtitlesHtml from "./iga-subtitles.js";
import site from "./seo-worker.js";
import gameHtml from "./tono-game.js";
import paperGameHtml from "./tono-paper-game.js";
import arigatoHtml from "./arigato-game.js";
import miyakeHtml from "./miyake-game.js";
import upgradeHomepage from "./homepage-upgrade.js";

function ensureAssociationLink(html, path) {
  if (!["/", "/en", "/en/"].includes(path)) return html;

  // Keep the association link present even if a cached upstream profile uses
  // the former plain-text bio. Do not touch event pages or game routes.
  if (!html.includes('class="kamigata-link"')) {
    const oldParagraph = /<p class="big" data-ja="静岡県富士市を拠点に活動する講談師。旭堂南左衛門に師事。上方講談協会所属。" data-en="A Kōdan storyteller based in Fuji City, Shizuoka. Disciple of Kyokudo Nanzaemon and a member of the Kamigata Kodan Association.">静岡県富士市を拠点に活動する講談師。旭堂南左衛門に師事。上方講談協会所属。<\/p>/;
    const withLink = '<p class="big"><span data-ja="静岡県富士市を拠点に活動する講談師。旭堂南左衛門に師事。" data-en="A Kōdan storyteller based in Fuji City, Shizuoka. Disciple of Kyokudo Nanzaemon and a member of the ">静岡県富士市を拠点に活動する講談師。旭堂南左衛門に師事。</span><a class="kamigata-link" href="https://kamigata-kodan.jp/" target="_blank" rel="noopener noreferrer" data-ja="上方講談協会" data-en="Kamigata Kodan Association" aria-label="上方講談協会 公式サイト">上方講談協会</a><span data-ja="所属。" data-en=".">所属。</span></p>';
    html = html.replace(oldParagraph, withLink);
  }

  // A discreet but reliably visible affordance.
  if (html.includes('class="kamigata-link"') && !html.includes('id="association-link-style"')) {
    html = html.replace("</head>", '<style id="association-link-style">.profile-copy .big a.kamigata-link{color:inherit;text-decoration:underline!important;text-decoration-color:#a67b3f!important;text-decoration-thickness:2px!important;text-underline-offset:.18em!important}.profile-copy .big a.kamigata-link:hover,.profile-copy .big a.kamigata-link:focus-visible{color:#9f2d26!important;text-decoration-color:currentColor!important}</style>\n</head>');
  }
  return html;
}



function applyNovemberNotice(html, path) {
  const home = ["/", "/en", "/en/"].includes(path);
  const detail = ["/events/2026-11-01", "/events/2026-11-01/"].includes(path);
  if (!home && !detail) return html;
  const en = path.startsWith("/en");
  const title = "旭堂南不二とオレンジマジシャンニシオの特別公演";
  const notice = '<aside class="mf-change-notice" aria-label="公演内容変更のお知らせ">' +
    '<strong>' + (en ? 'November 1 — Program change and apology' : '11月1日 公演内容変更のお知らせとお詫び') + '</strong>' +
    '<p>' + (en ? 'Sakurako Sato is unable to appear, so the duo performance is postponed. We sincerely apologize. November 1 will feature Kyokudo Minamifuji and Orange Magician Nishio at the same time, venue and prices.' : '佐藤さくら子先生のご都合により、二人会は延期となりました。楽しみにされていた皆様に、心よりお詫び申し上げます。11月1日は「' + title + '」を、同じ日時・会場・料金で開催します。') + '</p>' +
    '<p>' + (en ? 'Existing bookings remain valid; no action is needed to attend. For a free cancellation, email ' : 'ご予約はそのまま有効です（再申し込み不要）。キャンセルは無料です。ご希望の方は ') +
    '<a href="mailto:373fuji@gmail.com">373fuji@gmail.com</a>' +
    (en ? '. A new date for the duo performance will be announced when decided.' : ' へご連絡ください。二人会の新日程は、決まり次第お知らせします。') + '</p></aside>';
  if (home) {
    html = html.replaceAll("旭堂南不二・佐藤さくら子 二人会", title)
      .replaceAll("Kyokudo Minamifuji &amp; Sakurako Sato", "Kyokudo Minamifuji &amp; Orange Magician Nishio")
      .replaceAll("Kyokudo Minamifuji & Sakurako Sato", "Kyokudo Minamifuji & Orange Magician Nishio")
      .replaceAll("講談 × 三味線 ／ 静岡・富士", "講談 × マジック ／ 静岡・富士")
      .replaceAll("KŌDAN × SHAMISEN / FUJI, SHIZUOKA", "KŌDAN × MAGIC / FUJI, SHIZUOKA")
      .replaceAll("声と糸が、物語を紡ぐ。", "講談と本格ステージマジックをお届けします。")
      .replaceAll("Voice and strings weave a story.", "Enjoy Kōdan and a full stage magic show.");
    html = html.replace(/<article class="event"[^>]*data-event-id="2026-11-01-minamifuji-sakurako"[\s\S]*?<\/article>/, card =>
      card.replace(/<a class="event-flyer-link"[\s\S]*?<\/a>/g, "")
        .replace('<div class="event-actions">', notice + '<div class="event-actions">')
        .replaceAll("公演詳細・チラシを見る", "公演詳細を見る")
        .replaceAll("第一回二人会の公演詳細とチラシを見る", "11月1日特別公演の詳細を見る"));
  }
  if (detail) {
    html = html.replace(/<h1 class="fk-title"[\s\S]*?<\/h1>/, '<h1 class="fk-title" id="fk-event-heading">旭堂南不二<br><span class="mf-magic-name">オレンジマジシャンニシオ</span><small>特 別 公 演</small></h1>')
      .replaceAll("第一回 旭堂南不二・佐藤さくら子 二人会", title)
      .replaceAll("旭堂南不二・佐藤さくら子 二人会", title)
      .replaceAll("FIRST PERFORMANCE ・ 講談 × 三味線", "SPECIAL PERFORMANCE ・ 講談 × マジック")
      .replaceAll("張り扇と三本の糸が、物語を紡ぐ。", "講談とマジック、特別なひとときを。")
      .replaceAll("語りの迫力と三味線の響きが出会う、富士の一日。<br>ゲストはオレンジマジシャンニシオ。", "旭堂南不二の講談と、本格ステージマジックをお楽しみください。")
      .replaceAll("旭堂南不二 ／ 佐藤さくら子<br><small>ゲスト：オレンジマジシャンニシオ</small>", "旭堂南不二 ／ オレンジマジシャンニシオ")
      .replaceAll("語りと糸、そして驚き。", "講談とマジック。")
      .replaceAll("講談師・旭堂南不二と三味線奏者・佐藤さくら子が、伝統の話芸と音色を届けます。さらに、オレンジマジシャンニシオがゲスト出演。", "旭堂南不二の講談と、プロ歴10年のオレンジマジシャンニシオによる本格ステージマジックをお届けします。")
      .replace(/<figure class="fk-(?:poster|reverse)">[\s\S]*?<\/figure>/g, "")
      .replace(/<p class="fk-guest">[\s\S]*?<\/p>/, "")
      .replace(/<meta property="og:image"[^>]*>/, "")
      .replace('<div class="fk-hero-actions">', notice + '<div class="fk-hero-actions">')
      .replace('<div class="fk-booking">', notice + '<div class="fk-booking">')
      .replaceAll("申込先は従来と同じGoogleフォームです。チラシのQRコードも引き続き利用できます。", "変更後の特別公演へのお申し込みはこちら。")
      .replace("※ 全席自由。未就学児は入場できません。", "※ 全席自由・1ドリンク付き（アルコール可）。未就学児入場不可。店内は電子タバコのみ喫煙可能です。<br>企画：一般社団法人F-PRIDE");
  }
  return html.replace("</head>", '<style id="mf-november-change">.mf-change-notice{margin:22px 0;padding:18px 20px;border:1px solid #b86542;border-left:4px solid #a13d28;background:#fff7e9;color:#30251e;font:400 .9rem/1.85 system-ui,sans-serif;overflow-wrap:anywhere;letter-spacing:normal}.mf-change-notice strong{display:block;color:#922e22;font-size:1rem}.mf-change-notice p{margin:9px 0 0}.mf-change-notice a{text-decoration:underline;color:#822b21}.fk-hero-grid,.fk-people-grid{grid-template-columns:minmax(0,1fr)}.fk-hero-grid>div{max-width:850px}.fk-title .mf-magic-name{font-size:.62em}.event[data-event-id="2026-11-01-minamifuji-sakurako"]>div:nth-child(2){grid-template-columns:minmax(0,1fr)!important}</style></head>');
}

export default {
  async fetch(request, env, ctx) {
    // Serve the stand-alone Tono no Okimochi game without modifying the homepage.
    const path = new URL(request.url).pathname;
    if (["/subtitles/iga", "/subtitles/iga/", "/subtitles/iga/index.html"].includes(path)) {
      return new Response(igaSubtitlesHtml, { headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "permissions-policy": "microphone=(self)",
        "x-content-type-options": "nosniff",
        "x-robots-tag": "noindex, nofollow, noarchive"
      } });
    }
    // Paper-answer edition: an independent game with its own local save key.
    if (path === "/games/tono-paper" || path === "/games/tono-paper/" || path === "/games/tono-paper/index.html") {
      return new Response(paperGameHtml, { status: 200, headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store, max-age=0, must-revalidate",
        "x-content-type-options": "nosniff"
      } });
    }
    if (path === "/games/tono" || path === "/games/tono/") {
      return new Response(gameHtml, { status: 200, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store, max-age=0, must-revalidate", "x-content-type-options": "nosniff" } });
    }
    // Dedicated standalone route: Worker otherwise returns the homepage for every path.
    if (path === "/games/arigato" || path === "/games/arigato/" || path === "/games/arigato/index.html") {
      return new Response(arigatoHtml, {
        status: 200,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store, max-age=0, must-revalidate",
          "x-content-type-options": "nosniff"
        }
      });
    }
    // Miyake-gumi's independent gratitude game; keep the homepage and other games untouched.
    if (path === "/games/miyake" || path === "/games/miyake/" || path === "/games/miyake/index.html") {
      return new Response(miyakeHtml, {
        status: 200,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store, max-age=0, must-revalidate",
          "x-content-type-options": "nosniff",
          "x-robots-tag": "noindex, nofollow, noarchive"
        }
      });
    }
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();
    // Final-pass enhancements are scoped to the homepage; events and Tono game remain untouched.
    html = upgradeHomepage(html, path);
    html = ensureAssociationLink(html, path);
    html = applyNovemberNotice(html, path);

    html = html.replace(
      /<h4 data-ja="鍵盤に命をかけた男たち" data-en="Men Who Gave Their Lives to the Keys">[\s\S]*?<\/h4>/,
      '<h4 data-ja="鍵盤に命を吹き込んだ男たち" data-en="The Men Who Breathed Life into the Keys">鍵盤に命を吹き込んだ男たち</h4>'
    );

    html = html.replace(
      /<p data-ja="語りと鍵盤がぶつかり合い、ひとつの物語になる。音楽に人生を懸けた男たちを描く、世界初・ピアノとのコラボ講談。" data-en="Voice and piano collide and become one story. A world-first collaboration between Kōdan and piano, portraying men who devoted their lives to music.">[\s\S]*?<\/p>/,
      '<p data-ja="音楽と人間の情熱を、講談という語りの力で描く新しい挑戦。" data-en="A new challenge: portraying music and human passion through the storytelling power of Kōdan.">音楽と人間の情熱を、講談という語りの力で描く新しい挑戦。</p>'
    );

    const url = new URL(request.url);
    if (url.pathname === "/en" || url.pathname.startsWith("/en/")) {
      html = html.replace(
        '>鍵盤に命を吹き込んだ男たち</h4>',
        '>The Men Who Breathed Life into the Keys</h4>'
      );
      html = html.replace(
        '>音楽と人間の情熱を、講談という語りの力で描く新しい挑戦。</p>',
        '>A new challenge: portraying music and human passion through the storytelling power of Kōdan.</p>'
      );
    }

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("cache-control", "no-store, no-cache, must-revalidate, max-age=0");
    headers.set("x-seo-title-worker", "v1");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
