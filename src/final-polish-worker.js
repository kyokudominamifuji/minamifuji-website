import site from "./copy-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    // Top navigation: keep labels consistent and place Repertoire beside About.
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

    // Hero buttons: shorter Schedule label and a direct jump to Repertoire.
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

    // Repertoire typography: one visual system for classical and original works.
    const polishStyle = `<style id="repertoire-polish">
      #repertoire .repertoire-block,
      #repertoire .original-block {
        margin-top: 76px !important;
        padding-top: 42px !important;
        border-top: 1px solid rgba(24,23,19,.18);
      }

      #repertoire .repertoire-block h3,
      #repertoire .original-block h3 {
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif !important;
        font-size: clamp(2.25rem,4.5vw,4rem) !important;
        line-height: 1.2 !important;
        font-weight: 500 !important;
        margin: 0 0 24px !important;
      }

      #repertoire .category-intro,
      #repertoire .original-intro {
        font-family: "Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif !important;
        font-size: 1rem !important;
        line-height: 1.95 !important;
        color: #514a41 !important;
        max-width: 850px;
        margin-bottom: 52px !important;
      }

      #repertoire .repertoire-group h4 {
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif !important;
      }

      #repertoire .group-intro {
        font-family: "Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif !important;
        font-size: .98rem !important;
        line-height: 1.9 !important;
        color: #5a534a !important;
      }

      #repertoire .story h5,
      #repertoire .original-story h4,
      #repertoire .title-list {
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif !important;
        font-size: 1.13rem !important;
        line-height: 1.7 !important;
        font-weight: 600 !important;
        color: #181713 !important;
      }

      #repertoire .story p,
      #repertoire .original-story > p {
        font-family: "Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif !important;
        font-size: .98rem !important;
        line-height: 1.85 !important;
        color: #5a534a !important;
        margin: 0 !important;
      }

      #repertoire .story,
      #repertoire .original-story,
      #repertoire .title-list {
        padding: 19px 0 19px 22px !important;
        border: 0 !important;
        border-left: 2px solid rgba(166,43,40,.28) !important;
        margin: 12px 0 !important;
      }

      #repertoire .original-story h4 {
        margin: 0 0 7px !important;
      }

      #repertoire .title-list {
        margin-top: 18px !important;
      }

      #repertoire .more-stories {
        font-family: "Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif !important;
        font-size: .92rem !important;
        line-height: 1.9 !important;
        color: #746d62 !important;
      }

      @media(max-width:520px){
        #repertoire .repertoire-block,
        #repertoire .original-block {
          margin-top: 60px !important;
          padding-top: 34px !important;
        }
        #repertoire .story h5,
        #repertoire .original-story h4,
        #repertoire .title-list {
          font-size: 1.08rem !important;
        }
        #repertoire .story p,
        #repertoire .original-story > p,
        #repertoire .group-intro,
        #repertoire .category-intro,
        #repertoire .original-intro {
          font-size: .95rem !important;
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
