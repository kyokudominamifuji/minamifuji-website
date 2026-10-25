import worker from "./worker.js";

const LOGO_URL = "https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/1DE59A7B-F9B1-46A1-8E04-49435E076147.png";
const INSTAGRAM_URL = "https://www.instagram.com/373.fuji/";
const EVENT_FORM_URL = "https://forms.gle/1AqQEx7TZe2fJvqE8";

function eventPage1101() {
  const front = "https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/futari-kai-2026-11-01-front.png";
  const back = "https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/futari-kai-2026-11-01-back.png";
  const page = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#171a25">
  <meta name="description" content="2026年11月1日（日）旭堂南不二・佐藤さくら子 二人会。居酒屋ポチ（富士市吉原）にて16:15開演。出演情報と公演チラシ・ご予約はこちら。">
  <link rel="canonical" href="https://kyokudominamifuji.com/events/2026-11-01">
  <meta property="og:type" content="event">
  <meta property="og:title" content="旭堂南不二・佐藤さくら子 二人会｜2026年11月1日">
  <meta property="og:description" content="張り扇と三本の糸が、物語を紡ぐ。11月1日、富士・居酒屋ポチにて。">
  <meta property="og:url" content="https://kyokudominamifuji.com/events/2026-11-01">
  <meta property="og:image" content="${front}">
  <meta name="twitter:card" content="summary_large_image">
  <title>第一回 旭堂南不二・佐藤さくら子 二人会｜2026.11.01</title>
  <style>
    :root{--fk-night:#171a25;--fk-ivory:#fbf8f0;--fk-paper:#fffdf8;--fk-gold:#c7a36a;--fk-orange:#d65c21;--fk-ink:#222019;--fk-muted:#6d675c;--fk-edge:rgba(38,34,27,.15)}
    *,*::before,*::after{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;background:var(--fk-ivory);color:var(--fk-ink);font-family:"Hiragino Kaku Gothic ProN","Yu Gothic",system-ui,sans-serif;line-height:1.8;overflow-x:hidden}
    a{color:inherit}
    img{max-width:100%}
    .fk-stripe{height:9px;background:repeating-linear-gradient(90deg,#111 0 32px,#e95f25 32px 62px,#138834 62px 94px,#111 94px 120px)}
    .fk-container{width:min(1100px,calc(100% - 48px));margin-inline:auto}
    .fk-head{background:var(--fk-night);color:#fff}
    .fk-head-inner{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:15px 0}
    .fk-home-brand{display:block;line-height:0}
    .fk-home-brand img{width:min(224px,48vw);height:47px;object-fit:contain;object-position:left center}
    .fk-backlink{white-space:nowrap;text-decoration:none;color:#f2dfc0;border-bottom:1px solid rgba(242,223,192,.48);font-size:.8rem;letter-spacing:.06em;padding-bottom:2px}
    .fk-hero{position:relative;background:var(--fk-night);color:#fff;padding:58px 0 76px;overflow:hidden}
    .fk-hero::before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 86% 21%,rgba(199,163,106,.15),transparent 48%),linear-gradient(135deg,transparent 70%,rgba(199,163,106,.045) 70%)}
    .fk-hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1.18fr) minmax(280px,.82fr);gap:clamp(32px,5vw,84px);align-items:center}
    .fk-kicker{color:#d9bd89;font-size:.76rem;font-weight:800;letter-spacing:.16em}
    .fk-date{display:flex;align-items:baseline;gap:14px;margin:28px 0 28px;color:#e8d6b4}
    .fk-date strong{font:500 clamp(3.2rem,7vw,5.5rem)/1 Georgia,serif;letter-spacing:-.045em;color:#fff}
    .fk-date span{font-size:.85rem;letter-spacing:.11em}
    .fk-title{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-weight:600;font-size:clamp(2.5rem,4.4vw,4.8rem);line-height:1.4;letter-spacing:.04em;margin:0}
    .fk-title .fk-cross{color:var(--fk-gold);font-family:Georgia,serif;font-size:.62em}
    .fk-title small{display:block;margin-top:12px;color:#e6c08a;font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(1.1rem,2.2vw,1.6rem);font-weight:500;letter-spacing:.24em}
    .fk-lead{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;color:#f5e7c8;font-size:clamp(1.2rem,2vw,1.6rem);line-height:1.9;margin:30px 0 0}
    .fk-summary{margin:16px 0 0;color:#d5d1c8;font-size:.95rem}
    .fk-hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin:32px 0 0}
    .fk-primary{display:inline-flex;align-items:center;justify-content:center;min-height:54px;padding:12px 28px;background:var(--fk-orange);border:1px solid var(--fk-orange);color:#fff;text-align:center;font-size:1rem;font-weight:800;letter-spacing:.05em;text-decoration:none;box-shadow:0 8px 26px rgba(0,0,0,.14);transition:background .2s,transform .2s}
    .fk-primary:hover,.fk-primary:focus-visible{background:#b74714;transform:translateY(-2px)}
    .fk-subtle-link{display:inline-flex;align-items:center;justify-content:center;padding:12px 10px;color:#e9d9b9;font-size:.86rem;text-underline-offset:5px}
    .fk-poster{margin:0;justify-self:center;width:min(100%,390px);text-align:center}
    .fk-poster a{display:block;line-height:0}
    .fk-poster img{display:block;width:100%;height:auto;background:#fff;box-shadow:14px 18px 40px rgba(0,0,0,.33);border:7px solid #fff}
    .fk-poster figcaption{color:#c9c3b5;font-size:.76rem;line-height:1.7;margin-top:14px}
    .fk-details{padding:70px 0 74px}
    .fk-section-eyebrow{display:block;color:#9a6a30;font-size:.74rem;letter-spacing:.18em;font-weight:800;margin-bottom:8px}
    .fk-section-title{margin:0 0 26px;font:600 clamp(1.8rem,3.5vw,2.6rem)/1.4 "Yu Mincho","Hiragino Mincho ProN",serif}
    .fk-data{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border:1px solid var(--fk-edge);background:var(--fk-paper)}
    .fk-data-item{padding:25px 28px;min-width:0}
    .fk-data-item:nth-child(odd){border-right:1px solid var(--fk-edge)}
    .fk-data-item:nth-child(-n+2){border-bottom:1px solid var(--fk-edge)}
    .fk-data dt{color:#9a6a30;font-size:.73rem;font-weight:800;letter-spacing:.13em;margin-bottom:7px}
    .fk-data dd{margin:0;font-size:1.04rem;font-weight:700;line-height:1.75;overflow-wrap:anywhere}
    .fk-data dd small{font-size:.82rem;color:var(--fk-muted);font-weight:400}
    .fk-conditions{margin:20px 0 0;color:var(--fk-muted);font-size:.84rem}
    .fk-booking{display:flex;align-items:center;justify-content:space-between;gap:24px;margin:34px 0 0;padding:26px 30px;background:#f0e5d2;border-left:4px solid var(--fk-orange)}
    .fk-booking h3{margin:0;font:600 1.35rem/1.5 "Yu Mincho","Hiragino Mincho ProN",serif}
    .fk-booking p{margin:5px 0 0;color:#645a4e;font-size:.85rem}
    .fk-booking .fk-primary{flex-shrink:0}
    .fk-people{padding:65px 0 76px;background:#eee7db}
    .fk-people-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.85fr);gap:54px;align-items:start}
    .fk-people p{line-height:2;max-width:550px}
    .fk-guest{margin:24px 0 0;padding-top:18px;border-top:1px solid var(--fk-edge)}
    .fk-reverse{margin:0}
    .fk-reverse a{display:block;max-width:440px;line-height:0;background:#fff;box-shadow:0 16px 38px rgba(25,20,10,.12)}
    .fk-reverse img{display:block;width:100%;height:auto}
    .fk-reverse figcaption{margin-top:10px;color:var(--fk-muted);font-size:.78rem}
    .fk-footer{background:var(--fk-night);color:#c9c4ba;padding:35px 0 45px;text-align:center;font-size:.86rem}
    .fk-footer a{color:#f2dfc0;text-underline-offset:4px}
    .fk-footer p{margin:8px 0}
    @media(max-width:820px){
      .fk-hero-grid{grid-template-columns:1fr;gap:45px}
      .fk-hero{padding:42px 0 55px}
      .fk-date{margin:20px 0}
      .fk-poster{width:min(100%,440px)}
      .fk-people-grid{grid-template-columns:1fr;gap:26px}
      .fk-reverse a{margin-inline:auto}
    }
    @media(max-width:560px){
      .fk-container{width:calc(100% - 32px)}
      .fk-head-inner{padding:12px 0}
      .fk-home-brand img{height:38px}
      .fk-backlink{font-size:.7rem}
      .fk-title{font-size:clamp(2.05rem,9vw,3rem)}
      .fk-lead{font-size:1.16rem}
      .fk-hero-actions{display:grid}
      .fk-primary,.fk-subtle-link{width:100%}
      .fk-details,.fk-people{padding:52px 0 56px}
      .fk-data{grid-template-columns:1fr}
      .fk-data-item,.fk-data-item:nth-child(odd),.fk-data-item:nth-child(-n+2){border-right:0;border-bottom:1px solid var(--fk-edge)}
      .fk-data-item:last-child{border-bottom:0}
      .fk-data-item{padding:19px 20px}
      .fk-booking{display:block;padding:22px 20px}
      .fk-booking .fk-primary{margin-top:18px}
    }
    @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.fk-primary{transition:none}}
  </style>
</head>
<body class="fk-detail">
<div class="fk-stripe" aria-hidden="true"></div>
<header class="fk-head">
  <div class="fk-container fk-head-inner">
    <a class="fk-home-brand" href="/" aria-label="旭堂南不二 公式サイトに戻る"><img src="${LOGO_URL}" alt="旭堂南不二"></a>
    <a class="fk-backlink" href="/">公式HPに戻る</a>
  </div>
</header>
<main id="main">
  <section class="fk-hero" aria-labelledby="fk-event-heading">
    <div class="fk-container fk-hero-grid">
      <div>
        <div class="fk-kicker">FIRST PERFORMANCE ・ 講談 × 三味線</div>
        <div class="fk-date"><strong>11.01</strong><span>2026年・日曜日</span></div>
        <h1 class="fk-title" id="fk-event-heading">旭堂南不二 <span class="fk-cross">×</span><br>佐藤さくら子<small>第 一 回 二 人 会</small></h1>
        <p class="fk-lead">張り扇と三本の糸が、物語を紡ぐ。</p>
        <p class="fk-summary">語りの迫力と三味線の響きが出会う、富士の一日。<br>ゲストはオレンジマジシャンニシオ。</p>
        <div class="fk-hero-actions">
          <a class="fk-primary" href="${EVENT_FORM_URL}" target="_blank" rel="noopener noreferrer">Googleフォームから予約する</a>
          <a class="fk-subtle-link" href="#fk-details">公演の詳細を見る ↓</a>
        </div>
      </div>
      <figure class="fk-poster">
        <a href="${front}" target="_blank" rel="noopener noreferrer" aria-label="公演チラシ表を原寸で開く"><img src="${front}" alt="2026年11月1日 第一回二人会の公演チラシ表（印刷済みQRコードを含む）" loading="eager"></a>
        <figcaption>チラシをタップすると拡大できます。印刷済みQRコードも変更していません。</figcaption>
      </figure>
    </div>
  </section>
  <section class="fk-details" id="fk-details" aria-labelledby="fk-info-heading">
    <div class="fk-container">
      <span class="fk-section-eyebrow">EVENT INFORMATION</span>
      <h2 class="fk-section-title" id="fk-info-heading">公演のご案内</h2>
      <dl class="fk-data">
        <div class="fk-data-item"><dt>日時</dt><dd>2026年11月1日（日）<br>16:00開場 ／ 16:15開演<br><small>18:00頃終演予定</small></dd></div>
        <div class="fk-data-item"><dt>会場</dt><dd>居酒屋 ポチ<br><small>静岡県富士市吉原4丁目10-48 2階</small></dd></div>
        <div class="fk-data-item"><dt>木戸銭</dt><dd>前売 3,000円 ／ 当日 3,500円<br><small>1ドリンク付（アルコール含む）</small></dd></div>
        <div class="fk-data-item"><dt>出演</dt><dd>旭堂南不二 ／ 佐藤さくら子<br><small>ゲスト：オレンジマジシャンニシオ</small></dd></div>
      </dl>
      <p class="fk-conditions">※ 全席自由。未就学児は入場できません。</p>
      <div class="fk-booking">
        <div><h3>お席のご予約はこちら</h3><p>申込先は従来と同じGoogleフォームです。チラシのQRコードも引き続き利用できます。</p></div>
        <a class="fk-primary" href="${EVENT_FORM_URL}" target="_blank" rel="noopener noreferrer">お申し込みへ進む →</a>
      </div>
    </div>
  </section>
  <section class="fk-people" aria-labelledby="fk-cast-heading">
    <div class="fk-container fk-people-grid">
      <div>
        <span class="fk-section-eyebrow">PERFORMERS</span>
        <h2 class="fk-section-title" id="fk-cast-heading">語りと糸、そして驚き。</h2>
        <p>講談師・旭堂南不二と三味線奏者・佐藤さくら子が、伝統の話芸と音色を届けます。さらに、オレンジマジシャンニシオがゲスト出演。</p>
        <p class="fk-guest">出演者のプロフィールは、右のチラシ裏面に掲載しています。画像を押すと拡大できます。</p>
      </div>
      <figure class="fk-reverse">
        <a href="${back}" target="_blank" rel="noopener noreferrer" aria-label="出演者プロフィール・チラシ裏面を原寸で開く"><img src="${back}" alt="旭堂南不二・佐藤さくら子・オレンジマジシャンニシオのプロフィールが掲載されたチラシ裏面" loading="lazy"></a>
        <figcaption>公演チラシ 裏面 ／ 出演者プロフィール</figcaption>
      </figure>
    </div>
  </section>
</main>
<footer class="fk-footer">
  <div class="fk-container">
    <p>お問い合わせ：<a href="mailto:373fuji@gmail.com">373fuji@gmail.com</a></p>
    <p><a href="/">旭堂南不二 公式サイト</a> ／ 一席一会、二つとない講談を。</p>
  </div>
</footer>
</body>
</html>`;
  // Printed QR destinations never change; expired forms are removed automatically.
  const todayInJapan = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  if (todayInJapan <= "2026-11-01") return page;
  return page
    .replace(
      '<a class="fk-primary" href="' + EVENT_FORM_URL + '" target="_blank" rel="noopener noreferrer">Googleフォームから予約する</a>',
      '<span class="fk-primary" role="status" style="background:#514e46;border-color:#514e46;box-shadow:none;cursor:default">この公演は終了しました</span>'
    )
    .replace(
      '<h3>お席のご予約はこちら</h3><p>申込先は従来と同じGoogleフォームです。チラシのQRコードも引き続き利用できます。</p>',
      '<h3>ご来場ありがとうございました</h3><p>こちらは終了した公演の記録です。次回の公演については公式HPの出演情報をご覧ください。</p>'
    )
    .replace(
      '<a class="fk-primary" href="' + EVENT_FORM_URL + '" target="_blank" rel="noopener noreferrer">お申し込みへ進む →</a>',
      '<a class="fk-primary" href="/#stage">これからの公演を見る →</a>'
    );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/events/2026-11-01" || url.pathname === "/events/2026-11-01/") {
      return new Response(eventPage1101(), {headers:{"content-type":"text/html; charset=UTF-8","cache-control":"public, max-age=60"}});
    }

    const response = await worker.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    // TOP: keep the professional title concise and let the main name carry the identity.
    html = html
      .replace(
        '<div class="hero-kicker" data-ja="講談師 ／ 旭堂南不二" data-en="KŌDAN STORYTELLER / KYOKUDO MINAMIFUJI">講談師 ／ 旭堂南不二</div>',
        '<div class="hero-kicker" data-ja="講談師" data-en="KODAN STORYTELLER">講談師</div>'
      )
      .replace(
        '<h1>旭堂南不二</h1>',
        '<h1><ruby>旭堂南不二<rt>きょくどう　みなみふじ</rt></ruby></h1>'
      )
      .replaceAll(
        '一席一会。二つとない講談を届ける講談師。',
        '高座で語り、大学でも講談を教える講談師。'
      )
      .replaceAll(
        'A Kōdan storyteller creating one-of-a-kind performances.',
        'A Kōdan storyteller who performs on stage and teaches Kōdan at university.'
      )
      .replaceAll(
        '講談会やイベントでの高座に加え、講演やワークショップにも取り組んでいます。世界に向けては、英語での導入と日本語の講談、英語字幕による発信も準備しています。',
        '高座だけでなく、大学で講談を教え、講演やワークショップにも取り組んでいます。世界に向けては、英語での導入と日本語の講談、英語字幕による発信も準備しています。'
      )
      .replaceAll(
        'Alongside Kōdan performances, he offers talks and workshops. For international audiences, he is developing performances with English introductions, Japanese Kōdan and English subtitles.',
        'Alongside performing, he teaches Kōdan at university and offers talks and workshops. For international audiences, he is developing performances with English introductions, Japanese Kōdan and English subtitles.'
      )
      .replaceAll(
        '講談会・イベント出演、文化施設などでの講演、ワークショップ、取材・企画のご相談はメールでお問い合わせください。',
        '講談会・イベント出演、大学・文化施設での講演、ワークショップ、取材・企画のご相談はメールでお問い合わせください。'
      )
      .replaceAll(
        'For performances, talks at cultural venues, workshops, media and collaborations, please get in touch by email.',
        'For performances, talks at universities and cultural venues, workshops, media and collaborations, please get in touch by email.'
      );

    html = html.replace(
      '<a class="brand" href="#top"><b>旭堂 南不二</b><small>KYOKUDO MINAMIFUJI</small></a>',
      `<a class="brand brand-logo" href="#top" aria-label="旭堂南不二 ホーム"><img src="${LOGO_URL}" alt="講談師 旭堂南不二 kyokudominamifuji.com"></a>`
    );

    const instagramSection = `
  <section class="instagram" id="instagram">
    <div class="wrap">
      <div class="section-head">
        <div><div class="eyebrow">INSTAGRAM</div><h2 data-ja="日々の活動" data-en="From Instagram">日々の活動</h2></div>
        <p data-ja="高座の舞台裏、公演のお知らせ、日々の講談活動をInstagramで発信しています。" data-en="Behind the scenes, performance news and everyday Kōdan activities on Instagram.">高座の舞台裏、公演のお知らせ、日々の講談活動をInstagramで発信しています。</p>
      </div>
      <div class="instagram-card">
        <div><div class="instagram-handle">@373.fuji</div><p data-ja="Instagramの最新投稿を、この場所に自動表示できるよう準備しています。" data-en="This section is being prepared to automatically display the latest Instagram posts.">Instagramの最新投稿を、この場所に自動表示できるよう準備しています。</p></div>
        <a class="instagram-link" href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" data-ja="Instagramを見る ↗" data-en="View Instagram ↗">Instagramを見る ↗</a>
      </div>
    </div>
  </section>`;

    html = html.replace('<section class="contact" id="contact">', instagramSection + '\n<section class="contact" id="contact">');

    const style = `<style id="brand-logo-style">
      .brand-logo{margin-right:auto;display:flex;align-items:center;width:auto!important}
      .brand-logo img{display:block;width:clamp(170px,20vw,260px);height:auto;max-height:48px;object-fit:contain;object-position:left center;filter:drop-shadow(0 1px 4px rgba(0,0,0,.28))}
      .hero h1 ruby{ruby-position:over}
      .hero h1 rt{font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif;font-size:.15em;font-weight:600;letter-spacing:.20em;color:#efe8dc;padding-bottom:.45em}
      .instagram{background:#fffdf8}.instagram-card{display:flex;justify-content:space-between;align-items:center;gap:32px;padding:34px 0;border-top:1px solid var(--ink);border-bottom:1px solid var(--ink)}.instagram-handle{font-family:Georgia,serif;font-size:clamp(1.8rem,4vw,3rem);letter-spacing:.02em;margin-bottom:8px}.instagram-card p{margin:0;color:var(--muted);max-width:680px}.instagram-link{display:inline-block;flex:0 0 auto;border-bottom:1px solid var(--ink);padding-bottom:4px;font-weight:700}
      @media(max-width:850px){.brand-logo img{width:175px;max-height:40px}.nav{gap:14px}.lang{padding:7px 10px;font-size:.78rem}.instagram-card{align-items:flex-start;flex-direction:column}.hero h1 rt{font-size:.17em}}
      @media(max-width:390px){.brand-logo img{width:150px}.lang{font-size:.72rem;padding:6px 8px}}
    </style>`;
    html = html.replace("</head>", style + "\n</head>");

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("cache-control", "public, max-age=60");
    return new Response(html, {status:response.status,statusText:response.statusText,headers});
  }
};
