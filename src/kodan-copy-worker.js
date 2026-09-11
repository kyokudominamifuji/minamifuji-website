import site from "./type-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    const kodanSection = `
  <section class="kodan" id="kodan">
    <div class="wrap">
      <div class="section-head">
        <div>
          <div class="eyebrow" data-ja="講談とは？" data-en="WHAT IS KŌDAN?">講談とは？</div>
          <h2 data-ja="ひとりの語りで、\n物語が動き出す。" data-en="One voice,\nand the story comes alive.">ひとりの語りで、<br>物語が動き出す。</h2>
        </div>
        <p data-ja="張り扇で釈台を打つ音。そして、たったひとりの声。" data-en="The sound of a harisen striking the lectern — and a single storyteller's voice.">張り扇で釈台を打つ音。<br>そして、たったひとりの声。</p>
      </div>

      <div class="kodan-editorial-grid">
        <div class="kodan-story">
          <p data-ja="講談は、歴史上の英雄や名もなき人々の人生を、語りの力でよみがえらせる日本の伝統話芸です。" data-en="Kōdan is a traditional Japanese storytelling art that brings the lives of historical heroes and ordinary people vividly back to life through the power of narration.">講談は、歴史上の英雄や名もなき人々の人生を、語りの力でよみがえらせる日本の伝統話芸です。</p>

          <p data-ja="もともとは「講釈」と呼ばれ、「講」は、物語を語り伝えること。「釈」は、語り手なりの解釈を加えること。" data-en="It was originally called kōshaku. Kō means to tell and pass on a story; shaku means to add the storyteller's own interpretation.">もともとは「講釈」と呼ばれ、</p>
          <div class="kodan-terms">
            <p><strong>「講」</strong><span data-ja="物語を語り伝えること。" data-en="to tell and pass on a story.">物語を語り伝えること。</span></p>
            <p><strong>「釈」</strong><span data-ja="語り手なりの解釈を加えること。" data-en="to add the storyteller's own interpretation.">語り手なりの解釈を加えること。</span></p>
          </div>

          <p data-ja="つまり講談は、昔の物語をそのまま読む芸ではありません。同じ物語でも、誰が語るかによって、人物の見え方も、笑いも、感動も変わる。" data-en="Kōdan is not simply the reading of an old story. Even with the same tale, the characters, humor and emotion change depending on who tells it.">つまり講談は、昔の物語をそのまま読む芸ではありません。</p>
          <p data-ja="同じ物語でも、誰が語るかによって、人物の見え方も、笑いも、感動も変わる。" data-en="Even the same story changes with the storyteller — how the characters appear, where the laughter falls, and what moves the audience.">同じ物語でも、誰が語るかによって、人物の見え方も、笑いも、感動も変わる。</p>

          <p data-ja="大がかりな舞台装置はありません。けれど、語りが始まれば、そこは戦国の合戦場にも、江戸の宿場町にもなる。" data-en="There are no elaborate stage sets. Yet once the storytelling begins, the space can become a Sengoku battlefield or a post town in Edo-period Japan.">大がかりな舞台装置はありません。<br>けれど、語りが始まれば、そこは戦国の合戦場にも、江戸の宿場町にもなる。</p>

          <p class="kodan-emphasis" data-ja="目の前には何もない。だからこそ、頭の中には何でも描ける。" data-en="There may be nothing in front of your eyes. That is exactly why you can imagine anything.">目の前には何もない。<br>だからこそ、頭の中には何でも描ける。</p>
          <p data-ja="それが、講談のおもしろさです。" data-en="That is the magic of Kōdan.">それが、講談のおもしろさです。</p>
        </div>

        <div class="kodan-minamifuji">
          <div class="eyebrow">MINAMIFUJI'S KŌDAN</div>
          <h3 data-ja="南不二の講談" data-en="Minamifuji's Kōdan">南不二の講談</h3>
          <p class="kodan-catch" data-ja="古典を大切に。でも、古典にとどまらない。" data-en="Honor the classics — without being confined by them.">古典を大切に。<br>でも、古典にとどまらない。</p>

          <p data-ja="旭堂南不二が目指すのは、初めて講談を聴く人にも届く講談です。" data-en="Kyokudo Minamifuji aims to make Kōdan reach people hearing it for the very first time.">旭堂南不二が目指すのは、初めて講談を聴く人にも届く講談です。</p>

          <p data-ja="難しい言葉を並べるのではなく、人物の表情や景色が自然と浮かんでくるように、今を生きる人に届く言葉で語る。" data-en="Rather than filling the story with difficult language, he tells it in words that let today's audience naturally picture the characters' expressions and the world around them.">難しい言葉を並べるのではなく、人物の表情や景色が自然と浮かんでくるように、今を生きる人に届く言葉で語る。</p>

          <p data-ja="笑って、驚いて、ときには胸が熱くなる。そして、古典を受け継ぎながらも、新しい表現にも挑戦していく。" data-en="To laugh, to be surprised, and sometimes to feel your heart stir — while carrying the classics forward and exploring new forms of expression.">笑って、驚いて、ときには胸が熱くなる。</p>
          <p data-ja="そして、古典を受け継ぎながらも、新しい表現にも挑戦していく。" data-en="And while inheriting the classics, he continues to take on new forms of expression.">そして、古典を受け継ぎながらも、新しい表現にも挑戦していく。</p>

          <p data-ja="講談を知らなくても、歴史に詳しくなくても大丈夫。" data-en="You do not need to know Kōdan or be an expert in history.">講談を知らなくても、歴史に詳しくなくても大丈夫。</p>

          <blockquote data-ja="「講談って、こんなに面白いんだ。」" data-en="“I never knew Kōdan could be this much fun.”">「講談って、こんなに面白いんだ。」</blockquote>

          <p data-ja="そう思ってもらえる一席を。" data-en="That is the kind of performance he wants audiences to experience.">そう思ってもらえる一席を。</p>

          <p class="kodan-closing" data-ja="この日、この場所、このお客様とつくる、\n二つとない講談をお届けします。" data-en="Created with this day, this place and this audience —\na one-of-a-kind Kōdan performance.">この日、この場所、このお客様とつくる、<br>二つとない講談をお届けします。</p>
        </div>
      </div>
    </div>
  </section>`;

    html = html.replace(/<section class="kodan" id="kodan">[\s\S]*?<\/section>/, kodanSection);

    const style = `<style id="kodan-copy-layout">
      .kodan-editorial-grid {
        display: grid;
        grid-template-columns: 1.05fr .95fr;
        gap: clamp(44px, 7vw, 90px);
        align-items: start;
      }
      .kodan-story,
      .kodan-minamifuji {
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif;
        font-size: clamp(1.02rem, 1.45vw, 1.16rem);
        line-height: 2.05;
      }
      .kodan-story p,
      .kodan-minamifuji p {
        margin: 0 0 1.65em;
      }
      .kodan-terms {
        margin: -0.4em 0 2em;
        padding: 1.25em 1.4em;
        border-left: 2px solid #d6b67b;
        background: rgba(255,255,255,.045);
      }
      .kodan-terms p {
        display: grid;
        grid-template-columns: 4.2em 1fr;
        gap: .6em;
        margin: .3em 0;
      }
      .kodan-terms strong {
        color: #e1c18a;
        font-size: 1.08em;
      }
      .kodan-emphasis {
        margin: 2.1em 0 .8em !important;
        font-size: clamp(1.28rem, 2.3vw, 1.75rem);
        line-height: 1.75 !important;
        color: #fffaf1;
      }
      .kodan-minamifuji {
        padding: clamp(28px, 4vw, 42px);
        border: 1px solid rgba(255,255,255,.18);
        background: rgba(255,255,255,.035);
      }
      .kodan-minamifuji h3 {
        margin: 8px 0 24px;
        font-family: "Yu Mincho","Hiragino Mincho ProN",serif;
        font-size: clamp(2rem, 3.5vw, 3rem);
        line-height: 1.25;
        font-weight: 500;
      }
      .kodan-catch {
        font-size: clamp(1.22rem, 2.2vw, 1.6rem);
        line-height: 1.8 !important;
        color: #fffaf1;
      }
      .kodan-minamifuji blockquote {
        margin: 2.1em 0;
        padding: .3em 0 .3em 1em;
        border-left: 2px solid #d6b67b;
        font-size: clamp(1.35rem, 2.3vw, 1.8rem);
        line-height: 1.65;
        color: #fffaf1;
      }
      .kodan-closing {
        margin-top: 2.2em !important;
        padding-top: 1.6em;
        border-top: 1px solid rgba(255,255,255,.2);
        font-size: clamp(1.2rem, 2vw, 1.5rem);
        line-height: 1.85 !important;
        color: #fffaf1;
      }
      @media(max-width:850px){
        .kodan-editorial-grid{grid-template-columns:1fr;gap:48px}
        .kodan-minamifuji{padding:28px 24px}
        .kodan-story,.kodan-minamifuji{font-size:1.03rem;line-height:1.95}
      }
    </style>`;

    html = html.replace("</head>", style + "\n</head>");

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
