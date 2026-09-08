export default {
  async fetch() {
    const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="講談師・旭堂南不二の公式ウェブサイト。出演予定、プロフィール、講談の魅力、出演依頼・お問い合わせ。" />
  <title>旭堂南不二 | Kyokudo Minamifuji</title>
  <style>
    :root {
      --ink:#181713; --paper:#f6f0e6; --paper2:#fffdf8; --red:#a62b28;
      --gold:#a77c42; --muted:#746d62; --line:rgba(24,23,19,.14); --max:1180px;
    }
    *{box-sizing:border-box} html{scroll-behavior:smooth} body{margin:0;color:var(--ink);background:var(--paper2);font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif;line-height:1.8}
    a{color:inherit;text-decoration:none} button{font:inherit} .wrap{width:min(var(--max),calc(100% - 40px));margin:auto}
    .serif{font-family:"Yu Mincho","Hiragino Mincho ProN",serif}.eyebrow{font-size:.72rem;letter-spacing:.23em;text-transform:uppercase;color:var(--gold);font-weight:700}.rule{height:1px;background:var(--line)}
    header{position:sticky;top:0;z-index:20;background:rgba(255,253,248,.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}
    .nav{height:82px;display:flex;align-items:center;gap:28px}.brand{margin-right:auto;line-height:1.15}.brand b{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.1rem}.brand small{display:block;margin-top:5px;font-size:.62rem;letter-spacing:.16em;color:var(--muted)}
    .navlinks{display:flex;align-items:center;gap:24px;font-size:.84rem}.navlinks a:hover{color:var(--red)}.lang{border:1px solid var(--line);background:transparent;padding:8px 11px;border-radius:99px;cursor:pointer;font-size:.75rem}.lang:hover{background:var(--paper)}
    .hero{min-height:calc(100vh - 82px);display:grid;align-items:center;background:linear-gradient(110deg,var(--paper2) 0 58%,var(--paper) 58%);overflow:hidden;position:relative}.hero:before{content:"";position:absolute;right:-3vw;bottom:-13vw;width:50vw;height:31vw;background:linear-gradient(145deg,transparent 49.6%,rgba(40,72,93,.08) 50% 64%,transparent 64.4%);transform:skewX(-8deg)}
    .hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:72px;align-items:center;padding:92px 0}.hero-copy{position:relative;z-index:2}.hero-tag{font-size:.8rem;letter-spacing:.16em;color:var(--red);font-weight:700;margin-bottom:24px}.hero h1{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(3.3rem,8vw,7.4rem);line-height:.96;letter-spacing:.03em;margin:0}.hero .roman{margin-top:16px;font-family:Georgia,serif;letter-spacing:.11em;text-transform:uppercase;color:var(--muted);font-size:.82rem}.hero-lead{margin:42px 0 0;font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(1.25rem,2.3vw,2rem);line-height:1.65}.hero-sub{max-width:620px;margin:18px 0 0;color:#504b43}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:36px}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border:1px solid var(--ink);font-weight:700;font-size:.86rem;letter-spacing:.04em}.btn.primary{background:var(--ink);color:#fff}.btn:hover{transform:translateY(-1px)}
    .hero-art{position:relative;min-height:520px;display:grid;place-items:center}.enso{width:min(390px,75vw);aspect-ratio:1;border:2px solid rgba(166,43,40,.42);border-radius:50%;position:absolute}.fan{width:min(360px,70vw);aspect-ratio:1.35;background:linear-gradient(132deg,#25231f 0 2%,transparent 2% 9%,#25231f 9% 10%,transparent 10% 17%,#25231f 17% 18%,transparent 18% 25%,#25231f 25% 26%,transparent 26%),linear-gradient(180deg,#d6b77e,#f1e6cf);clip-path:polygon(50% 100%,0 18%,18% 4%,50% 0,82% 4%,100% 18%);transform:rotate(-7deg);filter:drop-shadow(0 24px 35px rgba(34,24,10,.14));position:relative}.fan:after{content:"講";font-family:"Yu Mincho",serif;font-size:7rem;color:rgba(96,45,32,.45);position:absolute;inset:0;display:grid;place-items:center;padding-bottom:14%}
    section{padding:110px 0}.section-head{display:grid;grid-template-columns:.6fr 1.4fr;gap:48px;align-items:end;margin-bottom:56px}.section-head h2{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(2.2rem,5vw,4.6rem);line-height:1.16;margin:8px 0 0}.section-head p{margin:0;color:var(--muted);max-width:600px}
    .kodan{background:#20201d;color:#f6f0e6}.kodan .eyebrow{color:#d7b477}.kodan .section-head p{color:#c8c2b8}.kodan-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:72px}.kodan-copy{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.16rem;line-height:2.15}.kodan-card{border:1px solid rgba(255,255,255,.18);padding:34px;align-self:start}.kodan-card b{display:block;font-size:1.4rem;margin-bottom:12px}.kodan-card p{color:#cbc4b9;margin:0}
    .stage{background:var(--paper)}.event{display:grid;grid-template-columns:180px 1fr;gap:42px;border-top:1px solid var(--ink);border-bottom:1px solid var(--ink);padding:42px 0}.date{font-family:Georgia,serif}.date .year{font-size:.9rem;color:var(--muted)}.date .day{font-size:4rem;line-height:1}.date .dow{font-size:.8rem;letter-spacing:.12em}.event h3{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(1.7rem,3vw,2.7rem);margin:0 0 12px}.event .tagline{font-size:1.08rem;margin:0 0 24px}.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:26px 0}.fact small{display:block;color:var(--muted);font-size:.7rem;letter-spacing:.12em;margin-bottom:4px}.fact b{font-size:.92rem}.note{color:var(--muted);font-size:.82rem}.reserve{margin-top:24px;display:inline-flex;gap:8px;align-items:center;font-weight:700;border-bottom:1px solid var(--ink);padding-bottom:4px}
    .profile-grid{display:grid;grid-template-columns:.75fr 1.25fr;gap:80px}.name-card{background:var(--ink);color:#fff;min-height:440px;padding:48px;display:flex;flex-direction:column;justify-content:flex-end;position:relative;overflow:hidden}.name-card:before{content:"不二";position:absolute;right:-20px;top:-20px;font-family:"Yu Mincho",serif;font-size:12rem;color:rgba(255,255,255,.05);line-height:1}.name-card .jp{font-family:"Yu Mincho",serif;font-size:2.7rem}.name-card .en{font-family:Georgia,serif;letter-spacing:.08em;color:#d0c8bb}.profile-copy{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.07rem}.profile-copy p{margin-top:0;margin-bottom:24px}.repertoire{margin-top:38px;padding-top:26px;border-top:1px solid var(--line)}.repertoire small{display:block;color:var(--muted);letter-spacing:.15em;margin-bottom:10px}.repertoire p{font-family:"Yu Gothic",sans-serif;font-size:.88rem;line-height:1.9}
    .contact{background:#a62b28;color:#fff}.contact .eyebrow{color:#f2d6b2}.contact-grid{display:grid;grid-template-columns:1.25fr .75fr;gap:60px;align-items:end}.contact h2{font-family:"Yu Mincho",serif;font-size:clamp(3rem,7vw,6.2rem);line-height:1.08;margin:12px 0 24px}.contact p{max-width:640px;color:#f8e9e5}.mail{display:inline-block;margin-top:20px;font-family:Georgia,serif;font-size:clamp(1.05rem,2.4vw,1.55rem);border-bottom:1px solid rgba(255,255,255,.7)}.closing{font-family:"Yu Mincho",serif;font-size:1.55rem;line-height:1.8;text-align:right}
    footer{background:#171713;color:#ddd5ca;padding:28px 0}.foot{display:flex;justify-content:space-between;gap:20px;align-items:center;font-size:.73rem}.toplink{color:#fff}
    @media(max-width:850px){.nav{height:68px}.navlinks a{display:none}.hero{min-height:auto;background:var(--paper2)}.hero-grid,.section-head,.kodan-grid,.profile-grid,.contact-grid{grid-template-columns:1fr}.hero-grid{padding:70px 0 40px;gap:20px}.hero-art{min-height:340px}.section-head{gap:18px}.event{grid-template-columns:1fr}.facts{grid-template-columns:1fr}.profile-grid{gap:28px}.name-card{min-height:330px}.closing{text-align:left}.contact-grid{gap:30px}section{padding:78px 0}}
    @media(max-width:520px){.wrap{width:min(100% - 28px,var(--max))}.brand small{display:none}.hero h1{font-size:3.65rem}.hero-lead{font-size:1.22rem}.fan:after{font-size:5rem}.event{padding:30px 0}.name-card{padding:32px}.foot{align-items:flex-start;flex-direction:column}}
  </style>
</head>
<body>
<header>
  <div class="wrap nav">
    <a class="brand" href="#top"><b>旭堂 南不二</b><small>KYOKUDO MINAMIFUJI</small></a>
    <nav class="navlinks" aria-label="main navigation">
      <a href="#stage" data-ja="出演予定" data-en="Schedule">出演予定</a>
      <a href="#about" data-ja="南不二について" data-en="About">南不二について</a>
      <a href="#contact" data-ja="お問い合わせ" data-en="Contact">お問い合わせ</a>
      <button class="lang" id="langBtn" type="button">日本語 / English</button>
    </nav>
  </div>
</header>
<main id="top">
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <div class="hero-tag" data-ja="講談師 ／ 旭堂南不二" data-en="Kōdan storyteller / Kyokudo Minamifuji">講談師 ／ 旭堂南不二</div>
        <div class="eyebrow" data-ja="一席一会" data-en="One story. Never the same twice.">一席一会</div>
        <h1>旭堂南不二</h1>
        <div class="roman">Kyokudo Minamifuji</div>
        <p class="hero-lead" data-ja="二つとない講談を！" data-en="Kōdan that can never be repeated exactly the same way.">二つとない講談を！</p>
        <p class="hero-sub" data-ja="語り継がれる物語を、今を生きるあなたへ。聴く人の明日が少し明るくなるような一席を。" data-en="Stories handed down through generations, retold for people living today — with the hope that tomorrow feels a little brighter.">語り継がれる物語を、今を生きるあなたへ。聴く人の明日が少し明るくなるような一席を。</p>
        <div class="actions"><a class="btn primary" href="#stage" data-ja="出演予定・ご予約" data-en="Schedule & Booking">出演予定・ご予約</a><a class="btn" href="#kodan" data-ja="講談の世界へ ↓" data-en="Discover Kōdan ↓">講談の世界へ ↓</a></div>
      </div>
      <div class="hero-art" aria-hidden="true"><div class="enso"></div><div class="fan"></div></div>
    </div>
  </section>

  <section class="kodan" id="kodan">
    <div class="wrap">
      <div class="section-head"><div><div class="eyebrow">THE ART OF KŌDAN</div><h2 data-ja="ひとりの語りで、\n物語が動き出す。" data-en="One voice,\nand the story comes alive.">ひとりの語りで、<br>物語が動き出す。</h2></div><p data-ja="張り扇と釈台、そして声。シンプルだからこそ、想像の世界が大きく広がります。" data-en="A folding fan, a lectern, and a voice. With only a few tools, an entire world opens in the listener's imagination.">張り扇と釈台、そして声。シンプルだからこそ、想像の世界が大きく広がります。</p></div>
      <div class="kodan-grid">
        <div class="kodan-copy" data-ja="講談は、張り扇で釈台を打ちながら、調子よく物語を語る日本の伝統芸能。歴史の英雄も、町に暮らす人々も、語りの中で生き生きと動き出します。知識がなくても、初めてでも。笑いあり、人情ありの物語を、どうぞ気軽にお楽しみください。" data-en="Kōdan is a traditional Japanese storytelling art. The performer strikes a lectern with a harisen fan and brings heroes, ordinary townspeople, humor and humanity vividly to life. No prior knowledge is needed — just come and enjoy the story.">講談は、張り扇で釈台を打ちながら、調子よく物語を語る日本の伝統芸能。歴史の英雄も、町に暮らす人々も、語りの中で生き生きと動き出します。知識がなくても、初めてでも。笑いあり、人情ありの物語を、どうぞ気軽にお楽しみください。</div>
        <div class="kodan-card"><div class="eyebrow" data-ja="FROM FUJI TO THE WORLD" data-en="FROM FUJI TO THE WORLD">FROM FUJI TO THE WORLD</div><b class="serif" data-ja="富士山の南から、世界へ。" data-en="From the south of Mt. Fuji to the world.">富士山の南から、世界へ。</b><p data-ja="古い物語を、そのまま古いものとして置いておかない。いまを生きる人に届く言葉で語り直します。" data-en="Old stories are not museum pieces. They are retold in words that can reach people living today.">古い物語を、そのまま古いものとして置いておかない。いまを生きる人に届く言葉で語り直します。</p></div>
      </div>
    </div>
  </section>

  <section class="stage" id="stage">
    <div class="wrap">
      <div class="section-head"><div><div class="eyebrow">ON STAGE</div><h2 data-ja="出演予定" data-en="Schedule">出演予定</h2></div><p data-ja="公演言語：日本語。最新の出演情報をこちらでお知らせします。" data-en="Performance language: Japanese. Upcoming appearances will be posted here.">公演言語：日本語。最新の出演情報をこちらでお知らせします。</p></div>
      <article class="event">
        <div class="date"><div class="year">2026</div><div class="day">11.01</div><div class="dow">SUNDAY</div></div>
        <div><div class="eyebrow" data-ja="講談 × 三味線 ／ 静岡・富士" data-en="KŌDAN × SHAMISEN / FUJI, SHIZUOKA">講談 × 三味線 ／ 静岡・富士</div><h3>旭堂南不二・佐藤さくら子 二人会</h3><p class="tagline" data-ja="声と糸が、物語を紡ぐ。講談と三味線が出会う、秋の夕べ。" data-en="Voice and strings weave a story — an autumn evening where kōdan meets shamisen.">声と糸が、物語を紡ぐ。講談と三味線が出会う、秋の夕べ。</p>
          <div class="facts"><div class="fact"><small data-ja="会場" data-en="VENUE">会場</small><b>居酒屋ポチ · 静岡県富士市吉原4丁目10-48</b></div><div class="fact"><small data-ja="時間" data-en="TIME">時間</small><b>16:00開場 ／ 16:15開演 ／ 18:00頃終演</b></div><div class="fact"><small data-ja="料金" data-en="TICKETS">料金</small><b>前売3,000円 ／ 当日3,500円 · ワンドリンク付</b></div></div>
          <div class="note" data-ja="定員70名・全席自由。字幕・通訳などの対応は、ご予約前にお問い合わせください。" data-en="70 seats, general admission. Please contact us before booking if you need subtitles or interpretation support.">定員70名・全席自由。字幕・通訳などの対応は、ご予約前にお問い合わせください。</div>
          <a class="reserve" href="mailto:373fuji@gmail.com?subject=11%2F1%E4%BA%8C%E4%BA%BA%E4%BC%9A%E4%BA%88%E7%B4%84" data-ja="ご予約はこちら ↗" data-en="Booking inquiry ↗">ご予約はこちら ↗</a>
        </div>
      </article>
    </div>
  </section>

  <section id="about">
    <div class="wrap">
      <div class="section-head"><div><div class="eyebrow">THE STORYTELLER</div><h2 data-ja="旭堂 南不二" data-en="Kyokudo Minamifuji">旭堂 南不二</h2></div><p data-ja="一席一会。その日のお客さん、その場の空気とともに、物語を立ち上げます。" data-en="Every performance is a once-only encounter, shaped by the audience and the atmosphere in the room.">一席一会。その日のお客さん、その場の空気とともに、物語を立ち上げます。</p></div>
      <div class="profile-grid"><div class="name-card"><div class="eyebrow">KŌDAN STORYTELLER</div><div class="jp">旭堂 南不二</div><div class="en">Kyokudo Minamifuji</div></div>
        <div class="profile-copy"><p data-ja="静岡県富士市を拠点に活動する講談師。旭堂南左衛門に師事。上方講談協会所属。" data-en="A kōdan storyteller based in Fuji City, Shizuoka. Disciple of Kyokudo Nanzaemon and a member of the Kamigata Kodan Association.">静岡県富士市を拠点に活動する講談師。旭堂南左衛門に師事。上方講談協会所属。</p><p data-ja="一席一会。その日のお客さん、その場の笑い、会場の空気。同じ演目でも、語りは毎回変わります。いまを生きる人に届く言葉で、聴く人の明日が少し明るくなるような一席を。富士山の南から、世界へ届けたいと思っています。" data-en="The audience, the laughter, the atmosphere — even the same story changes every time. I want to tell inherited stories in words that reach people today, and carry them from the south of Mt. Fuji to the world.">一席一会。その日のお客さん、その場の笑い、会場の空気。同じ演目でも、語りは毎回変わります。いまを生きる人に届く言葉で、聴く人の明日が少し明るくなるような一席を。富士山の南から、世界へ届けたいと思っています。</p>
          <div class="repertoire"><small data-ja="主な演目" data-en="SELECTED STORIES">主な演目</small><p>秀吉の初陣 ／ 秀吉と易者 ／ 黒田節の由来 ／ 左甚五郎・掛川の宿</p></div></div>
      </div>
    </div>
  </section>

  <section class="contact" id="contact">
    <div class="wrap contact-grid"><div><div class="eyebrow">GET IN TOUCH</div><h2 data-ja="あなたの街にも、\n講談を。" data-en="Bring kōdan\nto your town.">あなたの街にも、<br>講談を。</h2><p data-ja="講談会・イベントへの出演依頼、公演についてのご質問は、メールでお気軽にお問い合わせください。" data-en="For performance requests, events, or questions about kōdan, please feel free to get in touch by email.">講談会・イベントへの出演依頼、公演についてのご質問は、メールでお気軽にお問い合わせください。</p><a class="mail" href="mailto:373fuji@gmail.com">373fuji@gmail.com</a></div><div class="closing" data-ja="この日、この場所、この一席。\nあなたの明日を変えていく。" data-en="This day, this place, this story —\nperhaps the start of a different tomorrow.">この日、この場所、この一席。<br>あなたの明日を変えていく。</div></div>
  </section>
</main>
<footer><div class="wrap foot"><span>© 2026 Kyokudo Minamifuji</span><a class="toplink" href="#top" data-ja="ページの先頭へ ↑" data-en="Back to top ↑">ページの先頭へ ↑</a></div></footer>
<script>
(function(){
  var btn=document.getElementById('langBtn'); var english=false;
  btn.addEventListener('click',function(){
    english=!english; document.documentElement.lang=english?'en':'ja';
    document.querySelectorAll('[data-ja]').forEach(function(el){
      var text=english?el.getAttribute('data-en'):el.getAttribute('data-ja');
      if(text.indexOf('\\n')>=0){el.innerHTML=text.split('\\n').join('<br>');}else{el.textContent=text;}
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
