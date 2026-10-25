/* Visual-only homepage uplift; event data and ticket links remain unchanged. */

function threePillarEnhancements(html, path) {
  const en = path === "/en" || path === "/en/";
  if (html.includes('id="mf-three-paths"')) return html;

  // An evergreen navigation item must never be coupled to a single show's booking form.
  // Per-event booking links still live exclusively in the upcoming performance cards.
  const fanTarget = html.includes('id="instagram"') ? "#instagram" : "#about";
  const threeCards = en ? [
    {no:"01", eyebrow:"WATCH", title:"Experience a live performance", copy:"See upcoming dates, venues, and how to book. Your first Kōdan is welcome.", url:"#stage", label:"View performances"},
    {no:"02", eyebrow:"INVITE", title:"Bring Kōdan to your venue", copy:"For cultural events, schools, organizations, workshops, and collaborations.", url:"#contact", label:"Performance inquiries"},
    {no:"03", eyebrow:"FOLLOW", title:"Stay close to the story", copy:"Discover Minamifuji's latest appearances and behind-the-scenes activities.", url:fanTarget, label:"Explore ongoing activities"}
  ] : [
    {no:"01", eyebrow:"WATCH", title:"講談を、観に行く。", copy:"はじめての方も歓迎。公演の日時や会場、予約方法はこちらから。", url:"#stage", label:"公演一覧・ご予約"},
    {no:"02", eyebrow:"INVITE", title:"講談師を、呼んでみる。", copy:"文化施設・学校・企業・地域の催し、講演や共演企画のご相談も。", url:"#contact", label:"出演・講演のご相談"},
    {no:"03", eyebrow:"FOLLOW", title:"南不二の、いまを知る。", copy:"高座の舞台裏や日々の活動、これからの挑戦を追いかける。", url:fanTarget, label:"日々の活動を見る"}
  ];
  const cardsMarkup = threeCards.map(card => (
    '<article class="mf-path-card">' +
    '<span class="mf-path-number">' + card.no + ' / ' + card.eyebrow + '</span>' +
    '<h3>' + card.title + '</h3>' +
    '<p>' + card.copy + '</p>' +
    '<a href="' + card.url + '">' + card.label + ' <span aria-hidden="true">↗</span></a>' +
    '</article>'
  )).join("");
  const threePaths = '<section class="mf-three-paths" id="mf-three-paths" aria-labelledby="mf-paths-title">' +
    '<div class="wrap"><div class="mf-path-intro"><div><span class="mf-path-eyebrow">YOUR NEXT STEP</span>' +
    '<h2 id="mf-paths-title">' + (en ? "Three ways to discover Kōdan" : "講談との出会い方、三つ。") + '</h2></div>' +
    '<p>' + (en ? "Attend, invite, or follow. Find the path that suits you." : "聴きに行く。招いてみる。日々を知る。あなたに合う入口からどうぞ。") + '</p></div>' +
    '<div class="mf-path-grid">' + cardsMarkup + '</div></div></section>';

  if (html.includes('<section class="stage" id="stage">')) {
    html = html.replace(/(<section class="stage" id="stage">[\s\S]*?<\/section>)/, '$1\n' + threePaths);
  }

  // Improve the existing contact section without discarding the original address.
  const contact = html.match(/<section class="contact" id="contact">[\s\S]*?<\/section>/)?.[0] || "";
  if (contact && !contact.includes('mf-inquiry-helpers')) {
    const subject = encodeURIComponent(en ? "Kodan performance inquiry" : "旭堂南不二 出演・講演のご相談");
    const intro = en
      ? 'Please share your preferred date, location, event type, expected length, and budget if available.'
      : '日程・場所・催しの内容・ご希望の持ち時間・ご予算など、分かる範囲でお知らせください。';
    const body = en
      ? 'Date:\nVenue:\nEvent type:\nPerformance duration:\nBudget:\nContact name:\n'
      : '【開催希望日】\n【会場・地域】\n【催しの内容】\n【ご希望の時間】\n【ご予算（任意）】\n【お名前・ご連絡先】\n';
    const draftLink = 'mailto:373fuji@gmail.com?subject=' + subject + '&body=' + encodeURIComponent(body);
    const helper = '<div class="mf-inquiry-helpers">' +
      '<p>' + intro + '</p>' +
      '<a href="' + draftLink + '">' + (en ? "Compose an inquiry email" : "相談メールを作成する") + ' <span aria-hidden="true">↗</span></a>' +
      '</div>';
    const updated = contact.replace(/(<a class="mail"[^>]*>[\s\S]*?<\/a>)/, '$1\n' + helper);
    html = html.replace(contact,updated);
  }

  // Replace an outdated "coming soon" Instagram promise with useful, honest copy.
  html = html
    .replaceAll('Instagramの最新投稿を、この場所に自動表示できるよう準備しています。','最新の公演案内や舞台裏の様子は、Instagramからご覧いただけます。')
    .replaceAll('This section is being prepared to automatically display the latest Instagram posts.','See performance announcements and moments behind the scenes on Instagram.');

  // Three equally accessible, purposeful actions on mobile.
  if (html.includes('<nav class="mf-dock"')) {
    const labelBooking = en ? "Performances" : "公演を観る";
    const labelInquiry = en ? "Inquiries" : "出演依頼";
    const labelFollow = en ? "Follow" : "活動を見る";
    const newDock = '<nav class="mf-dock mf-dock-three" aria-label="' + (en ? 'Quick access' : 'クイックメニュー') + '">' +
      '<a class="mf-dock-primary" href="#stage">' + labelBooking + '</a>' +
      '<a class="mf-dock-shows" href="#contact">' + labelInquiry + '</a>' +
      '<a class="mf-dock-shows" href="' + fanTarget + '">' + labelFollow + '</a>' +
      '</nav>';
    html = html.replace(/<nav class="mf-dock"[\s\S]*?<\/nav>/,newDock);
  }
  return html;
}

