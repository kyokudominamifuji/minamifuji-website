import site from "./kodan-copy-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    html = html
      .replaceAll(
        '笑って、驚いて、ときには胸が熱くなる。',
        '笑い、驚き、胸が熱くなる。物語を通して、心が動く瞬間を届けたい。'
      )
      .replaceAll(
        'To laugh, to be surprised, and sometimes to feel your heart stir — while carrying the classics forward and exploring new forms of expression.',
        'To laugh, to be surprised, and to feel something stir inside — creating moments when a story truly moves the heart.'
      )
      .replaceAll(
        'To laugh, to be surprised, and sometimes to feel your heart stir.',
        'To laugh, to be surprised, and to feel something stir inside.'
      )
      .replaceAll(
        '「講談って、こんなに面白いんだ。」',
        '「講談って、こんなに心が動くんだ。」'
      )
      .replaceAll(
        '“I never knew Kōdan could be this much fun.”',
        '“I never knew Kōdan could move me this deeply.”'
      );

    // Remove the old short repertoire list in the profile area.
    html = html.replace(/<div class="repertoire">[\s\S]*?<\/div><\/div>/, '</div>');

    // Add a repertoire link to the top navigation.
    html = html.replace(
      '<a href="#contact" data-ja="お問い合わせ" data-en="Contact">お問い合わせ</a>',
      '<a href="#repertoire" data-ja="主な演目" data-en="Repertoire">主な演目</a>\n      <a href="#contact" data-ja="お問い合わせ" data-en="Contact">お問い合わせ</a>'
    );

    // Add a mobile-friendly repertoire jump link to the hero area.
    html = html.replace(
      '<a class="btn primary" href="#stage" data-ja="出演予定・ご予約" data-en="Schedule & Booking">出演予定・ご予約</a>',
      '<a class="btn primary" href="#stage" data-ja="出演予定・ご予約" data-en="Schedule & Booking">出演予定・ご予約</a><a class="btn" href="#repertoire" data-ja="主な演目" data-en="Repertoire">主な演目</a>'
    );

    const repertoireSection = `
  <section class="repertoire-section" id="repertoire">
    <div class="wrap repertoire-wrap">
      <div class="repertoire-heading">
        <div class="eyebrow">REPERTOIRE</div>
        <h2 data-ja="主な演目" data-en="Repertoire">主な演目</h2>
        <p data-ja="歴史の中で語り継がれてきた古典から、土地の物語や人物を新たな講談としてよみがえらせる創作まで。" data-en="From classical tales handed down through generations to original works that revive local history and remarkable people as new Kōdan stories.">歴史の中で語り継がれてきた古典から、土地の物語や人物を新たな講談としてよみがえらせる創作まで。</p>
        <p class="repertoire-lead" data-ja="旭堂南不二は、物語の時代やジャンルを越えて、『今を生きる人の頭の中に、景色が浮かぶ講談』を目指しています。" data-en="Across eras and genres, Kyokudo Minamifuji aims to create Kōdan that lets today's audience see the scene vividly in their mind.">旭堂南不二は、物語の時代やジャンルを越えて、<strong>「今を生きる人の頭の中に、景色が浮かぶ講談」</strong>を目指しています。</p>
      </div>

      <div class="repertoire-block">
        <div class="repertoire-kicker">CLASSICAL KŌDAN</div>
        <h3 data-ja="古典講談" data-en="Classical Kōdan">古典講談</h3>
        <p class="category-intro" data-ja="長い年月をかけて語り継がれてきた講談の世界。英雄の活躍だけでなく、機転、人情、夫婦愛、忠義など、時代を越えて変わらない『人間のおもしろさ』を語ります。" data-en="The world of Kōdan has been passed down over generations. These stories reveal not only heroic deeds, but wit, compassion, love, loyalty, and the timeless fascination of human nature.">長い年月をかけて語り継がれてきた講談の世界。英雄の活躍だけでなく、機転、人情、夫婦愛、忠義など、時代を越えて変わらない「人間のおもしろさ」を語ります。</p>

        <article class="repertoire-group">
          <h4 data-ja="太閤記 ― 豊臣秀吉の物語" data-en="Taikōki — Tales of Toyotomi Hideyoshi">太閤記 ― 豊臣秀吉の物語</h4>
          <p class="group-intro" data-ja="機転と度胸で道を切り開いていく秀吉。その出世物語から、人間味あふれる逸話まで。" data-en="Stories of Hideyoshi carving out his future through wit and courage, from his rise to power to episodes rich in humanity.">機転と度胸で道を切り開いていく秀吉。その出世物語から、人間味あふれる逸話まで。</p>
          <div class="story"><h5 data-ja="「秀吉の初陣」" data-en="Hideyoshi\'s First Battle">「秀吉の初陣」</h5><p data-ja="若き秀吉が戦場へ。後の天下人につながる度胸と才覚を描く一席。" data-en="Young Hideyoshi takes to the battlefield, revealing the courage and talent that foreshadow the future ruler of Japan.">若き秀吉が戦場へ。後の天下人につながる度胸と才覚を描く一席。</p></div>
          <div class="story"><h5 data-ja="「秀吉と易者」" data-en="Hideyoshi and the Fortune Teller">「秀吉と易者」</h5><p data-ja="まだ何者でもなかった秀吉と易者との出会い。運命と人を見る目を楽しむ物語。" data-en="An encounter between an unknown Hideyoshi and a fortune-teller — a tale about destiny and the ability to see the person within.">まだ何者でもなかった秀吉と易者との出会い。運命と人を見る目を楽しむ物語。</p></div>
          <div class="story"><h5 data-ja="「三日普請」" data-en="The Three-Day Construction">「三日普請」</h5><p data-ja="無理難題を前に、秀吉の知恵と人を動かす力が光る。" data-en="Faced with an impossible task, Hideyoshi's ingenuity and gift for moving people come to the fore.">無理難題を前に、秀吉の知恵と人を動かす力が光る。</p></div>
          <div class="story"><h5 data-ja="「呑み取りの槍（黒田節の由来）」" data-en="The Spear Won by Drinking — The Origin of Kuroda-bushi">「呑み取りの槍（黒田節の由来）」</h5><p data-ja="酒と名槍をめぐる豪快な勝負。『酒は飲め飲め』で知られる黒田節へとつながる人気の一席。" data-en="A bold contest over sake and a famous spear, leading into the story behind the celebrated song Kuroda-bushi.">酒と名槍をめぐる豪快な勝負。「酒は飲め飲め」で知られる黒田節へとつながる人気の一席。</p></div>
          <div class="story"><h5 data-ja="「秀吉と利休」" data-en="Hideyoshi and Rikyū">「秀吉と利休」</h5><p data-ja="天下人・秀吉と茶人・千利休。二人の個性と美意識がぶつかり合う物語。" data-en="The ruler Hideyoshi and tea master Sen no Rikyū meet in a story where powerful personalities and aesthetics collide.">天下人・秀吉と茶人・千利休。二人の個性と美意識がぶつかり合う物語。</p></div>
          <p class="more-stories" data-ja="「秀吉の足軽時代」「藤吉郎の子守奉公」「太閤の風流」ほか。" data-en="Also: Hideyoshi's Foot-Soldier Days, Tōkichirō's Child-Minding Service, Taikō and the Art of Elegance, and more.">「秀吉の足軽時代」「藤吉郎の子守奉公」「太閤の風流」ほか。</p>
        </article>

        <article class="repertoire-group">
          <h4 data-ja="難波戦記 ― 大坂の陣をめぐる物語" data-en="Nanba Senki — Stories of the Siege of Osaka">難波戦記 ― 大坂の陣をめぐる物語</h4>
          <p class="group-intro" data-ja="天下の行方が大きく動く時代。武将たちの知略、覚悟、そして運命を、戦場の臨場感とともに描きます。" data-en="An age when the fate of the realm was shifting. These stories portray the strategy, resolve and destiny of warriors with the immediacy of the battlefield.">天下の行方が大きく動く時代。武将たちの知略、覚悟、そして運命を、戦場の臨場感とともに描きます。</p>
          <p class="title-list">「難波戦記の発端」<br>「般若寺の焼討ち」<br>「平野の地雷火」<br>「結城中納言秀康の毒死」</p>
        </article>

        <article class="repertoire-group">
          <h4 data-ja="左甚五郎伝 ― 天才職人の物語" data-en="Hidari Jingorō — Tales of a Master Craftsman">左甚五郎伝 ― 天才職人の物語</h4>
          <p class="group-intro" data-ja="伝説の名工・左甚五郎。卓越した腕前だけでなく、洒落、人情、不思議な逸話も魅力です。" data-en="Legendary master craftsman Hidari Jingorō is celebrated not only for extraordinary skill, but also for wit, warmth and wondrous episodes.">伝説の名工・左甚五郎。卓越した腕前だけでなく、洒落、人情、不思議な逸話も魅力です。</p>
          <p class="title-list">「狩野探幽との出会い」<br>「猫餅の由来」</p>
        </article>

        <article class="repertoire-group">
          <h4 data-ja="水戸黄門漫遊記" data-en="The Travels of Mito Kōmon">水戸黄門漫遊記</h4>
          <p class="group-intro" data-ja="諸国を巡る黄門さまが出会うのは、名もなき町の人々。笑いと人情の中に、人生の知恵がのぞきます。" data-en="As Lord Mito travels the provinces, he meets ordinary townspeople. Humor and humanity reveal small pieces of wisdom about life.">諸国を巡る黄門さまが出会うのは、名もなき町の人々。笑いと人情の中に、人生の知恵がのぞきます。</p>
          <p class="title-list">「長屋の出世」<br>「黄門と農業」<br>「牛盗人」</p>
        </article>

        <article class="repertoire-group">
          <h4 data-ja="赤穂義士外伝・人情講談" data-en="Akō Loyalists Side Stories & Human Dramas">赤穂義士外伝・人情講談</h4>
          <p class="group-intro" data-ja="歴史の表舞台だけでなく、その周りで生きた人々にも光を当てます。" data-en="These stories shine a light not only on history's central figures, but also on the people who lived around them.">歴史の表舞台だけでなく、その周りで生きた人々にも光を当てます。</p>
          <p class="title-list">「松浦壱岐守」<br>「八百屋甚兵衛」<br>「木津勘助」<br>「孝行の妙薬」<br>「善悪二筋道」<br>「三河屋幸吉」<br>「山内一豊とその妻千代」ほか。</p>
        </article>
      </div>

      <div class="repertoire-block original-block">
        <div class="repertoire-kicker">ORIGINAL KŌDAN</div>
        <h3 data-ja="創作講談" data-en="Original Kōdan">創作講談</h3>
        <div class="original-intro">
          <p data-ja="講談は、昔の物語だけを語る芸ではありません。" data-en="Kōdan is not an art confined to old stories.">講談は、昔の物語だけを語る芸ではありません。</p>
          <p data-ja="土地に残る歴史。忘れられかけた人物。文学や音楽の中にある物語。" data-en="Local history. People in danger of being forgotten. Stories found in literature and music.">土地に残る歴史。<br>忘れられかけた人物。<br>文学や音楽の中にある物語。</p>
          <p data-ja="それらを調べ、組み立て、新しい講談として次の時代へ語り継いでいく。" data-en="Researching them, shaping them, and passing them on to the next generation as new Kōdan stories.">それらを調べ、組み立て、<br>新しい講談として次の時代へ語り継いでいく。</p>
          <p data-ja="それも、旭堂南不二が大切にしている挑戦です。" data-en="That, too, is an important part of Kyokudo Minamifuji's work.">それも、旭堂南不二が大切にしている挑戦です。</p>
        </div>

        <article class="repertoire-group original-story story"><h5 data-ja="「ディアナ号の錨」" data-en="The Anchor of the Diana">「ディアナ号の錨」</h5><p data-ja="静岡に残る歴史を題材に、地域の記憶を講談としてよみがえらせる一席。" data-en="A Kōdan performance that revives a piece of Shizuoka's local history and collective memory.">静岡に残る歴史を題材に、地域の記憶を講談としてよみがえらせる一席。</p></article>
        <article class="repertoire-group original-story story"><h5 data-ja="「長さん小路の由来」" data-en="The Story Behind Chō-san Alley">「長さん小路の由来」</h5><p data-ja="何気なく通り過ぎてしまう地名にも、物語がある。地域に眠る歴史を掘り起こす講談。" data-en="Even a place name we pass without notice can hold a story. This piece uncovers history sleeping within the local landscape.">何気なく通り過ぎてしまう地名にも、物語がある。地域に眠る歴史を掘り起こす講談。</p></article>
        <article class="repertoire-group original-story story"><h5 data-ja="「歌川広重伝・名勝 左富士」" data-en="Utagawa Hiroshige — The Famous Hidari Fuji">「歌川広重伝・名勝 左富士」</h5><p data-ja="浮世絵師・歌川広重と、東海道・吉原の『左富士』。富士のまちから生まれた風景を物語に。" data-en="Ukiyo-e artist Utagawa Hiroshige and the famous Left Fuji view of Yoshiwara on the Tōkaidō — a local landscape reborn as story.">浮世絵師・歌川広重と、東海道・吉原の「左富士」。富士のまちから生まれた風景を物語に。</p></article>
        <article class="repertoire-group original-story story"><h5 data-ja="「賢者たちの贈り物」" data-en="The Gifts of the Wise">「賢者たちの贈り物」</h5><p data-ja="時代も国も越えて愛される物語を、講談のリズムと言葉で届ける一席。" data-en="A beloved story crossing eras and borders, retold through the rhythm and language of Kōdan.">時代も国も越えて愛される物語を、講談のリズムと言葉で届ける一席。</p></article>
        <article class="repertoire-group original-story story"><h5 data-ja="「鍵盤に命をかけた男たち」" data-en="Men Who Gave Their Lives to the Keys">「鍵盤に命をかけた男たち」</h5><p data-ja="音楽と人間の情熱を、講談という語りの力で描く新しい挑戦。" data-en="A new Kōdan challenge portraying music and human passion through the power of storytelling.">音楽と人間の情熱を、講談という語りの力で描く新しい挑戦。</p></article>
      </div>

      <div class="repertoire-closing" data-ja="古典を受け継ぎ、新しい物語をつくる。\nその両方が、旭堂南不二の講談です。" data-en="Inheriting the classics, and creating new stories.\nBoth are at the heart of Kyokudo Minamifuji's Kōdan.">古典を受け継ぎ、新しい物語をつくる。<br>その両方が、旭堂南不二の講談です。</div>
    </div>
  </section>`;

    html = html.replace('<section class="contact" id="contact">', repertoireSection + '\n\n  <section class="contact" id="contact">');

    const repertoireStyle = `<style id="repertoire-layout">
      .repertoire-section{background:#fffdf8;color:#181713;padding:110px 0}
      .repertoire-wrap{max-width:980px}
      .repertoire-heading{margin-bottom:72px}
      .repertoire-heading h2{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(2.8rem,6vw,5.6rem);line-height:1.1;margin:10px 0 28px;font-weight:500}
      .repertoire-heading>p{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.08rem;line-height:2;margin:0 0 1em;max-width:850px}
      .repertoire-lead{font-size:clamp(1.16rem,2vw,1.45rem)!important;color:#3e3932}
      .repertoire-block{margin-top:88px}
      .repertoire-kicker{font-size:.72rem;letter-spacing:.22em;color:#a77c42;font-weight:700;margin-bottom:10px}
      .repertoire-block h3{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(2.25rem,4.5vw,4rem);line-height:1.2;margin:0 0 24px;font-weight:500}
      .category-intro,.original-intro{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.06rem;line-height:2;max-width:850px;margin-bottom:56px;color:#4f4940}
      .original-intro p{margin:0 0 1.25em}
      .repertoire-group{padding:42px 0;border-top:1px solid rgba(24,23,19,.17)}
      .repertoire-group:last-child{border-bottom:1px solid rgba(24,23,19,.17)}
      .repertoire-group h4{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(1.45rem,2.8vw,2.15rem);line-height:1.5;margin:0 0 14px;font-weight:600}
      .group-intro,.repertoire-group>p{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1rem;line-height:1.95;margin:0 0 24px;color:#514a41}
      .story{padding:21px 0 20px 24px;border-left:2px solid rgba(166,43,40,.28);margin:14px 0}
      .story h5{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.13rem;margin:0 0 7px}
      .story p{margin:0;color:#5a534a;line-height:1.85}
      .more-stories,.title-list{font-size:.94rem!important;color:#746d62!important;line-height:2.05!important;margin-top:24px!important}
      .original-block{margin-top:110px;padding-top:10px}
      .original-story{padding:34px 0}
      .original-story h4{font-size:clamp(1.35rem,2.4vw,1.85rem)}
      .repertoire-closing{margin-top:96px;padding:48px 0 10px;border-top:1px solid #181713;font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(1.5rem,3vw,2.2rem);line-height:1.8;text-align:center}
      @media(max-width:850px){
        .repertoire-section{padding:76px 0}
        .repertoire-heading{margin-bottom:58px}
        .repertoire-block{margin-top:70px}
        .repertoire-group{padding:34px 0}
        .story{padding:18px 0 18px 18px;margin:10px 0}
        .original-block{margin-top:78px}
        .repertoire-closing{margin-top:70px;padding-top:38px;text-align:left}
      }
      @media(max-width:520px){
        .repertoire-heading h2{font-size:2.65rem}
        .repertoire-heading>p,.category-intro,.original-intro{font-size:1rem;line-height:1.9}
        .repertoire-block h3{font-size:2.05rem}
        .repertoire-group h4{font-size:1.38rem}
        .story h5{font-size:1.08rem}
        .story p,.repertoire-group>p{font-size:.96rem}
        .repertoire-closing{font-size:1.42rem}
      }
    </style>`;

    html = html.replace('</head>', repertoireStyle + '\n</head>');

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
