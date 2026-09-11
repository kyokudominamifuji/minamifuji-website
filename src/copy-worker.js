import site from "./kodan-copy-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();

    html = html
      .replaceAll(
        '笑って、驚いて、ときには胸が熱くなる。',
        '笑い、驚き、胸が熱くなる。物語を通して、心が動く瞬間を届けたい。'
      )
      .replaceAll(
        'To laugh, to be surprised, and sometimes to feel your heart stir — while carrying the classics forward and exploring new forms of expression.',
        'To laugh, to be surprised, and to feel something stir inside — creating moments when a story truly moves the heart.'
      )
      .replaceAll(
        'To laugh, to be surprised, and sometimes to feel your heart stir.',
        'To laugh, to be surprised, and to feel something stir inside.'
      )
      .replaceAll(
        '「講談って、こんなに面白いんだ。」',
        '「講談って、こんなに心が動くんだ。」'
      )
      .replaceAll(
        '“I never knew Kōdan could be this much fun.”',
        '“I never knew Kōdan could move me this deeply.”'
      );

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
