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
        '心が躍り、息をのみ、胸が熱くなる。'
      )
      .replaceAll(
        'To laugh, to be surprised, and sometimes to feel your heart stir — while carrying the classics forward and exploring new forms of expression.',
        'Your heart lifts, you hold your breath, and something stirs deep inside — while carrying the classics forward and exploring new forms of expression.'
      )
      .replaceAll(
        'To laugh, to be surprised, and sometimes to feel your heart stir.',
        'Your heart lifts, you hold your breath, and something stirs deep inside.'
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
