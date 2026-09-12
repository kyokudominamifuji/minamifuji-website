import site from "./seo-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    html = html.replace(
      /<h4 data-ja="鍵盤に命をかけた男たち" data-en="Men Who Gave Their Lives to the Keys">[\s\S]*?<\/h4>/,
      '<h4 data-ja="鍵盤に命を吹き込んだ男たち" data-en="The Men Who Breathed Life into the Keys">鍵盤に命を吹き込んだ男たち</h4>'
    );

    html = html.replace(
      /<p data-ja="語りと鍵盤がぶつかり合い、ひとつの物語になる。音楽に人生を懸けた男たちを描く、世界初・ピアノとのコラボ講談。" data-en="Voice and piano collide and become one story. A world-first collaboration between Kōdan and piano, portraying men who devoted their lives to music.">[\s\S]*?<\/p>/,
      '<p data-ja="音楽と人間の情熱を、講談という語りの力で描く新しい挑戦。" data-en="A new challenge: portraying music and human passion through the storytelling power of Kōdan.">音楽と人間の情熱を、講談という語りの力で描く新しい挑戦。</p>'
    );

    const url = new URL(request.url);
    if (url.pathname === "/en" || url.pathname.startsWith("/en/")) {
      html = html.replace(
        '>鍵盤に命を吹き込んだ男たち</h4>',
        '>The Men Who Breathed Life into the Keys</h4>'
      );
      html = html.replace(
        '>音楽と人間の情熱を、講談という語りの力で描く新しい挑戦。</p>',
        '>A new challenge: portraying music and human passion through the storytelling power of Kōdan.</p>'
      );
    }

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("cache-control", "no-store, no-cache, must-revalidate, max-age=0");
    headers.set("x-seo-title-worker", "v1");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