export default function upgradeHomepage(html,path) {
  if (!["/","/en","/en/"].includes(path) || html.includes("mf-homepage-upgrade-v2")) return html;
  const en = path !== "/";
  // The same original photo as the desktop background, rendered at its natural
  // aspect ratio on phones so the head is never cropped by background-cover.
  const mobileHeroPhoto = '<img class="mf-mobile-hero-photo" src="https://raw.githubusercontent.com/kyokudominamifuji/minamifuji-website/main/9DE0020E-0A9D-417A-B768-D430D0992E62.png" alt="講談師・旭堂南不二" decoding="async" fetchpriority="high">';
  html = html.replace('<section class="hero">', '<section class="hero">\\n' + mobileHeroPhoto);
  const stage = html.match(/<section class="stage" id="stage">[\s\S]*?<\/section>/)?.[0];
  if (stage && /<section class="hero"[\s\S]*?<\/section>/.test(html)) {
    html = html.replace(stage,"");
    html = html.replace(/(<section class="hero"[\s\S]*?<\/section>)/,"$1\n"+stage);
  }
  const first = html.match(/<article class="event"[^>]*>[\s\S]*?<\/article>/)?.[0] || "";
  const year = first.match(/<div class="year">([^<]+)<\/div>/)?.[1] || "";
  const day = first.match(/<div class="day">([^<]+)<\/div>/)?.[1] || "";
  const title = first.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1]?.replace(/<[^>]+>/g,"") || "";
  // The global navigation stays valid even after the next performance is over.
  if(first) html = html.replace('<article class="event"', '<article class="event" data-next-event="true"');
  if(first && year && day && title && html.includes('<div class="actions">')) {
    const heroNext = '<aside class="mf-hero-next" aria-label="' + (en?'Next performance':'次回の公演') + '"><span>' + (en?'NEXT PERFORMANCE':'次回の公演') + '</span><a href="#stage"><b>' + year + '.' + day + '</b> ' + title + ' <i aria-hidden="true">↗</i></a></aside>';
    html = html.replace('<div class="actions">',heroNext+'\n<div class="actions">');
  }
  const dock = '<nav class="mf-dock" aria-label="' + (en?'Quick access':'クイックメニュー') + '"><a class="mf-dock-shows" href="#stage">' + (en?'Show dates':'公演を見る') + '</a><a class="mf-dock-primary" href="#stage">' + (en?'Performances':'公演を観る') + ' ↗</a></nav>';
  html = html.replace("</body>", dock+"\n</body>");

  const style = `
<style id="mf-homepage-upgrade-v2">
html{scroll-padding-top:95px}
body{overflow-x:hidden}
header{background:rgba(19,18,16,.95)!important;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.12)}
:focus-visible{outline:3px solid #d8b270;outline-offset:3px}
.navlinks a{transition:color .2s}
.navlinks a:hover,.navlinks a:focus-visible{color:#dfc48f!important}
.mf-hero-next{display:block;max-width:520px!important;margin-top:26px;padding:14px 16px;background:rgba(255,255,255,.085);border-left:3px solid #dfc48f;backdrop-filter:blur(5px)}
.mf-hero-next>span{display:block;font-size:.69rem;line-height:1.5;color:#edd2a1;letter-spacing:.13em;font-weight:800}
.mf-hero-next a{display:flex;gap:11px;align-items:baseline;margin-top:6px;color:#fff;text-decoration:none;font-size:.9rem;line-height:1.7}
.mf-hero-next a:hover{text-decoration:underline;text-underline-offset:4px}
.mf-hero-next b{font-family:Georgia,serif;white-space:nowrap;color:#f2d7ad;font-weight:500;font-size:1.04rem}
.mf-hero-next i{font-style:normal;margin-left:auto}
.hero .actions .btn{min-height:46px}
#stage{background:#f2ede4;padding:78px 0 90px}
#stage .section-head{margin-bottom:30px}
#stage .section-head h2{font-size:clamp(2.6rem,5vw,4.3rem)}
#stage .event{background:#fffdf8;min-width:0;display:grid;grid-template-columns:128px minmax(0,1fr);gap:clamp(18px,3vw,36px);padding:31px;margin:0 0 14px;border:1px solid rgba(44,34,23,.17);box-shadow:0 8px 26px rgba(37,27,17,.035)}
#stage .event + .event{border-top:1px solid rgba(44,34,23,.17)}
#stage .event[data-next-event="true"]{background:#fffbf2;border-top:4px solid #a13d28;padding-top:28px;box-shadow:0 15px 38px rgba(37,27,17,.08)}
#stage .event .date{min-width:0;padding-right:12px;border-right:1px solid rgba(44,34,23,.17)}
#stage .event .date .year{color:#7e6f5f;font-size:.79rem;letter-spacing:.1em}
#stage .event .date .day{font-size:clamp(2.4rem,3.6vw,3.5rem);line-height:1.2;letter-spacing:-.04em;white-space:nowrap}
#stage .event .date .dow{font-size:.71rem;color:#9a6c43;letter-spacing:.12em}
#stage .event h3{font-size:clamp(1.6rem,2.7vw,2.45rem);line-height:1.45;overflow-wrap:anywhere}
#stage .event .tagline{font-family:"Yu Mincho","Hiragino Mincho ProN",serif;color:#695c4d;line-height:1.8}
#stage .event .eyebrow{line-height:1.5;font-size:.7rem}
#stage .event .facts{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:16px 20px;margin:17px 0!important}
#stage .event .facts .fact{min-width:0}
#stage .event .facts .fact b{display:block;font-size:.88rem;line-height:1.7;overflow-wrap:anywhere}
#stage .event .facts .fact small{font-size:.69rem}
#stage .event .event-flyer{margin:18px 0 6px;width:min(290px,100%)}
#stage .event .event-actions{gap:10px;margin-top:18px}
#stage .event .event-actions a{min-height:46px}
#stage .event:not([data-next-event="true"]) .event-actions .reserve{display:inline-flex;align-items:center;justify-content:center;border:1px solid #8b5839;padding:9px 15px;text-decoration:none;color:#794a2e;font-size:.85rem}
#stage .event:not([data-next-event="true"]) .event-actions .reserve:hover{background:#f4ede2}
#stage .event[data-next-event="true"] .event-actions .reserve{display:inline-flex;align-items:center;justify-content:center;background:#9f2d26!important;border:1px solid #9f2d26!important;color:#fff!important;padding:9px 17px;text-decoration:none!important}
#stage .event[data-next-event="true"] .event-actions .reserve:hover{background:#83231c!important}
#stage .event[data-event-id="2026-11-01-minamifuji-sakurako"] .facts{grid-template-columns:1fr!important}
.mf-dock{display:none}
@media(max-width:1080px){
  #stage .event{grid-template-columns:105px minmax(0,1fr);gap:20px;padding:24px}
  #stage .event[data-next-event="true"]{padding-top:21px}
  #stage .event[data-event-id="2026-11-01-minamifuji-sakurako"]>div:nth-child(2){grid-template-columns:1fr!important}
  #stage .event[data-event-id="2026-11-01-minamifuji-sakurako"] .event-flyer-link{grid-column:1!important;grid-row:auto!important;max-width:350px;width:100%;margin:14px 0 18px}
}
@media(max-width:850px){
  html{scroll-padding-top:74px}
  body{padding-bottom:calc(70px + env(safe-area-inset-bottom,0px))}
  .hero{padding-top:min(60svh,560px)!important}
  .hero:before{height:min(60svh,560px)!important}
  .hero-inner{padding:35px 0 45px!important}
  .mf-dock{display:grid;grid-template-columns:1fr 1.3fr;position:fixed;z-index:100;left:0;right:0;bottom:0;gap:9px;padding:10px 13px calc(10px + env(safe-area-inset-bottom,0px));background:rgba(21,20,18,.98);box-shadow:0 -6px 25px rgba(0,0,0,.23)}
  .mf-dock a{display:flex;align-items:center;justify-content:center;min-height:46px;font-size:.86rem;font-weight:800;text-decoration:none;text-align:center;padding:9px}
  .mf-dock-shows{color:#f3e4cb;border:1px solid #d3b88a}
  .mf-dock-primary{background:#bd542e;color:#fff;border:1px solid #bd542e}
  #stage .event{grid-template-columns:1fr;gap:15px;padding:23px 20px}
  #stage .event[data-next-event="true"]{padding-top:20px}
  #stage .event .date{display:flex;gap:13px;align-items:baseline;flex-wrap:wrap;padding:0 0 12px;border-right:0;border-bottom:1px solid rgba(44,34,23,.17)}
  #stage .event .date .day{font-size:2.5rem}
  #stage .event .facts{grid-template-columns:1fr!important;gap:13px}
  #stage .event .event-actions{display:flex;align-items:stretch;flex-direction:column}
  #stage .event .event-actions a{width:100%}
  #stage .event .event-flyer{max-width:320px;width:100%}
}
@media(max-width:540px){
  #stage{padding:60px 0}
  #stage .section-head{margin-bottom:22px}
  #stage .event h3{font-size:clamp(1.58rem,6.4vw,2rem)}
  .mf-hero-next{margin-top:20px;padding:12px}
  .mf-hero-next a{font-size:.83rem;gap:8px}
  .mf-hero-next b{font-size:.87rem}
  .hero .actions .btn[href="#repertoire"],.hero .actions .btn[href="#contact"]{display:none}
  .hero .actions .btn{min-height:46px;flex:1 1 45%;padding:8px 9px!important}
}
/* On phones, use a real image rather than a cropped cover background.
   The picture begins below the fixed 68px navigation and scales to fit whole. */
.mf-mobile-hero-photo{display:none}
@media(max-width:850px){
  .hero{display:block!important;min-height:0!important;padding:68px 0 0!important;background:#11100d}
  .hero::before,.hero::after{display:none!important}
  .hero .mf-mobile-hero-photo{display:block;width:100%;height:auto;max-height:min(70svh,580px);object-fit:contain;object-position:center top;margin:0 auto;background:#11100d}
  .hero-inner{padding:28px 0 48px!important;text-align:center}
  .hero-inner::before{content:"";display:block;width:44px;height:2px;margin:0 auto 19px;background:#c4a16d}
  .hero h1{font-size:clamp(2.65rem,11vw,3.5rem)!important;line-height:1.18;letter-spacing:.045em}
  .hero .roman{margin-top:10px;font-size:clamp(.88rem,3.5vw,1.05rem);letter-spacing:.13em;color:#e5c99e}
  .hero-lead{margin-top:24px}
  .hero-sub{margin-left:auto;margin-right:auto;max-width:36ch}
  .hero .mf-hero-next{margin-left:auto;margin-right:auto;text-align:left}
  .hero .actions{justify-content:center}
}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.navlinks a{transition:none}}
</style>`;
  html = html.replace("</head>",style+"\n</head>");
  html = threePillarEnhancements(html, path);
  return html.replace("</head>","\n<style id=\"mf-three-paths-style\">\n#mf-three-paths{padding:78px 0 90px;background:#1b1b1a;color:#f4eee5}\n#mf-three-paths .mf-path-intro{display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:end;margin-bottom:32px}\n#mf-three-paths .mf-path-eyebrow{display:block;font-size:.75rem;letter-spacing:.19em;color:#d6b67b;font-weight:800}\n#mf-three-paths h2{margin:12px 0 0;font:500 clamp(2rem,4.8vw,3.5rem)/1.35 \"Yu Mincho\",\"Hiragino Mincho ProN\",serif;letter-spacing:.01em}\n#mf-three-paths .mf-path-intro>p{max-width:430px;color:#d7cfc2;line-height:1.9;margin:0}\n#mf-three-paths .mf-path-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}\n#mf-three-paths .mf-path-card{min-width:0;display:flex;flex-direction:column;align-items:flex-start;padding:28px 25px 30px;border:1px solid rgba(217,189,137,.34);background:rgba(255,255,255,.025)}\n#mf-three-paths .mf-path-number{font:800 .71rem/1.6 system-ui,sans-serif;letter-spacing:.17em;color:#d6b67b}\n#mf-three-paths .mf-path-card h3{font:600 clamp(1.25rem,2vw,1.55rem)/1.55 \"Yu Mincho\",\"Hiragino Mincho ProN\",serif;margin:19px 0 10px}\n#mf-three-paths .mf-path-card p{color:#d4cec3;font-size:.9rem;line-height:1.85;margin:0 0 28px;flex:1}\n#mf-three-paths .mf-path-card a{display:flex;align-items:center;gap:12px;padding:7px 0;border-bottom:1px solid #cfab75;color:#f5e5ce;text-decoration:none;font-weight:700;font-size:.86rem}\n#mf-three-paths .mf-path-card a:hover,#mf-three-paths .mf-path-card a:focus-visible{color:#fff;border-bottom-color:#fff}\n.contact .mf-inquiry-helpers{margin-top:22px;padding:20px 22px;max-width:570px;border:1px solid rgba(255,255,255,.3);background:rgba(0,0,0,.075)}\n.contact .mf-inquiry-helpers p{margin:0 0 14px;color:#f8e5de;font-size:.88rem;line-height:1.8}\n.contact .mf-inquiry-helpers a{display:inline-flex;align-items:center;gap:9px;font-weight:800;color:#fff;border-bottom:1px solid rgba(255,255,255,.8);text-decoration:none;padding-bottom:4px}\n@media(max-width:850px){\n  .mf-dock.mf-dock-three{grid-template-columns:1fr 1fr 1fr;gap:6px}\n  .mf-dock.mf-dock-three a{font-size:.8rem;white-space:nowrap;padding:8px 3px}\n  #mf-three-paths{padding:60px 0 66px}\n  #mf-three-paths .mf-path-intro{grid-template-columns:1fr;gap:12px}\n  #mf-three-paths .mf-path-grid{grid-template-columns:1fr;gap:12px}\n  #mf-three-paths .mf-path-card{padding:22px}\n  #mf-three-paths .mf-path-card h3{margin:11px 0 6px}\n  #mf-three-paths .mf-path-card p{margin-bottom:14px}\n}\n@media(max-width:360px){.mf-dock.mf-dock-three a{font-size:.74rem}}\n</style>"+"\n</head>");
};
