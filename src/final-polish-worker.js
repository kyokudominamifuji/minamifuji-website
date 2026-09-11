import site from "./repertoire-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    // Top navigation: 出演情報 → 南不二とは → 主な演目 → 出演依頼
    html = html.replace(/<nav class="navlinks"[\s\S]*?<\/nav>/, nav => {
      let updated = nav
        .replace(
          '<a href="#about" data-ja="プロフィール" data-en="Profile">プロフィール</a>',
          '<a href="#about" data-ja="南不二とは" data-en="About Minamifuji">南不二とは</a>'
        )
        .replace(
          '<a href="#about" data-ja="南不二について" data-en="About Minamifuji">南不二について</a>',
          '<a href="#about" data-ja="南不二とは" data-en="About Minamifuji">南不二とは</a>'
        )
        .replace(/\s*<a href="#repertoire" data-ja="主な演目" data-en="Repertoire">主な演目<\/a>/g, "")
        .replace(/\s*<a href="#contact"[^>]*>[^<]*<\/a>/g, "");

      updated = updated.replace(
        /(<a href="#about"[^>]*>[^<]*<\/a>)/,
        '$1\n      <a href="#repertoire" data-ja="主な演目" data-en="Repertoire">主な演目</a>\n      <a href="#contact" data-ja="出演依頼" data-en="Performance Inquiry">出演依頼</a>'
      );
      return updated;
    });

    // TOP buttons: 出演情報 → 南不二とは → 主な演目 → 出演依頼
    html = html.replace(
      '<a class="btn primary" href="#stage" data-ja="出演情報を見る" data-en="View Schedule">出演情報を見る</a>',
      '<a class="btn primary" href="#stage" data-ja="出演情報" data-en="Schedule">出演情報</a>'
    );

    html = html.replace(/<div class="actions">[\s\S]*?<\/div>/, actions => {
      let updated = actions
        .replaceAll("南不二について", "南不二とは")
        .replace(/\s*<a class="btn" href="#repertoire"[^>]*>[^<]*<\/a>/g, "")
        .replace(/\s*<a class="btn" href="#contact"[^>]*>[^<]*<\/a>/g, "");

      updated = updated.replace(
        /(<a class="btn" href="#about"[^>]*>[^<]*<\/a>)/,
        '$1\n        <a class="btn" href="#repertoire" data-ja="主な演目" data-en="Repertoire">主な演目</a>\n        <a class="btn" href="#contact" data-ja="出演依頼" data-en="Performance Inquiry">出演依頼</a>'
      );
      return updated;
    });

    // 難波戦記：太閤記と同じ形式で、各演目に短い紹介文を付ける。
    html = html.replace(
      /<p class="title-line">「難波戦記の発端」[\s\S]*?<\/p>/,
      `<div class="story-list">
                <div class="story-item"><h4 data-ja="難波戦記の発端" data-en="Opening of Nanba Senki">難波戦記の発端</h4><p data-ja="豊臣と徳川、二つの大きな力が向き合い、大坂の陣へ。天下を揺るがす戦いの幕開けを描きます。" data-en="Toyotomi and Tokugawa face one another as the story moves toward the Siege of Osaka — the opening of a conflict that will shake the realm.">豊臣と徳川、二つの大きな力が向き合い、大坂の陣へ。天下を揺るがす戦いの幕開けを描きます。</p></div>
                <div class="story-item"><h4 data-ja="般若寺の焼討ち" data-en="The Burning of Hannya-ji">般若寺の焼討ち</h4><p data-ja="戦乱の中で交錯する策と覚悟。緊迫した場面を、講談ならではのテンポで描く一席です。" data-en="Strategy and resolve collide amid the turmoil of war, unfolding with the tension and rhythm unique to Kōdan.">戦乱の中で交錯する策と覚悟。緊迫した場面を、講談ならではのテンポで描く一席です。</p></div>
                <div class="story-item"><h4 data-ja="平野の地雷火" data-en="The Mine Fire at Hirano">平野の地雷火</h4><p data-ja="敵を迎え撃つための奇策をめぐり、知恵と度胸がぶつかる。息をのむ展開が続く一席です。" data-en="A daring stratagem to meet the enemy brings wit and courage into sharp conflict in a story full of suspense.">敵を迎え撃つための奇策をめぐり、知恵と度胸がぶつかる。息をのむ展開が続く一席です。</p></div>
                <div class="story-item"><h4 data-ja="結城中納言秀康の毒死" data-en="The Poison-Death Legend of Yūki Hideyasu">結城中納言秀康の毒死</h4><p data-ja="徳川家康の次男・結城秀康をめぐる毒死の伝承。武将の生き方と、その運命に迫ります。" data-en="A tale built around the poison-death legend of Yūki Hideyasu, the second son of Tokugawa Ieyasu, exploring a warrior's life and fate.">徳川家康の次男・結城秀康をめぐる毒死の伝承。武将の生き方と、その運命に迫ります。</p></div>
              </div>`
    );

    // 左甚五郎伝：各演目に短い紹介文を付ける。
    html = html.replace(
      /<p class="title-line">「猫餅の由来」[\s\S]*?<\/p>/,
      `<div class="story-list">
                <div class="story-item"><h4 data-ja="狩野探幽との出会い" data-en="Meeting Kanō Tan'yū">狩野探幽との出会い</h4><p data-ja="天才彫刻師・左甚五郎と、名絵師・狩野探幽。二人の才能が出会う場面を描く物語です。" data-en="Legendary sculptor Hidari Jingorō meets celebrated painter Kanō Tan'yū — a story about the encounter of two extraordinary talents.">天才彫刻師・左甚五郎と、名絵師・狩野探幽。二人の才能が出会う場面を描く物語です。</p></div>
                <div class="story-item"><h4 data-ja="猫餅の由来" data-en="The Origin of Nekomochi">猫餅の由来</h4><p data-ja="左甚五郎らしい機転と洒落、人情が詰まった一席。不思議な『猫餅』の由来をお楽しみください。" data-en="A warm and witty tale filled with Jingorō's quick thinking, humor and humanity, revealing the curious origin of Nekomochi.">左甚五郎らしい機転と洒落、人情が詰まった一席。不思議な「猫餅」の由来をお楽しみください。</p></div>
              </div>`
    );

    // 水戸黄門漫遊記：各演目に短い紹介文を付ける。
    html = html.replace(
      /<p class="title-line">「長屋の出世」[\s\S]*?<\/p>/,
      `<div class="story-list">
                <div class="story-item"><h4 data-ja="長屋の出世" data-en="Success from the Tenement">長屋の出世</h4><p data-ja="長屋に暮らす人々の中から始まる、思いがけない出世物語。笑いの中に、人の縁のおもしろさが光ります。" data-en="An unexpected rise begins among ordinary tenement residents, with humor revealing the surprising power of human connections.">長屋に暮らす人々の中から始まる、思いがけない出世物語。笑いの中に、人の縁のおもしろさが光ります。</p></div>
                <div class="story-item"><h4 data-ja="黄門と農業" data-en="Mito Kōmon and Farming">黄門と農業</h4><p data-ja="諸国を巡る黄門さまが、農業を通して人々の暮らしと向き合う物語。知恵と人情を味わう一席です。" data-en="Mito Kōmon encounters people's everyday lives through farming — a story rich in practical wisdom and humanity.">諸国を巡る黄門さまが、農業を通して人々の暮らしと向き合う物語。知恵と人情を味わう一席です。</p></div>
                <div class="story-item"><h4 data-ja="牛盗人" data-en="The Cattle Thief">牛盗人</h4><p data-ja="牛をめぐって巻き起こるひと騒動。黄門さまの知恵と機転で、思いがけない真相が見えてきます。" data-en="A commotion over a stolen cow unfolds until Mito Kōmon's wit and judgment bring an unexpected truth to light.">牛をめぐって巻き起こるひと騒動。黄門さまの知恵と機転で、思いがけない真相が見えてきます。</p></div>
              </div>`
    );

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

      #repertoire .story-item h4,
      #repertoire .original-card h4,
      #repertoire .title-line {
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif !important;
        font-size: 1.12rem !important;
        line-height: 1.6 !important;
        font-weight: 600 !important;
        color: #1b1a17 !important;
      }

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

      .hero .actions .btn[href="#contact"] {
        border-color: #d6b67b !important;
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
        .hero .actions{gap:10px !important}
        .hero .actions .btn{padding:0 13px !important;font-size:.8rem !important}
      }
    </style>`;

    html = html.replace("</head>", polishStyle + "\n</head>");
    html = html.replace("</body>", "<!-- repertoire-detail-v2 -->\n</body>");

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
