export default {
  async fetch() {
    const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>旭堂南不二 公式ウェブサイト</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Hiragino Kaku Gothic ProN", "Yu Gothic", system-ui, sans-serif;
      background: linear-gradient(180deg, #fffdf8 0%, #f7efe3 100%);
      color: #1f1f1f;
      min-height: 100vh;
      display: grid;
      place-items: center;
    }
    main {
      width: min(900px, calc(100% - 32px));
      padding: 64px 24px;
      text-align: center;
    }
    .eyebrow {
      letter-spacing: .18em;
      font-size: .82rem;
      color: #7b5d3b;
      margin-bottom: 18px;
    }
    h1 {
      margin: 0;
      font-size: clamp(2.3rem, 8vw, 5.5rem);
      line-height: 1.05;
      font-family: "Yu Mincho", "Hiragino Mincho ProN", serif;
    }
    .sub {
      margin: 18px 0 0;
      font-size: clamp(1rem, 2.8vw, 1.35rem);
      line-height: 1.9;
    }
    .message {
      margin: 42px auto 0;
      max-width: 680px;
      padding: 24px;
      background: rgba(255,255,255,.72);
      border: 1px solid rgba(123,93,59,.18);
      border-radius: 18px;
      box-shadow: 0 10px 30px rgba(60,40,20,.06);
      line-height: 1.9;
    }
    .status {
      display: inline-block;
      margin-top: 28px;
      padding: 10px 16px;
      border-radius: 999px;
      background: #1f1f1f;
      color: #fff;
      font-size: .9rem;
    }
  </style>
</head>
<body>
  <main>
    <div class="eyebrow">KODAN STORYTELLER</div>
    <h1>旭堂南不二</h1>
    <p class="sub">語り継がれる物語を、今を生きるあなたへ。</p>
    <div class="message">
      <strong>公式ウェブサイト準備中</strong><br />
      このページは GitHub と Cloudflare Workers の接続確認用です。<br />
      これから公演情報、プロフィール、講談の魅力などを少しずつ育てていきます。
    </div>
    <div class="status">GitHub → Cloudflare 接続テスト</div>
  </main>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "cache-control": "public, max-age=300"
      }
    });
  }
};
