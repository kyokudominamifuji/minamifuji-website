import site from "./type-worker.js";

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
        'To laugh, to be surprised, and sometimes to feel your heart stir.',
        'Your heart lifts, you hold your breath, and something stirs deep inside.'
      )
      .replaceAll(
        '笑って、驚いて、<br>ときには胸が熱くなる。',
        '心が躍り、息をのみ、<br>胸が熱くなる。'
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
