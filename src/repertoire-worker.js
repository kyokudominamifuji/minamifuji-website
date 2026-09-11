import site from "./copy-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    // Remove the old short repertoire list if it still exists in the profile.
    html = html.replace(/<div class="repertoire">[\s\S]*?<\/div>/, "");

    const repertoireSection = `
  <section class="repertoire-section" id="repertoire">
    <div class="wrap">
      <div class="repertoire-head">
        <div>
          <div class="eyebrow">REPERTOIRE</div>
          <h2 data-ja="主な演目" data-en="Repertoire">主な演目</h2>
        </div>
        <div class="repertoire-intro">
          <p data-ja="歴史の中で語り継がれてきた古典講談から、土地の歴史、人物、文学、音楽を新たな物語として立ち上げる創作講談まで。" data-en="From classical Kōdan handed down through generations to original stories inspired by local history, people, literature and music.">歴史の中で語り継がれてきた古典講談から、土地の歴史、人物、文学、音楽を新たな物語として立ち上げる創作講談まで。</p>
          <p class="repertoire-lead" data-ja="聴く人の頭の中に景色が浮かび、心が動く講談を。" data-en="Kōdan that paints vivid scenes in the mind — and moves the heart.">聴く人の頭の中に景色が浮かび、心が動く講談を。</p>
        </div>
      </div>

      <div class="repertoire-group classical-group">
        <div class="group-title-row">
          <div>
            <span class="group-kicker">CLASSICAL KŌDAN</span>
            <h3 data-ja="古典講談" data-en="Classical Kōdan">古典講談</h3>
          </div>
          <p data-ja="長い年月をかけて語り継がれてきた物語。英雄の活躍だけではなく、知恵、人情、夫婦愛、忠義など、時代を越えて変わらない人間のおもしろさを語ります。" data-en="Stories passed down over generations, filled not only with heroes but also wit, compassion, love, loyalty and timeless human drama.">長い年月をかけて語り継がれてきた物語。英雄の活躍だけではなく、知恵、人情、夫婦愛、忠義など、時代を越えて変わらない人間のおもしろさを語ります。</p>
        </div>

        <div class="repertoire-accordions">
          <details class="repertoire-card" open>
            <summary>
              <span class="summary-no">01</span>
              <span class="summary-title" data-ja="太閤記 ― 豊臣秀吉の物語" data-en="Taikōki — Stories of Toyotomi Hideyoshi">太閤記 ― 豊臣秀吉の物語</span>
              <span class="summary-mark" aria-hidden="true">＋</span>
            </summary>
            <div class="detail-body">
              <p class="category-copy" data-ja="知恵と度胸で道を切り開き、天下人へと駆け上がった豊臣秀吉。その出世物語から、人間味あふれる逸話までを描きます。" data-en="The rise of Toyotomi Hideyoshi, who carved his path with wit and courage — from his climb to power to stories full of warmth and humanity.">知恵と度胸で道を切り開き、天下人へと駆け上がった豊臣秀吉。その出世物語から、人間味あふれる逸話までを描きます。</p>
              <div class="story-list">
                <div class="story-item"><h4 data-ja="秀吉の初陣" data-en="Hideyoshi's First Battle">秀吉の初陣</h4><p data-ja="若き秀吉が初めて戦場へ。後の天下人につながる度胸と才覚を描く一席。" data-en="Young Hideyoshi enters the battlefield for the first time, revealing the courage and ingenuity that foreshadow his future rise.">若き秀吉が初めて戦場へ。後の天下人につながる度胸と才覚を描く一席。</p></div>
                <div class="story-item"><h4 data-ja="秀吉と易者" data-en="Hideyoshi and the Fortune Teller">秀吉と易者</h4><p data-ja="まだ何者でもなかった秀吉と易者との出会い。人を見る目と運命のおもしろさを描きます。" data-en="An encounter between a still-unknown Hideyoshi and a fortune teller — a story about destiny and the ability to see a person's potential.">まだ何者でもなかった秀吉と易者との出会い。人を見る目と運命のおもしろさを描きます。</p></div>
                <div class="story-item"><h4 data-ja="三日普請" data-en="The Three-Day Construction">三日普請</h4><p data-ja="無理難題を前に、秀吉の知恵と、人を動かす力が光る物語。" data-en="Faced with an impossible task, Hideyoshi's ingenuity and gift for moving people come to the fore.">無理難題を前に、秀吉の知恵と、人を動かす力が光る物語。</p></div>
                <div class="story-item"><h4 data-ja="呑み取りの槍 ― 黒田節の由来" data-en="The Spear Won by Drinking — Origin of Kuroda-bushi">呑み取りの槍 ― 黒田節の由来</h4><p data-ja="酒と名槍をめぐる豪快な勝負。「酒は飲め飲め」で知られる黒田節へとつながる一席。" data-en="A bold contest involving sake and a celebrated spear, leading into the story behind the famous folk song Kuroda-bushi.">酒と名槍をめぐる豪快な勝負。「酒は飲め飲め」で知られる黒田節へとつながる一席。</p></div>
                <div class="story-item"><h4 data-ja="秀吉と利休" data-en="Hideyoshi and Rikyū">秀吉と利休</h4><p data-ja="天下人・秀吉と茶人・千利休。異なる美意識と生き方が交わる物語。" data-en="The ruler Hideyoshi and tea master Sen no Rikyū — two very different ideas of beauty and life come face to face.">天下人・秀吉と茶人・千利休。異なる美意識と生き方が交わる物語。</p></div>
              </div>
              <p class="more-stories" data-ja="ほか、「秀吉の足軽時代」「藤吉郎の子守奉公」「太閤の風流」など。" data-en="Also: Hideyoshi as a Foot Soldier, Tōkichirō the Childminder, Taikō's Refined Taste, and more.">ほか、「秀吉の足軽時代」「藤吉郎の子守奉公」「太閤の風流」など。</p>
            </div>
          </details>

          <details class="repertoire-card">
            <summary>
              <span class="summary-no">02</span>
              <span class="summary-title" data-ja="難波戦記 ― 大坂の陣をめぐる物語" data-en="Nanba Senki — Stories of the Siege of Osaka">難波戦記 ― 大坂の陣をめぐる物語</span>
              <span class="summary-mark" aria-hidden="true">＋</span>
            </summary>
            <div class="detail-body">
              <p class="category-copy" data-ja="天下の行方が大きく動いた、豊臣と徳川の戦い・大坂の陣。武将たちの知略、覚悟、そして運命を、戦場の臨場感とともに描きます。" data-en="The Siege of Osaka, a decisive clash between Toyotomi and Tokugawa. These stories bring the strategies, resolve and fates of the warriors vividly to life.">天下の行方が大きく動いた、豊臣と徳川の戦い・大坂の陣。武将たちの知略、覚悟、そして運命を、戦場の臨場感とともに描きます。</p>
              <p class="title-line">「難波戦記の発端」 ／ 「般若寺の焼討ち」 ／ 「平野の地雷火」 ／ 「結城中納言秀康の毒死」ほか。</p>
            </div>
          </details>

          <details class="repertoire-card">
            <summary>
              <span class="summary-no">03</span>
              <span class="summary-title" data-ja="左甚五郎伝 ― 天才職人の物語" data-en="Hidari Jingorō — Tales of a Legendary Craftsman">左甚五郎伝 ― 天才職人の物語</span>
              <span class="summary-mark" aria-hidden="true">＋</span>
            </summary>
            <div class="detail-body">
              <p class="category-copy" data-ja="伝説の名工・左甚五郎。卓越した腕前だけでなく、ユーモア、人情、不思議な逸話も魅力の物語です。" data-en="Tales of the legendary master craftsman Hidari Jingorō — celebrated not only for extraordinary skill but also for humor, humanity and wonder.">伝説の名工・左甚五郎。卓越した腕前だけでなく、ユーモア、人情、不思議な逸話も魅力の物語です。</p>
              <p class="title-line">「猫餅の由来」 ／ 「狩野探幽との出会い」ほか。</p>
            </div>
          </details>

          <details class="repertoire-card">
            <summary>
              <span class="summary-no">04</span>
              <span class="summary-title" data-ja="水戸黄門漫遊記" data-en="Travels of Mito Kōmon">水戸黄門漫遊記</span>
              <span class="summary-mark" aria-hidden="true">＋</span>
            </summary>
            <div class="detail-body">
              <p class="category-copy" data-ja="諸国を巡る水戸黄門が出会う、さまざまな人々。笑いと人情の中に、人生の知恵や人間のおもしろさが見えてきます。" data-en="As Mito Kōmon travels the country, he meets people from every walk of life. Humor and warmth reveal the wisdom and fascination of human nature.">諸国を巡る水戸黄門が出会う、さまざまな人々。笑いと人情の中に、人生の知恵や人間のおもしろさが見えてきます。</p>
              <p class="title-line">「長屋の出世」 ／ 「黄門と農業」 ／ 「牛盗人」ほか。</p>
            </div>
          </details>

          <details class="repertoire-card">
            <summary>
              <span class="summary-no">05</span>
              <span class="summary-title" data-ja="人物・人情講談" data-en="Human Stories">人物・人情講談</span>
              <span class="summary-mark" aria-hidden="true">＋</span>
            </summary>
            <div class="detail-body">
              <p class="category-copy" data-ja="歴史の大事件だけではなく、その時代を生きた一人ひとりにも光を当てます。親子、夫婦、恩、義理、誇り。時代が変わっても変わらない人間の心を描きます。" data-en="Not only great historical events, but the lives of individuals within them — parents and children, husbands and wives, gratitude, duty and pride. Stories of the human heart that transcend time.">歴史の大事件だけではなく、その時代を生きた一人ひとりにも光を当てます。親子、夫婦、恩、義理、誇り。時代が変わっても変わらない人間の心を描きます。</p>
              <div class="story-list compact">
                <div class="story-item"><h4 data-ja="善悪二筋道・名刀正宗" data-en="Two Paths of Good and Evil — The Sword Masamune">善悪二筋道・名刀正宗</h4><p data-ja="善と悪、そして人の心の揺れを、名刀・正宗をめぐる物語の中に描く一席。" data-en="A story of good, evil and the wavering human heart, centered on the famed sword Masamune.">善と悪、そして人の心の揺れを、名刀・正宗をめぐる物語の中に描く一席。</p></div>
                <div class="story-item"><h4 data-ja="松浦壱岐守" data-en="Matsuura Iki-no-kami">松浦壱岐守</h4><p data-ja="忠臣蔵・赤穂義士外伝。赤穂義士を、少し違った視点から見つめる物語。" data-en="A side story of Chūshingura and the Akō retainers, told from a different point of view.">忠臣蔵・赤穂義士外伝。赤穂義士を、少し違った視点から見つめる物語。</p></div>
                <div class="story-item"><h4 data-ja="木津勘助" data-en="Kizu Kansuke">木津勘助</h4><p data-ja="人のために力を尽くした男の生きざまを描く人情講談。" data-en="A warm human drama about a man who devoted his strength to helping others.">人のために力を尽くした男の生きざまを描く人情講談。</p></div>
                <div class="story-item"><h4 data-ja="孝行の妙薬" data-en="The Miraculous Medicine of Filial Devotion">孝行の妙薬</h4><p data-ja="親を思う心を、笑いと人情を交えて描きます。" data-en="A tale of devotion to one's parents, told with humor and warmth.">親を思う心を、笑いと人情を交えて描きます。</p></div>
                <div class="story-item"><h4 data-ja="山内一豊とその妻千代" data-en="Yamauchi Kazutoyo and His Wife Chiyo">山内一豊とその妻千代</h4><p data-ja="夫を支え、その運命を動かした妻・千代。夫婦の絆と知恵の物語。" data-en="The story of Chiyo, whose wisdom and support helped shape her husband's destiny — a tale of partnership and devotion.">夫を支え、その運命を動かした妻・千代。夫婦の絆と知恵の物語。</p></div>
              </div>
              <p class="more-stories">「八百屋甚兵衛」 ／ 「三河屋幸吉」ほか。</p>
            </div>
          </details>
        </div>
      </div>

      <div class="repertoire-group original-group">
        <div class="group-title-row">
          <div>
            <span class="group-kicker">ORIGINAL KŌDAN</span>
            <h3 data-ja="創作講談" data-en="Original Kōdan">創作講談</h3>
          </div>
          <div class="original-intro">
            <p data-ja="講談は、昔の物語だけを語る芸ではありません。土地に残る歴史、忘れられかけた人物、文学や音楽の中にある物語。それらを調べ、組み立て、新たな講談として次の時代へ語り継いでいく。それも、旭堂南不二が大切にしている挑戦です。" data-en="Kōdan is not only about stories from the distant past. Local history, nearly forgotten people, literature and music can all become new stories to be researched, shaped and passed on to the next generation.">講談は、昔の物語だけを語る芸ではありません。土地に残る歴史、忘れられかけた人物、文学や音楽の中にある物語。それらを調べ、組み立て、新たな講談として次の時代へ語り継いでいく。それも、旭堂南不二が大切にしている挑戦です。</p>
          </div>
        </div>

        <div class="original-grid">
          <article class="original-card">
            <span class="original-no">01</span>
            <h4 data-ja="ディアナ号の錨" data-en="The Anchor of the Diana">ディアナ号の錨</h4>
            <p data-ja="静岡県富士市に残るディアナ号ゆかりの史跡を題材にした創作講談。ロシアのプチャーチン提督と、遭難したロシア人を救った田子の漁民たちとの交流を描きます。国や言葉を越えて結ばれた人々の絆を、富士の地に残る記憶とともによみがえらせる一席です。" data-en="An original Kōdan inspired by a historic site in Fuji City connected to the Russian frigate Diana. It tells of Admiral Putyatin and the local fishermen of Tago who helped rescue Russian sailors, reviving a story of human bonds that crossed borders and language.">静岡県富士市に残るディアナ号ゆかりの史跡を題材にした創作講談。ロシアのプチャーチン提督と、遭難したロシア人を救った田子の漁民たちとの交流を描きます。国や言葉を越えて結ばれた人々の絆を、富士の地に残る記憶とともによみがえらせる一席です。</p>
          </article>

          <article class="original-card">
            <span class="original-no">02</span>
            <h4 data-ja="長さん小路の由来" data-en="The Story Behind Chō-san Alley">長さん小路の由来</h4>
            <p data-ja="ザ・ドリフターズのリーダー・いかりや長介が、若き日に静岡県富士市へ疎開していた頃の物語。のちの「長さん」へとつながる青春の日々を、富士のまちの記憶とともに描く創作講談です。" data-en="An original Kōdan about Chōsuke Ikariya, leader of The Drifters, and the years he spent evacuated to Fuji City in his youth. It traces the days that would eventually lead to the beloved ‘Chō-san,’ alongside the memories of the city.">ザ・ドリフターズのリーダー・いかりや長介が、若き日に静岡県富士市へ疎開していた頃の物語。のちの「長さん」へとつながる青春の日々を、富士のまちの記憶とともに描く創作講談です。</p>
          </article>

          <article class="original-card">
            <span class="original-no">03</span>
            <h4 data-ja="歌川広重伝・名勝 左富士" data-en="Utagawa Hiroshige — The Famous Hidari Fuji">歌川広重伝・名勝 左富士</h4>
            <p data-ja="浮世絵師・歌川広重と、東海道・吉原の「左富士」。富士のまちに残る風景と歴史を講談に。" data-en="A Kōdan inspired by ukiyo-e master Utagawa Hiroshige and Hidari Fuji, the celebrated view of Mt. Fuji from Yoshiwara on the Tōkaidō.">浮世絵師・歌川広重と、東海道・吉原の「左富士」。富士のまちに残る風景と歴史を講談に。</p>
          </article>

          <article class="original-card">
            <span class="original-no">04</span>
            <h4 data-ja="賢者たちの贈り物" data-en="The Gifts of the Wise">賢者たちの贈り物</h4>
            <p data-ja="O・ヘンリーの名作『賢者の贈り物』をもとに、舞台を江戸時代へ。講談ならではの語りと世界観でよみがえらせた創作講談です。" data-en="Inspired by O. Henry's classic The Gift of the Magi, reimagined in the Edo period and reborn through the rhythm and world of Kōdan.">O・ヘンリーの名作『賢者の贈り物』をもとに、舞台を江戸時代へ。講談ならではの語りと世界観でよみがえらせた創作講談です。</p>
          </article>

          <article class="original-card featured-original">
            <span class="original-no">05</span>
            <div class="special-badge" data-ja="講談 × ピアノ" data-en="KŌDAN × PIANO">講談 × ピアノ</div>
            <h4 data-ja="鍵盤に命をかけた男たち" data-en="Men Who Gave Their Lives to the Keys">鍵盤に命をかけた男たち</h4>
            <p data-ja="語りと鍵盤がぶつかり合い、ひとつの物語になる。音楽に人生を懸けた男たちを描く、世界初・ピアノとのコラボ講談。" data-en="Voice and piano collide and become one story. A world-first collaboration between Kōdan and piano, portraying men who devoted their lives to music.">語りと鍵盤がぶつかり合い、ひとつの物語になる。音楽に人生を懸けた男たちを描く、<strong>世界初・ピアノとのコラボ講談。</strong></p>
          </article>
        </div>
      </div>

      <div class="repertoire-closing">
        <p data-ja="古典を受け継ぎ、新しい物語をつくる。" data-en="Inheriting the classics. Creating new stories.">古典を受け継ぎ、新しい物語をつくる。</p>
        <strong data-ja="その両方が、旭堂南不二の講談です。" data-en="Both are part of Kyokudo Minamifuji's Kōdan.">その両方が、旭堂南不二の講談です。</strong>
      </div>
    </div>
  </section>`;

    const repertoireStyle = `<style id="repertoire-style">
      .repertoire-section{padding:112px 0;background:#f7f1e7;color:#1b1a17}
      .repertoire-head{display:grid;grid-template-columns:.72fr 1.28fr;gap:64px;align-items:end;margin-bottom:72px}
      .repertoire-head h2{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(2.8rem,6vw,5.5rem);line-height:1.08;margin:10px 0 0;font-weight:500}
      .repertoire-intro{max-width:720px}
      .repertoire-intro p{margin:0 0 14px;color:#5f584f}
      .repertoire-intro .repertoire-lead{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(1.25rem,2vw,1.6rem);line-height:1.7;color:#1b1a17}
      .repertoire-group{margin-top:78px}
      .group-title-row{display:grid;grid-template-columns:.72fr 1.28fr;gap:64px;align-items:start;margin-bottom:34px;padding-top:22px;border-top:1px solid rgba(27,26,23,.28)}
      .group-kicker{display:block;color:#a67b42;font-size:.72rem;letter-spacing:.2em;font-weight:700;margin-bottom:8px}
      .group-title-row h3{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(2rem,3.8vw,3.4rem);line-height:1.2;margin:0;font-weight:500}
      .group-title-row>p,.original-intro p{margin:0;color:#5f584f;line-height:1.95}
      .repertoire-accordions{border-top:1px solid #1b1a17}
      .repertoire-card{border-bottom:1px solid rgba(27,26,23,.42)}
      .repertoire-card summary{list-style:none;cursor:pointer;display:grid;grid-template-columns:58px 1fr 36px;gap:18px;align-items:center;padding:26px 0}
      .repertoire-card summary::-webkit-details-marker{display:none}
      .summary-no{font-family:Georgia,serif;font-size:.8rem;color:#a67b42;letter-spacing:.1em}
      .summary-title{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(1.3rem,2.2vw,1.75rem);line-height:1.5}
      .summary-mark{font-size:1.7rem;font-weight:300;text-align:center;transition:transform .22s ease}
      .repertoire-card[open] .summary-mark{transform:rotate(45deg)}
      .detail-body{padding:0 54px 34px 76px}
      .category-copy{margin:0 0 26px;max-width:900px;color:#514b43;line-height:1.95}
      .story-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:rgba(27,26,23,.13);border:1px solid rgba(27,26,23,.13)}
      .story-list.compact{grid-template-columns:repeat(2,minmax(0,1fr))}
      .story-item{background:#fbf8f2;padding:24px}
      .story-item h4{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.12rem;margin:0 0 8px;font-weight:600}
      .story-item p{margin:0;color:#665f56;font-size:.9rem;line-height:1.75}
      .title-line,.more-stories{margin:22px 0 0;color:#514b43;line-height:1.85}
      .more-stories{font-size:.9rem;color:#746c61}
      .original-group{margin-top:100px}
      .original-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
      .original-card{position:relative;min-height:270px;padding:34px;background:#201f1c;color:#f7f1e7;border:1px solid rgba(255,255,255,.08)}
      .original-card:nth-child(5){grid-column:1/-1;min-height:auto}
      .original-no{display:block;font-family:Georgia,serif;font-size:.72rem;letter-spacing:.12em;color:#d7b477;margin-bottom:26px}
      .original-card h4{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(1.45rem,2.7vw,2.1rem);line-height:1.35;margin:0 0 18px;font-weight:500}
      .original-card p{margin:0;color:#d1c9bd;line-height:1.9}
      .featured-original{background:#2b2721;border-color:#b28a51}
      .special-badge{display:inline-block;margin:0 0 12px;padding:5px 10px;border:1px solid #c49b62;color:#e1c18a;font-size:.68rem;letter-spacing:.15em;font-weight:700}
      .featured-original p strong{color:#fff7e8}
      .repertoire-closing{margin-top:72px;padding-top:38px;border-top:1px solid rgba(27,26,23,.28);font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(1.45rem,2.7vw,2.05rem);line-height:1.7}
      .repertoire-closing p{margin:0}.repertoire-closing strong{font-weight:600}
      @media(max-width:850px){
        .repertoire-section{padding:82px 0}
        .repertoire-head,.group-title-row{grid-template-columns:1fr;gap:22px}
        .repertoire-head{margin-bottom:54px}
        .repertoire-group{margin-top:62px}
        .repertoire-card summary{grid-template-columns:42px 1fr 28px;gap:10px;padding:22px 0}
        .detail-body{padding:0 0 28px 52px}
        .story-list,.story-list.compact,.original-grid{grid-template-columns:1fr}
        .original-card:nth-child(5){grid-column:auto}
      }
      @media(max-width:520px){
        .repertoire-head h2{font-size:3rem}
        .group-title-row h3{font-size:2.25rem}
        .repertoire-card summary{grid-template-columns:32px 1fr 24px}
        .detail-body{padding-left:0}
        .summary-no{font-size:.68rem}
        .original-card{padding:28px 24px}
      }
    </style>`;

    if (!html.includes('id="repertoire-style"')) {
      html = html.replace("</head>", repertoireStyle + "\n</head>");
    }

    if (!html.includes('id="repertoire"')) {
      const contactMarker = '<section class="contact" id="contact">';
      if (html.includes(contactMarker)) {
        html = html.replace(contactMarker, repertoireSection + "\n" + contactMarker);
      } else {
        html = html.replace("</main>", repertoireSection + "\n</main>");
      }
    }

    if (!html.includes('href="#repertoire"')) {
      html = html.replace(
        /(<a[^>]+href="#about"[^>]*>[\s\S]*?<\/a>)/,
        '$1\n      <a href="#repertoire" data-ja="主な演目" data-en="Repertoire">主な演目</a>'
      );
    }

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
