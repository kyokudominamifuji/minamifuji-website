import site from "./brand-worker.js";

const FLYER_FRONT_URL = "/images/flyers/2026-11-01-futari-kai-front.png";
const FLYER_BACK_URL = "/images/flyers/2026-11-01-futari-kai-back.png";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    // NEWS is intentionally hidden until there are real article/detail pages.
    html = html.replace(/<section class="news" id="news">[\s\S]*?<\/section>/, "");
    html = html.replace('<a href="#news" data-ja="お知らせ" data-en="News">お知らせ</a>', "");

    const eventTagline = '<p class="tagline" data-ja="声と糸が、物語を紡ぐ。" data-en="Voice and strings weave a story.">声と糸が、物語を紡ぐ。</p>';
    const flyerOnTop = `${eventTagline}\n          <a class="event-flyer-link" href="/events/2026-11-01" aria-label="旭堂南不二・佐藤さくら子 二人会の詳細を見る"><img src="${FLYER_FRONT_URL}" alt="2026年11月1日 旭堂南不二・佐藤さくら子 二人会 公演チラシ表" loading="lazy"></a>`;
    html = html.replace(eventTagline, flyerOnTop);

    html = html.replace(
      '<div class="flyer"><b>公演チラシ</b><br>完成版をここに掲載します。</div>',
      `<div class="flyer flyer-gallery"><a href="${FLYER_FRONT_URL}" target="_blank" rel="noopener noreferrer" aria-label="公演チラシ表を拡大して見る"><img src="${FLYER_FRONT_URL}" alt="2026年11月1日 旭堂南不二・佐藤さくら子 二人会 公演チラシ表" loading="lazy"></a><a href="${FLYER_BACK_URL}" target="_blank" rel="noopener noreferrer" aria-label="公演チラシ裏を拡大して見る"><img src="${FLYER_BACK_URL}" alt="2026年11月1日 旭堂南不二・佐藤さくら子 二人会 公演チラシ裏" loading="lazy"></a></div>`
    );

    const flyerGalleryStyle = `<style id="futari-flyer-gallery-v2">
      .flyer.flyer-gallery{
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:22px;
        margin:46px 0;
        padding:0;
        border:0;
        background:transparent;
      }
      .flyer-gallery a{display:block;line-height:0}
      .flyer-gallery img{
        display:block;
        width:100%;
        height:auto;
        border:1px solid rgba(21,19,15,.12);
        background:#fff;
        box-shadow:0 10px 30px rgba(21,19,15,.08);
      }
      @media(max-width:700px){
        .flyer.flyer-gallery{grid-template-columns:1fr;gap:18px}
      }
    </style>`;
    html = html.replace("</head>", flyerGalleryStyle + "\n</head>");

    html = html.replace(
      '<div class="instagram-handle">@373.fuji</div>',
      `<div class="instagram-brand"><svg class="instagram-logo" viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.6" cy="6.7" r="1.15" fill="currentColor"/></svg><div class="instagram-handle">@373.fuji</div></div>`
    );

    const kodanSection = `
  <section class="kodan-story" id="kodan">
    <div class="wrap">
      <div class="kodan-intro">
        <div class="kodan-label" data-ja="講談とは？" data-en="WHAT IS KŌDAN?">講談とは？</div>
        <h2 data-ja="ひとりの語りで、\\n物語が動き出す。" data-en="One voice,\\nand the story comes alive.">ひとりの語りで、<br>物語が動き出す。</h2>
        <p class="kodan-opening" data-ja="張り扇で釈台を打つ音。そして、たったひとりの声。" data-en="The sound of a harisen striking the lectern — and a single storyteller's voice.">張り扇で釈台を打つ音。<br>そして、たったひとりの声。</p>
      </div>

      <div class="kodan-story-body">
        <div class="story-block">
          <p data-ja="講談は、歴史上の英雄や名もなき人々の人生を、語りの力でよみがえらせる日本の伝統話芸です。" data-en="Kōdan is a traditional Japanese storytelling art that brings historical heroes and ordinary people back to life through the power of spoken narrative.">講談は、歴史上の英雄や名もなき人々の人生を、語りの力でよみがえらせる日本の伝統話芸です。</p>
          <p data-ja="もともとは「講釈」と呼ばれました。" data-en="It was originally known as kōshaku.">もともとは「講釈」と呼ばれました。</p>
        </div>

        <div class="term-grid" aria-label="講釈という言葉の意味">
          <div class="term-card"><span>講</span><p data-ja="物語を語り伝えること。" data-en="To tell and pass on a story.">物語を語り伝えること。</p></div>
          <div class="term-card"><span>釈</span><p data-ja="語り手なりの解釈を加えること。" data-en="To add the storyteller's own interpretation.">語り手なりの解釈を加えること。</p></div>
        </div>

        <div class="story-block">
          <p data-ja="つまり講談は、昔の物語をそのまま読む芸ではありません。" data-en="Kōdan is not simply the reading of an old story exactly as it was written.">つまり講談は、昔の物語をそのまま読む芸ではありません。</p>
          <p data-ja="同じ物語でも、誰が語るかによって、人物の見え方も、笑いも、感動も変わる。" data-en="Even with the same story, the characters, humor and emotion change depending on who tells it.">同じ物語でも、誰が語るかによって、人物の見え方も、笑いも、感動も変わる。</p>
        </div>

        <div class="story-block">
          <p data-ja="大がかりな舞台装置はありません。けれど、語りが始まれば、そこは戦国の合戦場にも、江戸の宿場町にもなる。" data-en="There is no elaborate stage set. Yet once the storytelling begins, the space can become a Sengoku battlefield or an Edo-period post town.">大がかりな舞台装置はありません。けれど、語りが始まれば、そこは戦国の合戦場にも、江戸の宿場町にもなる。</p>
        </div>

        <div class="kodan-quote">
          <p data-ja="目の前には何もない。\\nだからこそ、頭の中には何でも描ける。" data-en="There may be nothing in front of you.\\nThat is why your imagination can create anything.">目の前には何もない。<br>だからこそ、頭の中には何でも描ける。</p>
          <small data-ja="それが、講談のおもしろさです。" data-en="That is the magic of Kōdan.">それが、講談のおもしろさです。</small>
        </div>
      </div>
    </div>
  </section>

  <section class="minamifuji-kodan" id="minamifuji-kodan">
    <div class="wrap minamifuji-inner">
      <div class="minamifuji-head">
        <div class="minamifuji-label">MINAMIFUJI'S KŌDAN</div>
        <h2 data-ja="南不二の講談" data-en="Minamifuji's Kōdan">南不二の講談</h2>
        <p class="minamifuji-lead" data-ja="古典を大切に。でも、古典にとどまらない。" data-en="Respect the classics — without being confined by them.">古典を大切に。<br>でも、古典にとどまらない。</p>
      </div>

      <div class="minamifuji-copy">
        <p data-ja="旭堂南不二が目指すのは、初めて講談を聴く人にも届く講談です。" data-en="Kyokudo Minamifuji aims to create Kōdan that reaches people hearing it for the very first time.">旭堂南不二が目指すのは、初めて講談を聴く人にも届く講談です。</p>
        <p data-ja="難しい言葉を並べるのではなく、人物の表情や景色が自然と浮かんでくるように、今を生きる人に届く言葉で語る。" data-en="Rather than filling the performance with difficult language, he tells the story in words that let today's audience naturally picture faces, scenes and emotions.">難しい言葉を並べるのではなく、人物の表情や景色が自然と浮かんでくるように、今を生きる人に届く言葉で語る。</p>
        <p class="rhythm" data-ja="笑って、驚いて、ときには胸が熱くなる。" data-en="To laugh, to be surprised, and sometimes to feel your heart stir.">笑って、驚いて、<br>ときには胸が熱くなる。</p>
        <p data-ja="そして、古典を受け継ぎながらも、新しい表現にも挑戦していく。" data-en="And while carrying the classics forward, he continues to explore new forms of expression.">そして、古典を受け継ぎながらも、新しい表現にも挑戦していく。</p>
        <p data-ja="講談を知らなくても、歴史に詳しくなくても大丈夫。" data-en="You do not need to know Kōdan or be an expert in history.">講談を知らなくても、歴史に詳しくなくても大丈夫。</p>
        <div class="audience-quote" data-ja="「講談って、こんなに面白いんだ。」" data-en="“I never knew Kōdan could be this much fun.”">「講談って、こんなに面白いんだ。」</div>
        <p data-ja="そう思ってもらえる一席を。" data-en="That is the kind of performance he wants audiences to experience.">そう思ってもらえる一席を。</p>
        <p class="kodan-ending" data-ja="この日、この場所、このお客様とつくる、\\n二つとない講談をお届けします。" data-en="A one-of-a-kind Kōdan performance, created with this day, this place and this audience.">この日、この場所、このお客様とつくる、<br><strong>二つとない講談をお届けします。</strong></p>
      </div>
    </div>
  </section>`;

    html = html.replace(/<section class="kodan" id="kodan">[\s\S]*?<\/section>/, kodanSection);

    const profileCopy = `<div class="profile-copy">
          <p class="big"><span data-ja="静岡県富士市出身の講談師。旭堂南左衛門に師事。" data-en="A Kōdan storyteller from Fuji City, Shizuoka. Disciple of Kyokudo Nanzaemon and a member of the ">静岡県富士市出身の講談師。旭堂南左衛門に師事。</span><a class="kamigata-link" href="https://www.kamigata-kodan.jp/index.php/member/minamihuji" target="_blank" rel="noopener noreferrer" data-ja="上方講談協会" data-en="Kamigata Kōdan Association" aria-label="上方講談協会の旭堂南不二紹介ページ">上方講談協会</a><span data-ja="所属。" data-en=".">所属。</span></p>
          <p data-ja="人前で語る原点は、高校時代。漫才コンビを組み、17歳で静岡の吉本伝馬町劇場にて初舞台を踏んだ。1995年に高校を卒業して上京し、吉本興業の養成所・東京NSCの1期生としてお笑いの世界へ飛び込む。NSCを出た19歳のときには、ハリウッドでコメディアンを目指すため、単身アメリカ・カリフォルニアへ。ホームステイをしながら、カリフォルニア州立サンバーナーディーノ大学の語学課程で一年間学んだ。" data-en="His path to the stage began in high school, when he formed a manzai comedy duo and made his debut at 17 at Yoshimoto&#39;s Denmachō Theater in Shizuoka. After graduating in 1995, he moved to Tokyo and joined the first class of Yoshimoto's Tokyo NSC comedy school. At 19, after finishing NSC, he went alone to California, living with a host family and spending a year in the language program at California State University, San Bernardino with dreams of becoming a comedian in Hollywood.">人前で語る原点は、高校時代。漫才コンビを組み、17歳で静岡の吉本伝馬町劇場にて初舞台を踏んだ。1995年に高校を卒業して上京し、吉本興業の養成所・東京NSCの1期生としてお笑いの世界へ飛び込む。NSCを出た19歳のときには、ハリウッドでコメディアンを目指すため、単身アメリカ・カリフォルニアへ。ホームステイをしながら、カリフォルニア州立サンバーナーディーノ大学の語学課程で一年間学んだ。</p>
          <p data-ja="2002年9月、落語家に弟子入り。一年間、見習いとして伝統話芸の厳しさと奥深さを学ぶ。その後は東京の大手学習塾で講師として教壇に立ち、2009年5月、地元・富士に戻って起業。自らビジネスを営み、人を雇い、お客様と向き合う日々の中で、浮き沈みも味わった。その一方で、経営のかたわら大学・大学院で学び直し、やがて自らも大学の教壇に立つようになる。" data-en="In September 2002, he became an apprentice to a rakugo master, spending a year learning the discipline and depth of traditional storytelling. He then taught at a major cram school in Tokyo before returning home to Fuji in May 2009 to start his own business — hiring staff, serving customers, and riding life's ups and downs. Alongside running his business, he went back to study at university and graduate school, and in time began teaching at university himself.">2002年9月、落語家に弟子入り。一年間、見習いとして伝統話芸の厳しさと奥深さを学ぶ。その後は東京の大手学習塾で講師として教壇に立ち、2009年5月、地元・富士に戻って起業。自らビジネスを営み、人を雇い、お客様と向き合う日々の中で、浮き沈みも味わった。その一方で、経営のかたわら大学・大学院で学び直し、やがて自らも大学の教壇に立つようになる。</p>
          <p data-ja="そして2019年、満を持して上方講談協会会長・旭堂南左衛門の門戸を叩き、講談の稽古を始める。2023年9月、師匠から「南不二」の名を授かった。富士山の麓で生まれ育ったことからの「富士」と、「二つとない」を意味する「不二」。二つの意味が込められている。" data-en="In 2019, with renewed purpose, he knocked on the door of Kyokudo Nanzaemon, president of the Kamigata Kōdan Association, and began training in kōdan. In September 2023, his master gave him the stage name Minamifuji, which holds two meanings: Fuji, for the mountain he grew up beneath, and 不二 (fuji), “one of a kind.”">そして2019年、満を持して上方講談協会会長・旭堂南左衛門の門戸を叩き、講談の稽古を始める。2023年9月、師匠から「南不二」の名を授かった。富士山の麓で生まれ育ったことからの「富士」と、「二つとない」を意味する「不二」。二つの意味が込められている。</p>
          <p data-ja="古典講談では太閤記や難波戦記、赤穂義士伝などを語り、静岡に眠る歴史を掘り起こした創作講談も手がける。漫才で磨いた「間」、教壇で鍛えた「伝える力」、ビジネスで培った「人の心をつかむ言葉」。回り道のすべてが、いまの語りを支えている。" data-en="He performs classical works such as the Taikōki, Naniwa Senki and tales of the Forty-Seven Rōnin, and creates original pieces that bring Shizuoka's forgotten history back to life. The timing honed in comedy, the clarity built in the classroom, and the words that win hearts learned in business — every detour now shapes his storytelling.">古典講談では太閤記や難波戦記、赤穂義士伝などを語り、静岡に眠る歴史を掘り起こした創作講談も手がける。漫才で磨いた「間」、教壇で鍛えた「伝える力」、ビジネスで培った「人の心をつかむ言葉」。回り道のすべてが、いまの語りを支えている。</p>
          <p data-ja="その大学の授業でも、講談を通して「語る力」「物語で伝える力」を教えている。留学生を含む学生に英語字幕付きの講談を届け、富士市のゲストハウスでも英語字幕付きの講談会を続けている。" data-en="At university, he teaches kōdan as a way to build speaking and storytelling skills, performing with English subtitles for Japanese and international students alike. He also hosts a regular English-subtitled kōdan series at a guesthouse in Fuji City.">その大学の授業でも、講談を通して「語る力」「物語で伝える力」を教えている。留学生を含む学生に英語字幕付きの講談を届け、富士市のゲストハウスでも英語字幕付きの講談会を続けている。</p>
          <p data-ja="掲げるのは「講談界のカリフォルニアロール」。若き日にコメディアンを夢見て暮らしたカリフォルニアにも重なる言葉だ。本物の寿司ではないと言われたカリフォルニアロールが寿司を世界に広めたように、伝統への敬意を守りながら、講談の届く範囲を広げていく。" data-en="His motto is to be “the California Roll of kōdan.” Fittingly, California is where he once lived chasing comedy. Just as the California roll — once dismissed as not real sushi — helped sushi win the world, he honors tradition while carrying kōdan to new audiences.">掲げるのは「講談界のカリフォルニアロール」。若き日にコメディアンを夢見て暮らしたカリフォルニアにも重なる言葉だ。本物の寿司ではないと言われたカリフォルニアロールが寿司を世界に広めたように、伝統への敬意を守りながら、講談の届く範囲を広げていく。</p>
          <p data-ja="大切にしているのは「一席一会」。その日のお客さん、その場の空気で、語りは毎回変わる。笑って、胸が熱くなって、帰るときには明日が少し楽しみになる。そんな「二つとない一席」を目指している。" data-en="Above all, he values “one performance, one encounter.” Every telling changes with the audience and the air of the day. He aims for a one-of-a-kind performance that makes you laugh, stirs your heart, and sends you home looking forward to tomorrow.">大切にしているのは「一席一会」。その日のお客さん、その場の空気で、語りは毎回変わる。笑って、胸が熱くなって、帰るときには明日が少し楽しみになる。そんな「二つとない一席」を目指している。</p>
          <p class="profile-signature" data-ja="一席一会。二つとない講談を。\\n旭堂南不二" data-en="One encounter. One-of-a-kind Kōdan.\\nKyokudo Minamifuji">一席一会。二つとない講談を。<br>旭堂南不二</p>
          <div class="repertoire">`;

    html = html.replace(/<div class="profile-copy">[\s\S]*?<div class="repertoire">/, profileCopy);

    // プロフィール見出し下のひとこと（下の層 worker.js / brand-worker.js の文言の行き来に関係なく、ここで確定させる）
    html = html.replace(/(<div class="eyebrow">THE STORYTELLER<\/div>[\s\S]*?<\/div>\s*)<p [^>]*>[\s\S]*?<\/p>/,
      '$1<div class="mf-profile-lead">' +
        '<p class="mf-lead-1" data-ja="17歳、吉本伝馬町劇場にて漫才師として初舞台。" data-en="At 17, a stage debut as a manzai comedian at Yoshimoto&#39;s Denmachō Theater.">17歳、吉本伝馬町劇場にて漫才師として初舞台。</p>' +
        '<p class="mf-lead-2" data-ja="吉本興業・東京NSC1期生。" data-en="A member of the first class of Yoshimoto&#39;s Tokyo NSC comedy school.">吉本興業・東京NSC1期生。</p>' +
        '<p data-ja="笑いを追い、教壇に立ち、自ら事業を興す。そして、講談の高座へ。" data-en="Chasing laughter, standing at the lectern, building his own business — and then, to the kōdan stage.">笑いを追い、教壇に立ち、自ら事業を興す。そして、講談の高座へ。</p>' +
        '<p class="mf-lead-3" data-ja="遠回りこそが、この芸の原点。" data-en="The long way around is where this art begins.">遠回りこそが、この芸の原点。</p>' +
        '</div>');

    const typeStyle = `<style id="hero-title-size-fix">
      html:lang(ja) .hero-kicker {
        font-size: clamp(2.85rem, 5vw, 5.2rem) !important;
        line-height: .98 !important;
        letter-spacing: .025em !important;
        font-weight: 500 !important;
        margin-bottom: 20px !important;
      }
      .event-flyer-link {
        display: block;
        width: min(360px, 100%);
        margin: 20px 0 26px;
      }
      .event-flyer-link img {
        display: block;
        width: 100%;
        height: auto;
        border: 1px solid var(--line);
        box-shadow: 0 10px 30px rgba(21,19,15,.10);
      }
      .flyer.flyer-image {
        padding: 0 !important;
        border: 0 !important;
        background: transparent !important;
      }
      .flyer.flyer-image img {
        display: block;
        width: min(560px, 100%);
        height: auto;
        margin: 0 auto;
        box-shadow: 0 12px 34px rgba(21,19,15,.12);
      }
      .instagram-brand {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 8px;
      }
      .instagram-logo {
        width: clamp(34px, 4vw, 46px);
        height: clamp(34px, 4vw, 46px);
        flex: 0 0 auto;
        color: var(--ink);
      }
      .instagram-brand .instagram-handle {
        margin-bottom: 0 !important;
      }
      .profile .mf-profile-lead p{margin:0 0 6px;line-height:1.9}
      .profile .mf-profile-lead .mf-lead-1{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.25em;color:var(--ink);margin-bottom:10px}
      .profile .mf-profile-lead .mf-lead-3{font-weight:700;color:#a13d28;margin-top:10px}
      .profile-copy .profile-signature {
        margin-top: 36px;
        padding-top: 24px;
        border-top: 1px solid var(--line);
        font-size: 1.18rem;
        line-height: 1.9;
        font-weight: 700;
      }

      /* Editorial-style Kōdan introduction: one reading flow, no competing columns. */
      .kodan-story {
        background: #1d1b17;
        color: #f7f1e7;
        padding: 112px 0 120px;
      }
      .kodan-intro {
        max-width: 920px;
        margin: 0 auto 70px;
      }
      .kodan-label {
        color: #d6b67b;
        font-weight: 800;
        font-size: clamp(1.05rem, 1.8vw, 1.35rem);
        letter-spacing: .18em;
        margin-bottom: 22px;
      }
      .kodan-intro h2 {
        margin: 0;
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif;
        font-size: clamp(3.3rem, 7vw, 6.3rem);
        line-height: 1.12;
        font-weight: 500;
        letter-spacing: .015em;
      }
      .kodan-opening {
        margin: 38px 0 0;
        color: #d7d0c5;
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif;
        font-size: clamp(1.25rem, 2.3vw, 1.75rem);
        line-height: 1.9;
      }
      .kodan-story-body {
        max-width: 820px;
        margin: 0 auto;
      }
      .story-block {
        padding: 38px 0;
        border-top: 1px solid rgba(255,255,255,.16);
      }
      .story-block p {
        margin: 0 0 20px;
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif;
        font-size: clamp(1.08rem, 1.8vw, 1.28rem);
        line-height: 2.05;
      }
      .story-block p:last-child { margin-bottom: 0; }
      .term-grid {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 16px;
        margin: 16px 0 46px;
      }
      .term-card {
        border: 1px solid rgba(214,182,123,.45);
        padding: 28px 26px;
        background: rgba(255,255,255,.025);
      }
      .term-card span {
        display: block;
        color: #d6b67b;
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif;
        font-size: 3.8rem;
        line-height: 1;
        margin-bottom: 14px;
      }
      .term-card p {
        margin: 0;
        color: #e6ded2;
        line-height: 1.8;
      }
      .kodan-quote {
        margin: 54px 0 0;
        padding: 42px 0 6px;
        border-top: 1px solid #d6b67b;
      }
      .kodan-quote p {
        margin: 0;
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif;
        font-size: clamp(2rem, 4.4vw, 3.7rem);
        line-height: 1.55;
        letter-spacing: .02em;
      }
      .kodan-quote small {
        display: block;
        margin-top: 22px;
        color: #d6b67b;
        font-size: 1rem;
      }
      .minamifuji-kodan {
        background: #f5efe4;
        color: #15130f;
        padding: 112px 0 120px;
      }
      .minamifuji-inner {
        max-width: 920px;
      }
      .minamifuji-head {
        margin-bottom: 54px;
      }
      .minamifuji-label {
        color: var(--gold);
        font-size: .8rem;
        font-weight: 800;
        letter-spacing: .2em;
        margin-bottom: 12px;
      }
      .minamifuji-head h2 {
        margin: 0;
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif;
        font-size: clamp(3rem, 6vw, 5.3rem);
        line-height: 1.15;
        font-weight: 500;
      }
      .minamifuji-lead {
        margin: 28px 0 0;
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif;
        font-size: clamp(1.6rem, 3vw, 2.5rem);
        line-height: 1.65;
      }
      .minamifuji-copy {
        max-width: 780px;
      }
      .minamifuji-copy > p {
        margin: 0 0 26px;
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif;
        font-size: clamp(1.06rem, 1.8vw, 1.22rem);
        line-height: 2.05;
      }
      .minamifuji-copy .rhythm {
        margin: 48px 0;
        font-size: clamp(1.7rem, 3.5vw, 2.8rem);
        line-height: 1.65;
      }
      .audience-quote {
        margin: 52px 0 22px;
        padding: 32px 0;
        border-top: 1px solid var(--ink);
        border-bottom: 1px solid var(--ink);
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif;
        font-size: clamp(2rem, 4.6vw, 3.5rem);
        line-height: 1.5;
      }
      .kodan-ending {
        margin-top: 54px !important;
        padding-top: 30px;
        border-top: 1px solid var(--line);
      }
      .kodan-ending strong {
        display: inline-block;
        margin-top: 8px;
        font-size: 1.22em;
      }

      /* Keep all typography off the photographs. Desktop: text panel left, photo right. */
      .hero {
        background: #11100d !important;
      }
      .hero:before {
        left: 52% !important;
        right: 0 !important;
        width: auto !important;
        background-position: center 22% !important;
      }
      .hero:after {
        display: none !important;
      }
      .hero-inner > * {
        max-width: min(520px, 42vw) !important;
      }
      .portrait:after {
        display: none !important;
        content: none !important;
      }

      @media (max-width: 1100px) {
        html:lang(ja) .hero-kicker {
          font-size: clamp(2.7rem, 5.6vw, 4.2rem) !important;
        }
      }
      @media (max-width: 850px) {
        html:lang(ja) .hero-kicker {
          font-size: clamp(2.3rem, 11.5vw, 3rem) !important;
          letter-spacing: .01em !important;
        }
        .hero {
          min-height: auto !important;
          display: block !important;
          padding-top: 68vh !important;
        }
        .hero:before {
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: auto !important;
          width: 100% !important;
          height: 68vh !important;
          background-position: center 20% !important;
          background-size: cover !important;
        }
        .hero-inner {
          padding: 42px 0 64px !important;
        }
        .hero-inner > * {
          max-width: none !important;
        }
        .kodan-story,.minamifuji-kodan {
          padding: 78px 0 84px;
        }
        .kodan-intro {
          margin-bottom: 48px;
        }
        .kodan-label {
          font-size: 1.08rem;
          letter-spacing: .13em;
          margin-bottom: 16px;
        }
        .kodan-intro h2 {
          font-size: clamp(2.2rem, 10vw, 3rem);
          line-height: 1.2;
          letter-spacing: 0;
        }
        .kodan-opening {
          margin-top: 26px;
          font-size: 1.15rem;
        }
        .story-block {
          padding: 30px 0;
        }
        .term-grid {
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 36px;
        }
        .term-card {
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 18px;
          align-items: center;
          padding: 22px;
        }
        .term-card span {
          margin: 0;
          font-size: 3rem;
        }
        .kodan-quote {
          margin-top: 36px;
          padding-top: 30px;
        }
        .kodan-quote p {
          font-size: clamp(1.75rem, 8vw, 2.45rem);
        }
        .minamifuji-head h2 {
          font-size: clamp(2.7rem, 11vw, 3.7rem);
        }
        .minamifuji-lead {
          font-size: 1.55rem;
        }
        .minamifuji-copy .rhythm {
          font-size: 1.7rem;
          margin: 38px 0;
        }
        .audience-quote {
          margin-top: 40px;
          font-size: clamp(1.8rem, 8.5vw, 2.5rem);
        }
      }
    </style>`;

    html = html.replace("</head>", typeStyle + "\n</head>");

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
