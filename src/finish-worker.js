import site from "./final-polish-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    // Keep TOP navigation wording and order consistent.
    html = html.replace(/<nav class="navlinks"[\s\S]*?<\/nav>/, nav => {
      let updated = nav
        .replaceAll("南不二について", "南不二とは")
        .replaceAll("ご依頼", "出演依頼");
      return updated;
    });

    // TOP buttons: 出演情報 → 南不二とは → 主な演目 → 出演依頼
    html = html.replace(/<div class="actions">[\s\S]*?<\/div>/, actions => {
      let updated = actions
        .replaceAll("南不二について", "南不二とは")
        .replace(/\s*<a class="btn" href="#contact"[^>]*>[^<]*<\/a>/g, "");

      updated = updated.replace(
        /<\/div>$/,
        '\n        <a class="btn" href="#contact" data-ja="出演依頼" data-en="Performance Inquiry">出演依頼</a>\n      </div>'
      );
      return updated;
    });

    // 難波戦記：太閤記と同じく、各演目に短い解説を付ける。
    html = html.replace(
      '<p class="title-line">「難波戦記の発端」 ／ 「般若寺の焼討ち」 ／ 「平野の地雷火」 ／ 「結城中納言秀康の毒死」ほか。</p>',
      `<div class="story-list">
                <div class="story-item"><h4 data-ja="難波戦記の発端" data-en="Opening of Nanba Senki">難波戦記の発端</h4><p data-ja="豊臣と徳川、二つの大きな力が向き合い、大坂の陣へ。天下を揺るがす戦いの幕開けを描きます。" data-en="Toyotomi and Tokugawa face one another as the story moves toward the Siege of Osaka — the opening of a conflict that will shake the realm.">豊臣と徳川、二つの大きな力が向き合い、大坂の陣へ。天下を揺るがす戦いの幕開けを描きます。</p></div>
                <div class="story-item"><h4 data-ja="般若寺の焼討ち" data-en="The Burning of Hannya-ji">般若寺の焼討ち</h4><p data-ja="戦乱の中で交錯する策と覚悟。緊迫した場面を、講談ならではのテンポで描く一席です。" data-en="Strategy and resolve collide amid the turmoil of war, unfolding with the tension and rhythm unique to Kōdan.">戦乱の中で交錯する策と覚悟。緊迫した場面を、講談ならではのテンポで描く一席です。</p></div>
                <div class="story-item"><h4 data-ja="平野の地雷火" data-en="The Mine Fire at Hirano">平野の地雷火</h4><p data-ja="敵を迎え撃つための奇策をめぐり、知恵と度胸がぶつかる。息をのむ展開が続く一席です。" data-en="A daring stratagem to meet the enemy brings wit and courage into sharp conflict in a story full of suspense.">敵を迎え撃つための奇策をめぐり、知恵と度胸がぶつかる。息をのむ展開が続く一席です。</p></div>
                <div class="story-item"><h4 data-ja="結城中納言秀康の毒死" data-en="The Poison-Death Legend of Yūki Hideyasu">結城中納言秀康の毒死</h4><p data-ja="徳川家康の次男・結城秀康をめぐる毒死の伝承。武将の生き方と、その運命に迫ります。" data-en="A tale built around the poison-death legend of Yūki Hideyasu, the second son of Tokugawa Ieyasu, exploring a warrior's life and fate.">徳川家康の次男・結城秀康をめぐる毒死の伝承。武将の生き方と、その運命に迫ります。</p></div>
              </div>`
    );

    // 左甚五郎伝：各演目に解説を付ける。
    html = html.replace(
      '<p class="title-line">「猫餅の由来」 ／ 「狩野探幽との出会い」ほか。</p>',
      `<div class="story-list">
                <div class="story-item"><h4 data-ja="狩野探幽との出会い" data-en="Meeting Kanō Tan'yū">狩野探幽との出会い</h4><p data-ja="天才彫刻師・左甚五郎と、名絵師・狩野探幽。二人の才能が出会う場面を描く物語です。" data-en="Legendary sculptor Hidari Jingorō meets celebrated painter Kanō Tan'yū — a story about the encounter of two extraordinary talents.">天才彫刻師・左甚五郎と、名絵師・狩野探幽。二人の才能が出会う場面を描く物語です。</p></div>
                <div class="story-item"><h4 data-ja="猫餅の由来" data-en="The Origin of Nekomochi">猫餅の由来</h4><p data-ja="左甚五郎らしい機転と洒落、人情が詰まった一席。不思議な『猫餅』の由来をお楽しみください。" data-en="A warm and witty tale filled with Jingorō's quick thinking, humor and humanity, revealing the curious origin of 'Nekomochi.'">左甚五郎らしい機転と洒落、人情が詰まった一席。不思議な「猫餅」の由来をお楽しみください。</p></div>
              </div>`
    );

    // 水戸黄門漫遊記：各演目に解説を付ける。
    html = html.replace(
      '<p class="title-line">「長屋の出世」 ／ 「黄門と農業」 ／ 「牛盗人」ほか。</p>',
      `<div class="story-list">
                <div class="story-item"><h4 data-ja="長屋の出世" data-en="Success from the Tenement">長屋の出世</h4><p data-ja="長屋に暮らす人々の中から始まる、思いがけない出世物語。笑いの中に、人の縁のおもしろさが光ります。" data-en="An unexpected rise begins among ordinary tenement residents, with humor revealing the surprising power of human connections.">長屋に暮らす人々の中から始まる、思いがけない出世物語。笑いの中に、人の縁のおもしろさが光ります。</p></div>
                <div class="story-item"><h4 data-ja="黄門と農業" data-en="Mito Kōmon and Farming">黄門と農業</h4><p data-ja="諸国を巡る黄門さまが、農業を通して人々の暮らしと向き合う物語。知恵と人情を味わう一席です。" data-en="Mito Kōmon encounters people's everyday lives through farming — a story rich in practical wisdom and humanity.">諸国を巡る黄門さまが、農業を通して人々の暮らしと向き合う物語。知恵と人情を味わう一席です。</p></div>
                <div class="story-item"><h4 data-ja="牛盗人" data-en="The Cattle Thief">牛盗人</h4><p data-ja="牛をめぐって巻き起こるひと騒動。黄門さまの知恵と機転で、思いがけない真相が見えてきます。" data-en="A commotion over a stolen cow unfolds until Mito Kōmon's wit and judgment bring an unexpected truth to light.">牛をめぐって巻き起こるひと騒動。黄門さまの知恵と機転で、思いがけない真相が見えてきます。</p></div>
              </div>`
    );

    const style = `<style id="finish-polish">
      .hero .actions .btn[href="#contact"] {
        border-color: #d6b67b;
      }
      @media(max-width:560px){
        .hero .actions{gap:10px}
        .hero .actions .btn{padding:0 14px;font-size:.82rem}
      }
    </style>`;
    html = html.replace("</head>", style + "\n</head>");

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
