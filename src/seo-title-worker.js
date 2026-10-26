import site from "./seo-worker.js";
import gameHtml from "./tono-game.js";
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


export default {
  async fetch(request, env, ctx) {
    // Serve the stand-alone Tono no Okimochi game without modifying the homepage.
    const path = new URL(request.url).pathname;
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
