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
          <p class="profile-signature" data-ja="一席一会。二つとない講談を。\n旭堂南不二" data-en="One encounter. One-of-a-kind Kōdan.\nKyokudo Minamifuji">一席一会。二つとない講談を。<br>旭堂南不二</p>
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
