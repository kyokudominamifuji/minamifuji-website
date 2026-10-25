/* Visual-only homepage uplift; event data and ticket links remain unchanged. */
export default function upgradeHomepage(html,path) {
  if (!["/","/en","/en/"].includes(path) || html.includes("mf-homepage-upgrade-v2")) return html;
  const en = path !== "/";
  const stage = html.match(/<section class="stage" id="stage">[\s\S]*?<\/section>/)?.[0];
  if (stage && /<section class="hero"[\s\S]*?<\/section>/.test(html)) {
    html = html.replace(stage,"");
    html = html.replace(/(<section class="hero"[\s\S]*?<\/section>)/,"$1\n"+stage);
  }
  const first = html.match(/<article class="event"[^>]*>[\s\S]*?<\/article>/)?.[0] || "";
  const year = first.match(/<div class="year">([^<]+)<\/div>/)?.[1] || "";
  const day = first.match(/<div class="day">([^<]+)<\/div>/)?.[1] || "";
  const title = first.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1]?.replace(/<[^>]+>/g,"") || "";
  const form = first.match(/<a class="reserve" href="([^"]+)"/)?.[1] || "";
  if(first) html = html.replace('<article class="event"', '<article class="event" data-next-event="true"');
  if(first && year && day && title && html.includes('<div class="actions">')) {
    const heroNext = '<aside class="mf-hero-next" aria-label="' + (en?'Next performance':'次回の公演') + '"><span>' + (en?'NEXT PERFORMANCE':'次回の公演') + '</span><a href="#stage"><b>' + year + '.' + day + '</b> ' + title + ' <i aria-hidden="true">↗</i></a></aside>';
    html = html.replace('<div class="actions">',heroNext+'\n<div class="actions">');
  }
  const dock = '<nav class="mf-dock" aria-label="' + (en?'Quick access':'クイックメニュー') + '"><a class="mf-dock-shows" href="#stage">' + (en?'Show dates':'公演を見る') + '</a><a class="mf-dock-primary" href="' + (form || '#contact') + '"' + (form?' target="_blank" rel="noopener noreferrer"':'') + '>' + (form?(en?'Book now':'次の公演を予約'):(en?'Inquiries':'出演依頼')) + ' ↗</a></nav>';
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
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.navlinks a{transition:none}}
</style>`;
  return html.replace("</head>",style+"\n</head>");
};
