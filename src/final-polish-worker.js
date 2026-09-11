import site from "./repertoire-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    // Top navigation: 出演情報 → 南不二について → 主な演目 → ご依頼
    html = html.replace(/<nav class="navlinks"[\s\S]*?<\/nav>/, nav => {
      let updated = nav
        .replace(
          '<a href="#about" data-ja="プロフィール" data-en="Profile">プロフィール</a>',
          '<a href="#about" data-ja="南不二について" data-en="About Minamifuji">南不二について</a>'
        )
        .replace(/\s*<a href="#repertoire" data-ja="主な演目" data-en="Repertoire">主な演目<\/a>/g, "");

      updated = updated.replace(
        /(<a href="#about"[^>]*>[^<]*<\/a>)/,
        '$1\n      <a href="#repertoire" data-ja="主な演目" data-en="Repertoire">主な演目</a>'
      );
      return updated;
    });

    // TOP buttons: "出演情報を見る" → "出演情報", and keep a direct Repertoire link.
    html = html.replace(
      '<a class="btn primary" href="#stage" data-ja="出演情報を見る" data-en="View Schedule">出演情報を見る</a>',
      '<a class="btn primary" href="#stage" data-ja="出演情報" data-en="Schedule">出演情報</a>'
    );

    html = html.replace(/<div class="actions">[\s\S]*?<\/div>/, actions => {
      let updated = actions.replace(/\s*<a class="btn" href="#repertoire"[^>]*>[^<]*<\/a>/g, "");
      updated = updated.replace(
        /(<a class="btn" href="#about"[^>]*>[^<]*<\/a>)/,
        '$1\n        <a class="btn" href="#repertoire" data-ja="主な演目" data-en="Repertoire">主な演目</a>'
      );
      return updated;
    });

    // Make Classical and Original Kōdan use one visual/typographic language.
    const polishStyle = `<style id="repertoire-polish">
      #repertoire .classical-group,
      #repertoire .original-group {
        margin-top: 78px !important;
      }

      #repertoire .group-title-row {
        grid-template-columns: .72fr 1.28fr !important;
        gap: 64px !important;
        align-items: start !important;
        margin-bottom: 34px !important;
        padding-top: 22px !important;
        border-top: 1px solid rgba(27,26,23,.28) !important;
      }

      #repertoire .group-title-row h3 {
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif !important;
        font-size: clamp(2rem,3.8vw,3.4rem) !important;
        line-height: 1.2 !important;
        font-weight: 500 !important;
        margin: 0 !important;
      }

      #repertoire .group-title-row > p,
      #repertoire .original-intro p,
      #repertoire .category-copy {
        font-family: "Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif !important;
        font-size: .95rem !important;
        line-height: 1.95 !important;
        color: #514b43 !important;
      }

      /* Individual story titles: same Mincho face and size everywhere. */
      #repertoire .story-item h4,
      #repertoire .original-card h4,
      #repertoire .title-line {
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif !important;
        font-size: 1.12rem !important;
        line-height: 1.6 !important;
        font-weight: 600 !important;
        color: #1b1a17 !important;
      }

      /* Story explanations: same Gothic face and size everywhere. */
      #repertoire .story-item p,
      #repertoire .original-card p {
        font-family: "Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif !important;
        font-size: .9rem !important;
        line-height: 1.8 !important;
        color: #665f56 !important;
      }

      #repertoire .story-item {
        background: #fbf8f2 !important;
      }

      #repertoire .title-line {
        margin: 22px 0 0 !important;
        padding: 22px 24px !important;
        background: #fbf8f2 !important;
        border: 1px solid rgba(27,26,23,.13) !important;
      }

      /* Original works now use the same light, editorial treatment as classical works. */
      #repertoire .original-grid {
        display: grid !important;
        grid-template-columns: 1fr !important;
        gap: 0 !important;
        border-top: 1px solid #1b1a17 !important;
      }

      #repertoire .original-card,
      #repertoire .original-card:nth-child(5),
      #repertoire .featured-original {
        display: grid !important;
        grid-template-columns: 58px minmax(0,1fr) !important;
        column-gap: 18px !important;
        min-height: 0 !important;
        padding: 26px 0 !important;
        background: transparent !important;
        color: #1b1a17 !important;
        border: 0 !important;
        border-bottom: 1px solid rgba(27,26,23,.42) !important;
      }

      #repertoire .original-no {
        grid-column: 1 !important;
        grid-row: 1 / span 3 !important;
        margin: 2px 0 0 !important;
        font-family: Georgia,serif !important;
        font-size: .8rem !important;
        letter-spacing: .1em !important;
        color: #a67b42 !important;
      }

      #repertoire .original-card h4,
      #repertoire .original-card p,
      #repertoire .special-badge {
        grid-column: 2 !important;
      }

      #repertoire .original-card h4 {
        margin: 0 0 8px !important;
      }

      #repertoire .original-card p {
        margin: 0 !important;
      }

      #repertoire .special-badge {
        justify-self: start !important;
        margin: 0 0 10px !important;
        padding: 4px 9px !important;
        border: 1px solid #b28a51 !important;
        color: #8b6535 !important;
        background: transparent !important;
        font-size: .68rem !important;
      }

      #repertoire .featured-original p strong {
        color: #1b1a17 !important;
      }

      @media(max-width:850px){
        #repertoire .group-title-row {
          grid-template-columns: 1fr !important;
          gap: 22px !important;
        }
      }

      @media(max-width:520px){
        #repertoire .original-card,
        #repertoire .original-card:nth-child(5),
        #repertoire .featured-original {
          grid-template-columns: 32px minmax(0,1fr) !important;
          column-gap: 10px !important;
          padding: 22px 0 !important;
        }
        #repertoire .original-no {
          font-size: .68rem !important;
        }
        #repertoire .story-item h4,
        #repertoire .original-card h4,
        #repertoire .title-line {
          font-size: 1.08rem !important;
        }
        #repertoire .story-item p,
        #repertoire .original-card p,
        #repertoire .category-copy,
        #repertoire .group-title-row > p,
        #repertoire .original-intro p {
          font-size: .9rem !important;
        }
      }
    </style>`;

    html = html.replace("</head>", polishStyle + "\n</head>");

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
