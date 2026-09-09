export default {
  async fetch() {
    const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="講談師・旭堂南不二（Kyokudo Minamifuji）公式サイト。富士山の南から、講談を世界へ。出演情報、プロフィール、講談紹介、出演依頼。" />
  <title>旭堂南不二 | Kyokudo Minamifuji</title>
  <style>
    :root{
      --ink:#15130f; --paper:#f5efe4; --paper2:#fffdf8; --red:#9f2d26;
      --gold:#b1884f; --muted:#756d62; --line:rgba(21,19,15,.15); --max:1180px;
    }
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;color:var(--ink);background:var(--paper2);font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif;line-height:1.8}
    a{color:inherit;text-decoration:none}
    button{font:inherit}
    .wrap{width:min(var(--max),calc(100% - 40px));margin:auto}
    .serif{font-family:"Yu Mincho","Hiragino Mincho ProN",serif}
    .eyebrow{font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);font-weight:800}
    header{position:fixed;top:0;left:0;right:0;z-index:30;background:linear-gradient(to bottom,rgba(0,0,0,.55),rgba(0,0,0,0));color:#fff}
    .nav{height:82px;display:flex;align-items:center;gap:28px}
    .brand{margin-right:auto;line-height:1.1}
    .brand b{display:block;font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.12rem;letter-spacing:.08em}
    .brand small{display:block;margin-top:6px;font-size:.62rem;letter-spacing:.16em;opacity:.78}
    .navlinks{display:flex;align-items:center;gap:22px;font-size:.84rem}
    .navlinks a,.lang{color:#fff}
    .lang{border:1px solid rgba(255,255,255,.45);background:rgba(0,0,0,.12);padding:8px 12px;border-radius:99px;cursor:pointer}
    .hero{min-height:100svh;position:relative;display:grid;align-items:end;overflow:hidden;background:#111}
    .hero:before{content:"";position:absolute;inset:0;background:url("https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/9DE0020E-0A9D-417A-B768-D430D0992E62.png") center 32%/cover no-repeat;transform:scale(1.01)}
    .hero:after{content:"";position:absolute;inset:0;background:
      linear-gradient(90deg,rgba(7,6,5,.82) 0%,rgba(7,6,5,.50) 38%,rgba(7,6,5,.12) 68%,rgba(7,6,5,.22) 100%),
      linear-gradient(0deg,rgba(7,6,5,.68) 0%,rgba(7,6,5,0) 56%)}
    .hero-inner{position:relative;z-index:2;color:#fff;padding:22vh 0 9vh}
    .hero-kicker{font-size:.76rem;letter-spacing:.18em;font-weight:800;margin-bottom:18px}
    .hero h1{margin:0;font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(3.6rem,8vw,7.4rem);line-height:.95;font-weight:500;letter-spacing:.04em}
    .hero .roman{margin-top:18px;font-family:Georgia,serif;font-size:clamp(1rem,2vw,1.5rem);letter-spacing:.14em;text-transform:uppercase}
    .hero-lead{margin:34px 0 0;font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(1.35rem,2.8vw,2.3rem);letter-spacing:.08em}
    .hero-sub{max-width:620px;margin:14px 0 0;color:#efe8dc;font-size:1rem}
    .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:32px}
    .btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 20px;border:1px solid rgba(255,255,255,.5);font-weight:700;font-size:.87rem;letter-spacing:.04em}
    .btn.primary{background:#fff;color:var(--ink)}
    section{padding:108px 0}
    .section-head{display:grid;grid-template-columns:.75fr 1.25fr;gap:52px;align-items:end;margin-bottom:48px}
    .section-head h2{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(2.4rem,5vw,4.8rem);line-height:1.12;margin:10px 0 0;font-weight:500}
    .section-head p{margin:0;color:var(--muted);max-width:620px}
    .news{background:var(--paper2)}
    .news-list{border-top:1px solid var(--ink)}
    .news-item{display:grid;grid-template-columns:140px 1fr auto;gap:24px;align-items:center;padding:22px 0;border-bottom:1px solid var(--line)}
    .news-date{font-family:Georgia,serif;color:var(--muted)}
    .news-item b{font-weight:700}
    .arrow{font-size:1.3rem}
    .kodan{background:#1d1b17;color:#f7f1e7}
    .kodan .eyebrow{color:#d6b67b}
    .kodan .section-head p{color:#c9c1b7}
    .kodan-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:70px}
    .kodan-copy{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.15rem;line-height:2.05}
    .kodan-card{border:1px solid rgba(255,255,255,.2);padding:34px}
    .kodan-card b{display:block;font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.6rem;margin-bottom:14px}
    .kodan-card p{margin:0;color:#cfc7bc}
    .stage{background:var(--paper)}
    .event{display:grid;grid-template-columns:170px 1fr;gap:42px;padding:42px 0;border-top:1px solid var(--ink);border-bottom:1px solid var(--ink)}
    .date{font-family:Georgia,serif}
    .date .year{font-size:.85rem;color:var(--muted)}
    .date .day{font-size:4rem;line-height:1}
    .event h3{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(1.8rem,3vw,2.8rem);margin:0 0 10px}
    .tagline{font-size:1.05rem;margin:0 0 20px}
    .facts{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:24px 0}
    .fact small{display:block;color:var(--muted);font-size:.68rem;letter-spacing:.1em}
    .fact b{font-size:.9rem}
    .reserve{display:inline-block;margin-top:18px;border-bottom:1px solid var(--ink);font-weight:700}
    .profile{background:var(--paper2)}
    .profile-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:72px;align-items:start}
    .portrait{min-height:520px;background:url("https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/9DE0020E-0A9D-417A-B768-D430D0992E62.png") center 24%/cover no-repeat;position:relative}
    .portrait:after{content:"不二";position:absolute;right:18px;bottom:-12px;color:rgba(255,255,255,.92);font-family:"Yu Mincho",serif;font-size:7rem;line-height:1}
    .profile-copy{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.06rem}
    .profile-copy p{margin-top:0;margin-bottom:22px}
    .profile-copy .big{font-size:1.35rem;line-height:1.9}
    .repertoire{margin-top:34px;padding-top:24px;border-top:1px solid var(--line)}
    .repertoire small{display:block;color:var(--muted);letter-spacing:.13em;margin-bottom:8px}
    .contact{background:var(--red);color:#fff}
    .contact .eyebrow{color:#f0d5ae}
    .contact-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:end}
    .contact h2{font-family:"Yu Mincho",serif;font-size:clamp(3rem,7vw,6rem);line-height:1.05;margin:12px 0 24px}
    .contact p{color:#f6e5e1;max-width:620px}
    .mail{display:inline-block;margin-top:18px;font-family:Georgia,serif;font-size:1.25rem;border-bottom:1px solid rgba(255,255,255,.8)}
    .closing{font-family:"Yu Mincho",serif;font-size:1.45rem;line-height:1.8;text-align:right}
    footer{background:#11100d;color:#cfc7bc;padding:28px 0}
    .foot{display:flex;justify-content:space-between;gap:20px;font-size:.73rem}
    @media(max-width:850px){
      .nav{height:68px}.navlinks a{display:none}
      .hero-inner{padding:18vh 0 7vh}
      .hero:before{background-position:58% center}
      .hero:after{background:linear-gradient(0deg,rgba(7,6,5,.82) 0%,rgba(7,6,5,.18) 62%,rgba(7,6,5,.18) 100%)}
      .section-head,.kodan-grid,.profile-grid,.contact-grid{grid-template-columns:1fr}
      .section-head{gap:18px}
      .event{grid-template-columns:1fr}
      .facts{grid-template-columns:1fr}
      .portrait{min-height:420px}
      .closing{text-align:left}
      section{padding:78px 0}
    }
    @media(max-width:560px){
      .wrap{width:min(var(--max),calc(100% - 28px))}
      .hero h1{font-size:3.55rem}
      .news-item{grid-template-columns:1fr auto}
      .news-date{grid-column:1/-1}
      .portrait{min-height:360px}
      .foot{flex-direction:column}
      .brand small{display:none}
    }
  </style>
</head>
<body>
<header>
  <div class="wrap nav">
    <a class="brand" href="#top"><b>旭堂 南不二</b><small>KYOKUDO MINAMIFUJI</small></a>
    <nav class="navlinks" aria-label="main navigation">
      <a href="#news" data-ja="お知らせ" data-en="News">お知らせ</a>
      <a href="#stage" data-ja="出演情報" data-en="Schedule">出演情報</a>
      <a href="#about" data-ja="プロフィール" data-en="Profile">プロフィール</a>
      <a href="#contact" data-ja="ご依頼" data-en="Contact">ご依頼</a>
      <button class="lang" id="langBtn" type="button">日本語 / English</button>
    </nav>
  </div>
</header>

<main id="top">
  <section class="hero">
    <div class="wrap hero-inner">
      <div class="hero-kicker" data-ja="講談師 ／ 旭堂南不二" data-en="KŌDAN STORYTELLER / KYOKUDO MINAMIFUJI">講談師 ／ 旭堂南不二</div>
      <h1>旭堂南不二</h1>
      <div class="roman">Kyokudo Minamifuji</div>
      <p class="hero-lead" data-ja="二つとない講談を。" data-en="One-of-a-kind Kōdan.">二つとない講談を。</p>
      <p class="hero-sub" data-ja="語り継がれる物語を、今を生きるあなたへ。富士山の南から、世界へ。" data-en="Stories handed down through generations, retold for people living today. From the south of Mt. Fuji to the world.">語り継がれる物語を、今を生きるあなたへ。富士山の南から、世界へ。</p>
      <div class="actions">
        <a class="btn primary" href="#stage" data-ja="出演情報を見る" data-en="View Schedule">出演情報を見る</a>
        <a class="btn" href="#about" data-ja="南不二について" data-en="About Minamifuji">南不二について</a>
      </div>
    </div>
  </section>

  <section class="news" id="news">
    <div class="wrap">
      <div class="section-head">
        <div><div class="eyebrow">NEWS</div><h2 data-ja="お知らせ" data-en="Latest News">お知らせ</h2></div>
        <p data-ja="公演情報、動画、講談活動のお知らせをこちらで更新していきます。" data-en="Updates on performances, videos and Kōdan activities will appear here.">公演情報、動画、講談活動のお知らせをこちらで更新していきます。</p>
      </div>
      <div class="news-list">
        <div class="news-item"><div class="news-date">2026.09</div><b data-ja="公式サイト kyokudominamifuji.com を公開しました。" data-en="Official website kyokudominamifuji.com is now live.">公式サイト kyokudominamifuji.com を公開しました。</b><span class="arrow">→</span></div>
        <div class="news-item"><div class="news-date">2026.11.01</div><b data-ja="旭堂南不二・佐藤さくら子 二人会を開催します。" data-en="Kyokudo Minamifuji & Sakurako Sato live performance.">旭堂南不二・佐藤さくら子 二人会を開催します。</b><span class="arrow">→</span></div>
      </div>
    </div>
  </section>

  <section class="kodan" id="kodan">
    <div class="wrap">
      <div class="section-head">
        <div><div class="eyebrow">THE ART OF KŌDAN</div><h2 data-ja="ひとりの語りで、\n物語が動き出す。" data-en="One voice,\nand the story comes alive.">ひとりの語りで、<br>物語が動き出す。</h2></div>
        <p data-ja="張り扇と釈台、そして声。シンプルだからこそ、想像の世界が大きく広がります。" data-en="A folding fan, a lectern and a voice. With only a few tools, an entire world opens in the listener's imagination.">張り扇と釈台、そして声。シンプルだからこそ、想像の世界が大きく広がります。</p>
      </div>
      <div class="kodan-grid">
        <div class="kodan-copy" data-ja="講談は、張り扇で釈台を打ちながら、調子よく物語を語る日本の伝統芸能。歴史の英雄も、町に暮らす人々も、語りの中で生き生きと動き出します。知識がなくても、初めてでも。笑いあり、人情ありの一席を気軽にお楽しみください。" data-en="Kōdan is a traditional Japanese storytelling art. The performer strikes a lectern with a harisen fan and brings heroes, ordinary people, humor and humanity vividly to life. No prior knowledge is needed — just enjoy the story.">講談は、張り扇で釈台を打ちながら、調子よく物語を語る日本の伝統芸能。歴史の英雄も、町に暮らす人々も、語りの中で生き生きと動き出します。知識がなくても、初めてでも。笑いあり、人情ありの一席を気軽にお楽しみください。</div>
        <div class="kodan-card"><div class="eyebrow">ONE AND ONLY</div><b data-ja="「不二」＝ 二つとない。" data-en="“Fuji” is written 不二 — “there is no second.”">「不二」＝ 二つとない。</b><p data-ja="富士山の南から生まれた名と、“唯一無二”への思い。南不二の講談の核です。" data-en="A name born south of Mt. Fuji, carrying the idea of being one and only.">富士山の南から生まれた名と、“唯一無二”への思い。南不二の講談の核です。</p></div>
      </div>
    </div>
  </section>

  <section class="stage" id="stage">
    <div class="wrap">
      <div class="section-head">
        <div><div class="eyebrow">ON STAGE</div><h2 data-ja="出演情報" data-en="Schedule">出演情報</h2></div>
        <p data-ja="現在の主催公演を中心に掲載しています。" data-en="Upcoming featured performances are listed here.">現在の主催公演を中心に掲載しています。</p>
      </div>
      <article class="event">
        <div class="date"><div class="year">2026</div><div class="day">11.01</div><div class="dow">SUNDAY</div></div>
        <div>
          <div class="eyebrow" data-ja="講談 × 三味線 ／ 静岡・富士" data-en="KŌDAN × SHAMISEN / FUJI, SHIZUOKA">講談 × 三味線 ／ 静岡・富士</div>
          <h3>旭堂南不二・佐藤さくら子 二人会</h3>
          <p class="tagline" data-ja="声と糸が、物語を紡ぐ。" data-en="Voice and strings weave a story.">声と糸が、物語を紡ぐ。</p>
          <div class="facts">
            <div class="fact"><small data-ja="会場" data-en="VENUE">会場</small><b>居酒屋ポチ · 静岡県富士市吉原4丁目10-48</b></div>
            <div class="fact"><small data-ja="時間" data-en="TIME">時間</small><b>16:00開場 ／ 16:15開演 ／ 18:00頃終演</b></div>
            <div class="fact"><small data-ja="料金" data-en="TICKETS">料金</small><b>前売3,000円 ／ 当日3,500円 · ワンドリンク付</b></div>
          </div>
          <a class="reserve" href="mailto:373fuji@gmail.com?subject=11%2F1%E4%BA%8C%E4%BA%BA%E4%BC%9A%E4%BA%88%E7%B4%84" data-ja="ご予約はこちら ↗" data-en="Booking inquiry ↗">ご予約はこちら ↗</a>
        </div>
      </article>
    </div>
  </section>

  <section class="profile" id="about">
    <div class="wrap">
      <div class="section-head">
        <div><div class="eyebrow">THE STORYTELLER</div><h2 data-ja="旭堂 南不二" data-en="Kyokudo Minamifuji">旭堂 南不二</h2></div>
        <p data-ja="一席一会。二つとない講談を届ける講談師。" data-en="A Kōdan storyteller creating one-of-a-kind performances.">高座で語り、大学でも講談を教える講談師。</p>
      </div>
      <div class="profile-grid">
        <div class="portrait" aria-label="旭堂南不二"></div>
        <div class="profile-copy">
          <p class="big" data-ja="静岡県富士市を拠点に活動する講談師。旭堂南左衛門に師事。上方講談協会所属。" data-en="A Kōdan storyteller based in Fuji City, Shizuoka. Disciple of Kyokudo Nanzaemon and a member of the Kamigata Kodan Association.">静岡県富士市を拠点に活動する講談師。旭堂南左衛門に師事。上方講談協会所属。</p>
          <p data-ja="一席一会。その日のお客さん、その場の笑い、その場の空気。同じ演目でも、語りは毎回変わります。いまを生きる人に届く言葉で、聴く人の明日が少し明るくなるような一席を目指しています。" data-en="Every performance is a once-only encounter. The audience, laughter and atmosphere make each telling different. Minamifuji aims to bring inherited stories to people living today, with performances that leave tomorrow a little brighter.">一席一会。その日のお客さん、その場の笑い、その場の空気。同じ演目でも、語りは毎回変わります。いまを生きる人に届く言葉で、聴く人の明日が少し明るくなるような一席を目指しています。</p>
          <p data-ja="講談会やイベントでの高座に加え、講演やワークショップにも取り組んでいます。世界に向けては、英語での導入と日本語の講談、英語字幕による発信も準備しています。" data-en="Alongside Kōdan performances, he offers talks and workshops. For international audiences, he is developing performances with English introductions, Japanese Kōdan and English subtitles.">高座だけでなく、大学で講談を教え、講演やワークショップにも取り組んでいます。世界に向けては、英語での導入と日本語の講談、英語字幕による発信も準備しています。</p>
          <div class="repertoire"><small data-ja="主な演目" data-en="SELECTED STORIES">主な演目</small><p>秀吉の初陣 ／ 秀吉と易者 ／ 黒田節の由来 ／ 左甚五郎・掛川の宿</p></div>
        </div>
      </div>
    </div>
  </section>

  <section class="contact" id="contact">
    <div class="wrap contact-grid">
      <div>
        <div class="eyebrow">GET IN TOUCH</div>
        <h2 data-ja="あなたの街にも、\n講談を。" data-en="Bring Kōdan\nto your audience.">あなたの街にも、<br>講談を。</h2>
        <p data-ja="講談会・イベント出演、文化施設などでの講演、ワークショップ、取材・企画のご相談はメールでお問い合わせください。" data-en="For performances, talks at cultural venues, workshops, media and collaborations, please get in touch by email.">講談会・イベント出演、大学・文化施設での講演、ワークショップ、取材・企画のご相談はメールでお問い合わせください。</p>
        <a class="mail" href="mailto:373fuji@gmail.com">373fuji@gmail.com</a>
      </div>
      <div class="closing" data-ja="この日、この場所、この一席。\nあなたの明日を変えていく。" data-en="This day, this place, this story —\nperhaps the start of a different tomorrow.">この日、この場所、この一席。<br>あなたの明日を変えていく。</div>
    </div>
  </section>
</main>

<footer><div class="wrap foot"><span>© 2026 Kyokudo Minamifuji</span><span>kyokudominamifuji.com</span></div></footer>

<script>
(function(){
  var btn=document.getElementById('langBtn'), english=false;
  btn.addEventListener('click',function(){
    english=!english;
    document.documentElement.lang=english?'en':'ja';
    document.querySelectorAll('[data-ja]').forEach(function(el){
      var text=english?el.getAttribute('data-en'):el.getAttribute('data-ja');
      if(text.indexOf('\\n')>=0){el.innerHTML=text.split('\\n').join('<br>');}
      else{el.textContent=text;}
    });
    btn.textContent=english?'English / 日本語':'日本語 / English';
  });
})();
</script>
</body>
</html>`;
    return new Response(html,{headers:{"content-type":"text/html; charset=UTF-8","cache-control":"public, max-age=120"}});
  }
};
