import site from "./site-worker.js";

export default {
  async fetch(request, env, ctx) {
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;

    let html = await response.text();
    const profilePhotoStyle = `<style id="profile-photo-v2">
      /* TOP画像はそのまま。プロフィール写真は senzai pic.jpg を全体表示 */
      .profile .portrait {
        background-image:url("https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/senzai%20pic.jpg")!important;
        background-position:center center!important;
        background-size:100% 100%!important;
        background-repeat:no-repeat!important;
        min-height:0!important;
        aspect-ratio:2048 / 1365!important;
      }
      @media(max-width:850px){
        .profile .portrait{
          min-height:0!important;
          aspect-ratio:2048 / 1365!important;
          background-size:100% 100%!important;
          background-position:center center!important;
        }
      }
    </style>`;

    html = html.replace("</head>", profilePhotoStyle + "\n</head>");
    html = html.replace("</body>", "<!-- profile-photo-worker-v2 -->\n</body>");

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("cache-control", "no-store, no-cache, must-revalidate, max-age=0");
    headers.set("pragma", "no-cache");
    headers.set("expires", "0");
    headers.set("x-profile-photo-worker", "v2");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
