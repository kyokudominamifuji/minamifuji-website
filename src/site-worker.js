import site from "./final-polish-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    const style = `
<style id="challenge-backstage-style">
  #challenge,#backstage{padding:96px 24px}
  #challenge{background:#171512;color:#f7f2e8}
  #backstage{background:#f7f2e8;color:#1b1a17}
  .cb-wrap{width:min(1120px,100%);margin:0 auto}
  .cb-kicker{margin:0 0 14px;font-family:Georgia,"Times New Roman",serif;font-size:.76rem;letter-spacing:.22em;text-transform:uppercase;color:#b58a50}
  .cb-title{margin:0;font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(2.35rem,6vw,5rem);font-weight:500;line-height:1.15;letter-spacing:.03em}
  .cb-lead{margin:18px 0 0;font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:clamp(1.12rem,2vw,1.55rem);line-height:1.8}
  .cb-rule{width:64px;height:1px;margin:34px 0;background:#b58a50}
  .cb-copy{max-width:700px;margin:0;font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif;font-size:.98rem;line-height:2.05;opacity:.88}
  .challenge-grid,.backstage-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:52px}
  .challenge-card,.backstage-card{min-height:230px;padding:28px;border:1px solid rgba(181,138,80,.46)}
  .challenge-card{background:rgba(255,255,255,.035)}
  .backstage-card{background:rgba(255,255,255,.48);border-color:rgba(27,26,23,.18)}
  .cb-no{display:block;margin-bottom:38px;font-family:Georgia,serif;font-size:.72rem;letter-spacing:.15em;color:#b58a50}
  .challenge-card h3,.backstage-card h3{margin:0 0 12px;font-family:"Yu Mincho","Hiragino Mincho ProN",serif;font-size:1.3rem;font-weight:600;line-height:1.5}
  .challenge-card p,.backstage-card p{margin:0;font-family:"Yu Gothic","Hiragino Kaku Gothic ProN",system-ui,sans-serif;font-size:.9rem;line-height:1.85;opacity:.78}
  .backstage-head{display:grid;grid-template-columns:.75fr 1.25fr;gap:56px;align-items:end}
  .backstage-head .cb-copy{max-width:620px}
  @media(max-width:760px){#challenge,#backstage{padding:72px 20px}.challenge-grid,.backstage-grid{grid-template-columns:1fr}.backstage-head{grid-template-columns:1fr;gap:24px}.challenge-card,.backstage-card{min-height:0}.cb-no{margin-bottom:26px}}
</style>`;

    const sections = `
<section id="challenge" aria-labelledby="challenge-title">
  <div class="cb-wrap">
    <p class="cb-kicker">CHALLENGE</p>
    <h2 id="challenge-title" class="cb-title" data-ja="南不二の挑戦" data-en="Minamifuji's Challenge">南不二の挑戦</h2>
    <p class="cb-lead" data-ja="二つとない一席を、追いかけて。" data-en="In pursuit of a one-of-a-kind performance.">二つとない一席を、追いかけて。</p>
    <div class="cb-rule"></div>
    <p class="cb-copy" data-ja="伝統を大切にしながら、まだ見たことのない講談へ。高座の外にも一歩踏み出し、音楽と出会い、三味線を学び、言葉の壁を越えていく。講談に、まだできることはある。南不二は、今日もその先を探しています。" data-en="Honoring tradition while searching for forms of kōdan not yet seen. Stepping beyond the stage, meeting music, learning shamisen, and crossing language barriers. There is still more kōdan can become. Minamifuji keeps searching for what lies ahead.">伝統を大切にしながら、まだ見たことのない講談へ。高座の外にも一歩踏み出し、音楽と出会い、三味線を学び、言葉の壁を越えていく。講談に、まだできることはある。南不二は、今日もその先を探しています。</p>
    <div class="challenge-grid">
      <article class="challenge-card"><span class="cb-no">01 / MUSIC</span><h3 data-ja="音楽と、語る。" data-en="Storytelling with music.">音楽と、語る。</h3><p data-ja="ピアノなど異なる音と講談が出会ったとき、物語はどう変わるのか。新しい高座の形を試しています。" data-en="What happens when kōdan meets piano and other forms of music? Exploring new shapes for the stage.">ピアノなど異なる音と講談が出会ったとき、物語はどう変わるのか。新しい高座の形を試しています。</p></article>
      <article class="challenge-card"><span class="cb-no">02 / SHAMISEN</span><h3 data-ja="三味線を、学ぶ。" data-en="Learning shamisen.">三味線を、学ぶ。</h3><p data-ja="語り手自身が三味線を奏でる。その一歩ずつの稽古も、二つとない一席へ続く道です。" data-en="The storyteller takes up the shamisen. Each lesson is another step toward a performance unlike any other.">語り手自身が三味線を奏でる。その一歩ずつの稽古も、二つとない一席へ続く道です。</p></article>
      <article class="challenge-card"><span class="cb-no">03 / WORLD</span><h3 data-ja="世界へ、届ける。" data-en="Taking kōdan to the world.">世界へ、届ける。</h3><p data-ja="英語での導入や字幕を通して、講談を知らない人にも物語の入口を。富士の麓から、世界へ。" data-en="Through English introductions and subtitles, opening a doorway into kōdan for new audiences — from the foot of Mt. Fuji to the world.">英語での導入や字幕を通して、講談を知らない人にも物語の入口を。富士の麓から、世界へ。</p></article>
    </div>
  </div>
</section>
<section id="backstage" aria-labelledby="backstage-title">
  <div class="cb-wrap">
    <div class="backstage-head">
      <div><p class="cb-kicker">BACKSTAGE</p><h2 id="backstage-title" class="cb-title">BACKSTAGE</h2><p class="cb-lead" data-ja="高座の、その向こう側。" data-en="Beyond the stage.">高座の、その向こう側。</p></div>
      <p class="cb-copy" data-ja="稽古、本番前、舞台袖、旅先。一席が生まれるまでには、高座からは見えない時間があります。ここでは、その途中にある小さな物語を残していきます。" data-en="Rehearsals, the moments before a performance, the wings, the road. Every story on stage is shaped by unseen hours. Here we keep a record of those smaller stories along the way.">稽古、本番前、舞台袖、旅先。一席が生まれるまでには、高座からは見えない時間があります。ここでは、その途中にある小さな物語を残していきます。</p>
    </div>
    <div class="backstage-grid">
      <article class="backstage-card"><span class="cb-no">SCENE 01</span><h3 data-ja="舞台袖から、学ぶ。" data-en="Learning from the wings.">舞台袖から、学ぶ。</h3><p data-ja="師匠や先輩の高座を見つめる時間も、次の一席をつくる大切な稽古です。" data-en="Watching masters and senior storytellers from the wings is part of the work that shapes the next performance.">師匠や先輩の高座を見つめる時間も、次の一席をつくる大切な稽古です。</p></article>
      <article class="backstage-card"><span class="cb-no">SCENE 02</span><h3 data-ja="一席の前に。" data-en="Before the story begins.">一席の前に。</h3><p data-ja="張り扇、釈台、声、呼吸。本番直前まで続く準備の時間にも、講談師の物語があります。" data-en="The harisen, the shakudai, the voice, the breath. Even the final moments of preparation carry a story of their own.">張り扇、釈台、声、呼吸。本番直前まで続く準備の時間にも、講談師の物語があります。</p></article>
      <article class="backstage-card"><span class="cb-no">SCENE 03</span><h3 data-ja="道の途中を、残す。" data-en="Recording the journey.">道の途中を、残す。</h3><p data-ja="完成した姿だけではなく、迷い、試し、少しずつ前へ進む過程も。南不二の現在地を記録していきます。" data-en="Not only the finished performance, but the experiments, uncertainty and small steps forward — a record of where Minamifuji is now.">完成した姿だけではなく、迷い、試し、少しずつ前へ進む過程も。南不二の現在地を記録していきます。</p></article>
    </div>
  </div>
</section>`;

    if (!html.includes('id="challenge"')) {
      html = html.replace("</head>", `${style}\n</head>`);
      html = html.replace("</main>", `${sections}\n</main>`);
    }

    html = html.replace("</body>", "<!-- unified-site-worker-v1 -->\n</body>");

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("cache-control", "public, max-age=30");
    headers.set("x-site-worker", "unified-site-worker-v1");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
