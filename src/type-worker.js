import site from "./brand-worker.js";

const FLYER_URL = "https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/futari-kai-2026-11-01.png";

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
    const flyerOnTop = `${eventTagline}\n          <a class="event-flyer-link" href="/events/2026-11-01" aria-label="旭堂南不二・佐藤さくら子 二人会の詳細を見る"><img src="${FLYER_URL}" alt="2026年11月1日 旭堂南不二・佐藤さくら子 二人会 公演チラシ" loading="lazy"></a>`;
    html = html.replace(eventTagline, flyerOnTop);

    html = html.replace(
      '<div class="flyer"><b>公演チラシ</b><br>完成版をここに掲載します。</div>',
      `<div class="flyer flyer-image"><img src="${FLYER_URL}" alt="2026年11月1日 旭堂南不二・佐藤さくら子 二人会 公演チラシ" loading="lazy"></div>`
    );

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
          <p class="big" data-ja="静岡県富士市出身の講談師。旭堂南左衛門に師事。上方講談協会所属。" data-en="A Kōdan storyteller from Fuji City, Shizuoka. Disciple of Kyokudo Nanzaemon and a member of the Kamigata Kodan Association.">静岡県富士市出身の講談師。旭堂南左衛門に師事。上方講談協会所属。</p>
          <p data-ja="「南不二」は、師匠・旭堂南左衛門から授かった芸名です。" data-en="“Minamifuji” is the stage name given to him by his master, Kyokudo Nanzaemon.">「南不二」は、師匠・旭堂南左衛門から授かった芸名です。</p>
          <p data-ja="富士山の麓で生まれ育ったことからの「富士」。そして、「二つとない」ことを意味する「不二」。その二つの意味が、この名前には込められています。" data-en="The name carries two meanings: Fuji, from being born and raised at the foot of Mt. Fuji, and 不二, meaning “there is no second” — one of a kind.">富士山の麓で生まれ育ったことからの「富士」。そして、「二つとない」ことを意味する「不二」。その二つの意味が、この名前には込められています。</p>
          <p data-ja="だからこそ大切にしているのが、「一席一会」。同じ演目でも、その日のお客さん、その場の空気によって、語りは変わる。受け継がれてきた物語を大切にしながら、いまを生きる人の心に届く言葉で語る。" data-en="That is why he values the idea of ‘one performance, one encounter.’ Even the same story changes with the audience and the atmosphere of the day. He honors stories handed down through generations while telling them in words that reach people living now.">だからこそ大切にしているのが、「一席一会」。同じ演目でも、その日のお客さん、その場の空気によって、語りは変わる。受け継がれてきた物語を大切にしながら、いまを生きる人の心に届く言葉で語る。</p>
          <p data-ja="笑って、胸が熱くなって、帰るときには明日が少し楽しみになる。そんな「二つとない一席」を目指しています。" data-en="A performance that makes you laugh, moves your heart, and leaves you looking forward to tomorrow a little more. That is the one-of-a-kind Kōdan he aims to create.">笑って、胸が熱くなって、帰るときには明日が少し楽しみになる。そんな「二つとない一席」を目指しています。</p>
          <p data-ja="そして、伝統を受け継ぐだけでなく、伝統の届く範囲を広げていく。" data-en="And beyond inheriting tradition, he wants to widen the reach of that tradition.">そして、伝統を受け継ぐだけでなく、伝統の届く範囲を広げていく。</p>
          <p data-ja="音楽との共演、大学での講談教育、講演やワークショップ、デジタルでの発信。さらに英語による導入や英語字幕など、講談を世界へ届ける挑戦も始めています。" data-en="Through collaborations with music, teaching Kōdan at university, lectures, workshops and digital media, he is expanding how Kōdan can be shared. He is also beginning new efforts to bring Kōdan to the world through English introductions and subtitles.">音楽との共演、大学での講談教育、講演やワークショップ、デジタルでの発信。さらに英語による導入や英語字幕など、講談を世界へ届ける挑戦も始めています。</p>
          <p data-ja="新しい形には、賛否があるかもしれない。それでも、変えないものがあります。物語を語り、人の心を動かすこと。" data-en="New forms may invite different opinions. But one thing does not change: telling stories that move people.">新しい形には、賛否があるかもしれない。それでも、変えないものがあります。物語を語り、人の心を動かすこと。</p>
          <p data-ja="伝統を受け継ぎ、新しい扉を開き、まだ講談を知らない人へ。日本から、世界へ。" data-en="Carrying tradition forward, opening new doors, and reaching people who have not yet discovered Kōdan — from Japan to the world.">伝統を受け継ぎ、新しい扉を開き、まだ講談を知らない人へ。日本から、世界へ。</p>
          <p class="profile-signature" data-ja="一席一会。二つとない講談を。\\n旭堂南不二" data-en="One encounter. One-of-a-kind Kōdan.\\nKyokudo Minamifuji">一席一会。二つとない講談を。<br>旭堂南不二</p>
          <div class="repertoire">`;

    html = html.replace(/<div class="profile-copy">[\s\S]*?<div class="repertoire">/, profileCopy);

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
