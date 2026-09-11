import site from "./challenge-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    const storyList = (items) => `<div class="story-list compact">${items.map(item => `<div class="story-item"><h4 data-ja="${item.title}" data-en="${item.enTitle}">${item.title}</h4><p data-ja="${item.copy}" data-en="${item.enCopy}">${item.copy}</p></div>`).join("\n")}</div>`;

    html = html.replace(
      /<p class="title-(?:list|line)">「難波戦記の発端」[\s\S]*?<\/p>/,
      storyList([
        {title:"難波戦記の発端",enTitle:"Opening of Nanba Senki",copy:"豊臣と徳川、二つの大きな力が向き合い、大坂の陣へ。天下を揺るがす戦いの幕開けを描きます。",enCopy:"Toyotomi and Tokugawa face one another as the story moves toward the Siege of Osaka — the opening of a conflict that will shake the realm."},
        {title:"般若寺の焼討ち",enTitle:"The Burning of Hannya-ji",copy:"戦乱の中で交錯する策と覚悟。緊迫した場面を、講談ならではのテンポで描く一席です。",enCopy:"Strategy and resolve collide amid the turmoil of war, unfolding with the tension and rhythm unique to Kodan."},
        {title:"平野の地雷火",enTitle:"The Mine Fire at Hirano",copy:"敵を迎え撃つための奇策をめぐり、知恵と度胸がぶつかる。息をのむ展開が続く一席です。",enCopy:"A daring stratagem to meet the enemy brings wit and courage into sharp conflict in a story full of suspense."},
        {title:"結城中納言秀康の毒死",enTitle:"The Poison-Death Legend of Yuki Hideyasu",copy:"徳川家康の次男・結城秀康をめぐる毒死の伝承。武将の生き方と、その運命に迫ります。",enCopy:"A tale built around the poison-death legend of Yuki Hideyasu, the second son of Tokugawa Ieyasu, exploring a warrior's life and fate."}
      ])
    );

    html = html.replace(
      /<p class="title-(?:list|line)">「狩野探幽との出会い」[\s\S]*?<\/p>|<p class="title-(?:list|line)">「猫餅の由来」[\s\S]*?<\/p>/,
      storyList([
        {title:"狩野探幽との出会い",enTitle:"Meeting Kano Tanyu",copy:"天才彫刻師・左甚五郎と、名絵師・狩野探幽。二人の才能が出会う場面を描く物語です。",enCopy:"Legendary sculptor Hidari Jingoro meets celebrated painter Kano Tanyu — a story about the encounter of two extraordinary talents."},
        {title:"猫餅の由来",enTitle:"The Origin of Nekomochi",copy:"左甚五郎らしい機転と洒落、人情が詰まった一席。不思議な「猫餅」の由来をお楽しみください。",enCopy:"A warm and witty tale filled with Jingoro's quick thinking, humor and humanity, revealing the curious origin of Nekomochi."}
      ])
    );

    html = html.replace(
      /<p class="title-(?:list|line)">「長屋の出世」[\s\S]*?<\/p>/,
      storyList([
        {title:"長屋の出世",enTitle:"Success from the Tenement",copy:"長屋に暮らす人々の中から始まる、思いがけない出世物語。笑いの中に、人の縁のおもしろさが光ります。",enCopy:"An unexpected rise begins among ordinary tenement residents, with humor revealing the surprising power of human connections."},
        {title:"黄門と農業",enTitle:"Mito Komon and Farming",copy:"諸国を巡る黄門さまが、農業を通して人々の暮らしと向き合う物語。知恵と人情を味わう一席です。",enCopy:"Mito Komon encounters people's everyday lives through farming — a story rich in practical wisdom and humanity."},
        {title:"牛盗人",enTitle:"The Cattle Thief",copy:"牛をめぐって巻き起こるひと騒動。笑いと人情の中に、黄門漫遊記らしい知恵と機転が光ります。",enCopy:"A commotion over a stolen cow brings out the wit, warmth and quick thinking that make the Mito Komon tales so enjoyable."}
      ])
    );

    const humanStories = storyList([
      {title:"松浦壱岐守",enTitle:"Matsuura Iki-no-kami",copy:"忠臣蔵・赤穂義士外伝。赤穂義士を、少し違った視点から見つめる物語です。",enCopy:"A side story of Chushingura and the Ako retainers, told from a different point of view."},
      {title:"八百屋甚兵衛",enTitle:"Yaoya Jinbei",copy:"市井に生きる人々の情と心意気を描く、人情味あふれる一席です。",enCopy:"A warm human story about the compassion and spirit of ordinary townspeople."},
      {title:"木津勘助",enTitle:"Kizu Kansuke",copy:"人のために力を尽くした男の生きざまを描く人情講談です。",enCopy:"A human drama about a man who devoted his strength to helping others."},
      {title:"孝行の妙薬",enTitle:"The Miraculous Medicine of Filial Devotion",copy:"親を思う心を、笑いと人情を交えて描く一席です。",enCopy:"A tale of devotion to one's parents, told with humor and warmth."},
      {title:"善悪二筋道",enTitle:"Two Paths of Good and Evil",copy:"善と悪、その間で揺れる人の心。人生の選択を講談らしく描きます。",enCopy:"A story of good and evil, and the human heart wavering between them."},
      {title:"三河屋幸吉",enTitle:"Mikawaya Kokichi",copy:"義理と人情の中で生きる人の姿を、あたたかく描く一席です。",enCopy:"A warm story of a life shaped by duty, compassion and human bonds."},
      {title:"山内一豊とその妻千代",enTitle:"Yamauchi Kazutoyo and His Wife Chiyo",copy:"夫を支え、その運命を動かした妻・千代。夫婦の絆と知恵を描く物語です。",enCopy:"The story of Chiyo, whose wisdom and support helped shape her husband's destiny — a tale of partnership and devotion."}
    ]);

    html = html.replace(/<p class="title-(?:list|line)">「松浦壱岐守」[\s\S]*?<\/p>/, humanStories);
    html = html.replace(/<p class="more-stories">「八百屋甚兵衛」[\s\S]*?<\/p>/, `<div class="story-list compact extra-human-stories"><div class="story-item"><h4 data-ja="八百屋甚兵衛" data-en="Yaoya Jinbei">八百屋甚兵衛</h4><p data-ja="市井に生きる人々の情と心意気を描く、人情味あふれる一席です。" data-en="A warm human story about the compassion and spirit of ordinary townspeople.">市井に生きる人々の情と心意気を描く、人情味あふれる一席です。</p></div><div class="story-item"><h4 data-ja="三河屋幸吉" data-en="Mikawaya Kokichi">三河屋幸吉</h4><p data-ja="義理と人情の中で生きる人の姿を、あたたかく描く一席です。" data-en="A warm story of a life shaped by duty, compassion and human bonds.">義理と人情の中で生きる人の姿を、あたたかく描く一席です。</p></div></div>`);

    const plainStyle = `<style id="repertoire-plain-v6">
      /* 古典・創作とも、カードを使わない同一の縦リストデザイン */
      #repertoire .story-list,
      #repertoire .story-list.compact,
      #repertoire .original-grid {
        display:block!important;
        grid-template-columns:none!important;
        gap:0!important;
        background:transparent!important;
        border:0!important;
      }

      #repertoire .story-item,
      #repertoire .original-card,
      #repertoire .original-card:nth-child(5),
      #repertoire .featured-original,
      #repertoire .story {
        display:block!important;
        min-height:0!important;
        margin:0!important;
        padding:24px 0!important;
        background:transparent!important;
        color:#1b1a17!important;
        border:0!important;
        border-top:1px solid rgba(27,26,23,.20)!important;
        box-shadow:none!important;
      }

      #repertoire .story-list > .story-item:last-child,
      #repertoire .original-grid > .original-card:last-child,
      #repertoire .repertoire-group > .story:last-child {
        border-bottom:1px solid rgba(27,26,23,.20)!important;
      }

      #repertoire .story-item h4,
      #repertoire .original-card h4,
      #repertoire .story h5 {
        margin:0 0 8px!important;
        font-family:"Yu Mincho","Hiragino Mincho ProN",serif!important;
        font-size:1.12rem!important;
        line-height:1.6!important;
        font-weight:600!important;
        color:#1b1a17!important;
      }

      #repertoire .story-item p,
      #repertoire .original-card p,
      #repertoire .story p {
        margin:0!important;
        font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif!important;
        font-size:.92rem!important;
        line-height:1.85!important;
        color:#665f56!important;
      }

      #repertoire .original-no {
        display:none!important;
      }

      #repertoire .special-badge {
        display:inline-block!important;
        margin:0 0 8px!important;
        padding:0!important;
        border:0!important;
        background:transparent!important;
        color:#a67b42!important;
        font-size:.72rem!important;
        letter-spacing:.12em!important;
      }

      #repertoire .extra-human-stories { margin-top:0!important; }

      @media(max-width:520px){
        #repertoire .story-item,
        #repertoire .original-card,
        #repertoire .story { padding:20px 0!important; }
        #repertoire .story-item h4,
        #repertoire .original-card h4,
        #repertoire .story h5 { font-size:1.08rem!important; }
      }
    </style>`;

    html = html.replace("</head>", plainStyle + "\n</head>");
    html = html.replace("</body>", "<!-- unified-site-worker-v6 -->\n</body>");

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("cache-control", "no-store, no-cache, must-revalidate, max-age=0");
    headers.set("pragma", "no-cache");
    headers.set("expires", "0");
    headers.set("x-site-worker", "unified-site-worker-v6");

    return new Response(html, {status: response.status,statusText: response.statusText,headers});
  }
};
