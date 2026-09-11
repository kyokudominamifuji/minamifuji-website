import site from "./challenge-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    // Final production fix: the live page still contains the older .title-list
    // repertoire markup. Replace those lists in the HTML response itself so
    // the browser receives the finished design, matching the Taikoki section.
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

    html = html.replace("</body>", "<!-- unified-site-worker-v4 -->\n</body>");

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("cache-control", "no-store, no-cache, must-revalidate, max-age=0");
    headers.set("pragma", "no-cache");
    headers.set("expires", "0");
    headers.set("x-site-worker", "unified-site-worker-v4");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
