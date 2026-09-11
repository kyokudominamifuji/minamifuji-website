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

    // The live HTML uses .title-list in the older repertoire layout.
    // Replace those lists server-side so the delivered HTML itself is correct.
    html = html.replace(
      /<p class="title-(?:list|line)">「難波戦記の発端」[\s\S]*?<\/p>/,
      `<div class="story"><h5>「難波戦記の発端」</h5><p data-ja="豊臣と徳川、二つの大きな力が向き合い、大坂の陣へ。天下を揺るがす戦いの幕開けを描きます。" data-en="Toyotomi and Tokugawa face one another as the story moves toward the Siege of Osaka — the opening of a conflict that will shake the realm.">豊臣と徳川、二つの大きな力が向き合い、大坂の陣へ。天下を揺るがす戦いの幕開けを描きます。</p></div>
      <div class="story"><h5>「般若寺の焼討ち」</h5><p data-ja="戦乱の中で交錯する策と覚悟。緊迫した場面を、講談ならではのテンポで描く一席です。" data-en="Strategy and resolve collide amid the turmoil of war, unfolding with the tension and rhythm unique to Kodan.">戦乱の中で交錯する策と覚悟。緊迫した場面を、講談ならではのテンポで描く一席です。</p></div>
      <div class="story"><h5>「平野の地雷火」</h5><p data-ja="敵を迎え撃つための奇策をめぐり、知恵と度胸がぶつかる。息をのむ展開が続く一席です。" data-en="A daring stratagem to meet the enemy brings wit and courage into sharp conflict in a story full of suspense.">敵を迎え撃つための奇策をめぐり、知恵と度胸がぶつかる。息をのむ展開が続く一席です。</p></div>
      <div class="story"><h5>「結城中納言秀康の毒死」</h5><p data-ja="徳川家康の次男・結城秀康をめぐる毒死の伝承。武将の生き方と、その運命に迫ります。" data-en="A tale built around the poison-death legend of Yuki Hideyasu, the second son of Tokugawa Ieyasu, exploring a warrior's life and fate.">徳川家康の次男・結城秀康をめぐる毒死の伝承。武将の生き方と、その運命に迫ります。</p></div>`
    );

    html = html.replace(
      /<p class="title-(?:list|line)">「狩野探幽との出会い」[\s\S]*?<\/p>|<p class="title-(?:list|line)">「猫餅の由来」[\s\S]*?<\/p>/,
      `<div class="story"><h5>「狩野探幽との出会い」</h5><p data-ja="天才彫刻師・左甚五郎と、名絵師・狩野探幽。二人の才能が出会う場面を描く物語です。" data-en="Legendary sculptor Hidari Jingoro meets celebrated painter Kano Tanyu — a story about the encounter of two extraordinary talents.">天才彫刻師・左甚五郎と、名絵師・狩野探幽。二人の才能が出会う場面を描く物語です。</p></div>
      <div class="story"><h5>「猫餅の由来」</h5><p data-ja="左甚五郎らしい機転と洒落、人情が詰まった一席。不思議な『猫餅』の由来をお楽しみください。" data-en="A warm and witty tale filled with Jingoro's quick thinking, humor and humanity, revealing the curious origin of Nekomochi.">左甚五郎らしい機転と洒落、人情が詰まった一席。不思議な「猫餅」の由来をお楽しみください。</p></div>`
    );

    html = html.replace(
      /<p class="title-(?:list|line)">「長屋の出世」[\s\S]*?<\/p>/,
      `<div class="story"><h5>「長屋の出世」</h5><p data-ja="長屋に暮らす人々の中から始まる、思いがけない出世物語。笑いの中に、人の縁のおもしろさが光ります。" data-en="An unexpected rise begins among ordinary tenement residents, with humor revealing the surprising power of human connections.">長屋に暮らす人々の中から始まる、思いがけない出世物語。笑いの中に、人の縁のおもしろさが光ります。</p></div>
      <div class="story"><h5>「黄門と農業」</h5><p data-ja="諸国を巡る黄門さまが、農業を通して人々の暮らしと向き合う物語。知恵と人情を味わう一席です。" data-en="Mito Komon encounters people's everyday lives through farming — a story rich in practical wisdom and humanity.">諸国を巡る黄門さまが、農業を通して人々の暮らしと向き合う物語。知恵と人情を味わう一席です。</p></div>
      <div class="story"><h5>「牛盗人」</h5><p data-ja="牛をめぐって巻き起こるひと騒動。笑いと人情の中に、黄門漫遊記らしい知恵と機転が光ります。" data-en="A commotion over a stolen cow brings out the wit, warmth and quick thinking that make the Mito Komon tales so enjoyable.">牛をめぐって巻き起こるひと騒動。笑いと人情の中に、黄門漫遊記らしい知恵と機転が光ります。</p></div>`
    );

    // Client-side backup for either old class name, in case a cached upstream variant survives.
    const repertoireFixScript = `
<script id="repertoire-live-fix-v3">
(function(){
  var targets = document.querySelectorAll('#repertoire .title-list, #repertoire .title-line');
  targets.forEach(function(node){
    var text=(node.textContent||'').replace(/\\s+/g,'');
    if(text.indexOf('難波戦記の発端')!==-1){node.outerHTML='${`<div class="story"><h5>「難波戦記の発端」</h5><p>豊臣と徳川、二つの大きな力が向き合い、大坂の陣へ。天下を揺るがす戦いの幕開けを描きます。</p></div><div class="story"><h5>「般若寺の焼討ち」</h5><p>戦乱の中で交錯する策と覚悟。緊迫した場面を、講談ならではのテンポで描く一席です。</p></div><div class="story"><h5>「平野の地雷火」</h5><p>敵を迎え撃つための奇策をめぐり、知恵と度胸がぶつかる。息をのむ展開が続く一席です。</p></div><div class="story"><h5>「結城中納言秀康の毒死」</h5><p>徳川家康の次男・結城秀康をめぐる毒死の伝承。武将の生き方と、その運命に迫ります。</p></div>`}'.replace(/'/g,"\\'");}
    else if(text.indexOf('狩野探幽との出会い')!==-1||text.indexOf('猫餅の由来')!==-1){node.outerHTML='${`<div class="story"><h5>「狩野探幽との出会い」</h5><p>天才彫刻師・左甚五郎と、名絵師・狩野探幽。二人の才能が出会う場面を描く物語です。</p></div><div class="story"><h5>「猫餅の由来」</h5><p>左甚五郎らしい機転と洒落、人情が詰まった一席。不思議な「猫餅」の由来をお楽しみください。</p></div>`}'.replace(/'/g,"\\'");}
    else if(text.indexOf('長屋の出世')!==-1){node.outerHTML='${`<div class="story"><h5>「長屋の出世」</h5><p>長屋に暮らす人々の中から始まる、思いがけない出世物語。笑いの中に、人の縁のおもしろさが光ります。</p></div><div class="story"><h5>「黄門と農業」</h5><p>諸国を巡る黄門さまが、農業を通して人々の暮らしと向き合う物語。知恵と人情を味わう一席です。</p></div><div class="story"><h5>「牛盗人」</h5><p>牛をめぐって巻き起こるひと騒動。笑いと人情の中に、黄門漫遊記らしい知恵と機転が光ります。</p></div>`}'.replace(/'/g,"\\'");}
  });
})();
</script>`;

    html = html.replace("</body>", repertoireFixScript + "\n<!-- unified-site-worker-v3 -->\n</body>");

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("cache-control", "no-store, no-cache, must-revalidate, max-age=0");
    headers.set("pragma", "no-cache");
    headers.set("expires", "0");
    headers.set("x-site-worker", "unified-site-worker-v3");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
