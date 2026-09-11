import site from "./profile-photo-worker.js";

const ORIGIN = "https://kyokudominamifuji.com";
const GA_MEASUREMENT_ID = "G-YECMYPV67K";

const META = {
  ja: {
    title: "旭堂南不二｜講談師 公式サイト｜Kyokudo Minamifuji",
    description: "静岡県富士市出身の講談師・旭堂南不二。日本各地で高座に立ち、歴史と物語を今を生きる人へ。一席一会、二つとない講談を届けます。出演情報、講談会、活動記録などを掲載する公式サイトです。",
    url: `${ORIGIN}/`
  },
  en: {
    title: "Kyokudo Minamifuji | Japanese Kodan Storyteller",
    description: "Kyokudo Minamifuji is a Japanese Kodan storyteller from Fuji City, Shizuoka. Performing across Japan, he brings history and timeless stories to life for today’s audiences. One encounter. One-of-a-kind Kodan.",
    url: `${ORIGIN}/en/`
  }
};

function escapeJsonForHtml(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function seoHead(lang) {
  const meta = META[lang];
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${ORIGIN}/#website`,
        "url": `${ORIGIN}/`,
        "name": "旭堂南不二｜Kyokudo Minamifuji",
        "inLanguage": ["ja", "en"],
        "publisher": { "@id": `${ORIGIN}/#person` }
      },
      {
        "@type": "Person",
        "@id": `${ORIGIN}/#person`,
        "name": "旭堂南不二",
        "alternateName": "Kyokudo Minamifuji",
        "url": `${ORIGIN}/`,
        "jobTitle": "講談師 / Japanese Kodan Storyteller",
        "description": "静岡県富士市出身の講談師。日本各地で高座に立ち、歴史と物語を今を生きる人へ届ける。",
        "birthPlace": {
          "@type": "Place",
          "name": "Fuji City, Shizuoka, Japan"
        },
        "affiliation": {
          "@type": "Organization",
          "name": "上方講談協会 / Kamigata Kodan Association"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${meta.url}#webpage`,
        "url": meta.url,
        "name": meta.title,
        "description": meta.description,
        "isPartOf": { "@id": `${ORIGIN}/#website` },
        "about": { "@id": `${ORIGIN}/#person` },
        "inLanguage": lang
      }
    ]
  };

  return `
  <link rel="canonical" href="${meta.url}">
  <link rel="alternate" hreflang="ja" href="${ORIGIN}/">
  <link rel="alternate" hreflang="en" href="${ORIGIN}/en/">
  <link rel="alternate" hreflang="x-default" href="${ORIGIN}/">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="旭堂南不二｜Kyokudo Minamifuji">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:url" content="${meta.url}">
  <meta property="og:image" content="${ORIGIN}/9DE0020E-0A9D-417A-B768-D430D0992E62.png">
  <meta property="og:locale" content="${lang === "ja" ? "ja_JP" : "en_US"}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${ORIGIN}/9DE0020E-0A9D-417A-B768-D430D0992E62.png">
  <script type="application/ld+json">${escapeJsonForHtml(graph)}</script>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  </script>`;
}

function applyEnglishServerHints(html) {
  html = html.replace(/<html\b[^>]*lang=["'][^"']*["']/i, '<html lang="en">');
  html = html.replace(/(<([a-z][a-z0-9-]*)\b[^>]*\bdata-en="([^"]*)"[^>]*>)([^<]*)(<\/\2>)/gi,
    (match, open, tag, en, current, close) => {
      const text = en.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
      return `${open}${text}${close}`;
    }
  );
  const englishBootstrap = `<script id="english-page-bootstrap">
  (function(){
    function applyEnglish(){
      document.documentElement.lang='en';
      document.querySelectorAll('[data-en]').forEach(function(el){
        var text=el.getAttribute('data-en');
        if(text===null)return;
        if(text.indexOf('\\\\n')>=0){el.innerHTML=text.split('\\\\n').join('<br>');}
        else{el.textContent=text;}
      });
      var btn=document.getElementById('langBtn');
      if(btn){btn.textContent='日本語';}
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyEnglish);
    else applyEnglish();
  })();
  </script>`;
  return html.replace("</body>", englishBootstrap + "\n</body>");
}

function addLanguageNavigation(html, lang) {
  const target = lang === "en" ? `${ORIGIN}/` : `${ORIGIN}/en/`;
  const navScript = `<script id="seo-language-navigation">
  (function(){
    var btn=document.getElementById('langBtn');
    if(!btn)return;
    btn.addEventListener('click',function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      window.location.href=${JSON.stringify(target)};
    },true);
  })();
  </script>`;
  return html.replace("</body>", navScript + "\n</body>");
}

function optimizeHtml(html, lang) {
  const meta = META[lang];
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);
  html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${meta.description}">`);
  html = html.replaceAll(
    "静岡県富士市を拠点に活動する講談師。旭堂南左衛門に師事。上方講談協会所属。",
    "静岡県富士市出身。日本各地で高座に立つ講談師。旭堂南左衛門に師事。上方講談協会所属。"
  );
  html = html.replaceAll(
    "A Kōdan storyteller based in Fuji City, Shizuoka. Disciple of Kyokudo Nanzaemon and a member of the Kamigata Kodan Association.",
    "A Japanese Kōdan storyteller from Fuji City, Shizuoka, performing across Japan. Disciple of Kyokudo Nanzaemon and a member of the Kamigata Kodan Association."
  );
  html = html.replace("</head>", seoHead(lang) + "\n</head>");
  if (lang === "en") html = applyEnglishServerHints(html);
  html = addLanguageNavigation(html, lang);
  return html;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/robots.txt") {
      return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`, { headers: { "content-type": "text/plain; charset=UTF-8", "cache-control": "public, max-age=3600" } });
    }
    if (url.pathname === "/sitemap.xml") {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${ORIGIN}/</loc><lastmod>2026-09-11</lastmod><xhtml:link rel="alternate" hreflang="ja" href="${ORIGIN}/" /><xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}/en/" /></url>
  <url><loc>${ORIGIN}/en/</loc><lastmod>2026-09-11</lastmod><xhtml:link rel="alternate" hreflang="ja" href="${ORIGIN}/" /><xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}/en/" /></url>
</urlset>`;
      return new Response(xml, { headers: { "content-type": "application/xml; charset=UTF-8", "cache-control": "public, max-age=3600" } });
    }
    const lang = url.pathname === "/en" || url.pathname.startsWith("/en/") ? "en" : "ja";
    const response = await site.fetch(request, env, ctx);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return response;
    let html = await response.text();
    html = optimizeHtml(html, lang);
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("content-language", lang);
    headers.set("x-robots-tag", "index, follow");
    headers.set("cache-control", "no-store, no-cache, must-revalidate, max-age=0");
    headers.set("x-seo-worker", "bilingual-v1");
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }
};
