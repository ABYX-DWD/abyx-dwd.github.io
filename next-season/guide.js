/* ABYX HUB — Dinosaur Era (Season 8). All editorial content is language-specific. */
(function(){
"use strict";
var IDS=[["world","🌿"],["camps","🏕️"],["calendar","🗓️"],["mines","💎"],["passes","🚧"],["outposts","🏛️"],["crystals","⛏️"],["movement","🌀"],["merchant","🏪"],["dinosaurs","🦖"],["progression","🧬"],["research","🎮"],["planning","🧭"],["unknowns","🔎"]];
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function getLang(){try{var l=localStorage.getItem("abyx_lang")||"en";return (window.ABYX_S8_LANG||{})[l]?l:"en"}catch(e){return "en"}}
function render(){
 var data=(window.ABYX_S8_LANG||{})[getLang()]||(window.ABYX_S8_LANG||{}).en;
 var root=document.getElementById("guide-root");
 if(!data||!root)return;
 var u=data.ui, sections=data.sections;
 var cards=sections.map(function(s,i){var id=IDS[i][0],emoji=IDS[i][1],number=String(i+1).padStart(2,"0");
 return '<li><a href="#'+id+'"><span class="toc-num">'+number+'</span><span class="toc-icon" aria-hidden="true">'+emoji+'</span><span>'+esc(s.title)+'</span></a></li>'}).join("");
 var body=sections.map(function(s,i){var id=IDS[i][0],emoji=IDS[i][1];
 var inner=s.cards.map(function(c){return '<article class="guide-card"><h3>'+esc(c.title)+'</h3><ul>'+c.points.map(function(p){return '<li>'+esc(p)+'</li>'}).join("")+'</ul></article>'}).join("");
 return '<section class="guide-section" id="'+id+'" aria-labelledby="'+id+'-title"><div class="guide-section-head"><div class="guide-section-icon" aria-hidden="true">'+emoji+'</div><div><h2 id="'+id+'-title">'+esc(s.title)+'</h2><p class="guide-section-intro">'+esc(s.description)+'</p></div></div><div class="guide-grid">'+inner+'</div><a class="guide-back" href="#guide-contents">↑ '+esc(u.back)+'</a></section>'
 }).join("");
 root.innerHTML=
 '<section class="guide-hero"><div class="guide-topline"><span>'+esc(u.kicker)+'</span><span class="guide-status">'+esc(u.status)+'</span></div>'+
 '<h1>'+esc(u.title)+' <span>'+esc(u.highlight)+'</span></h1>'+
 '<p class="guide-lead">'+esc(u.subtitle)+'</p>'+
 '<p class="guide-warning">'+esc(u.disclaimer)+'</p>'+
 '<div class="guide-metrics"><div class="guide-metric"><strong>4</strong><span>'+esc(u.metricCamps)+'</span></div><div class="guide-metric"><strong>10</strong><span>'+esc(u.metricWeeks)+'</span></div><div class="guide-metric"><strong>200</strong><span>'+esc(u.metricGroups)+'</span></div><div class="guide-metric"><strong>ARK CORE</strong><span>'+esc(u.metricFinal)+'</span></div></div>'+
 '<p class="guide-credit">'+esc(u.credit)+'</p></section>'+
 '<div class="guide-intro"><article><h2>'+esc(u.introTitle)+'</h2><p>'+esc(u.introText)+'</p></article>'+
 '<article><h2>'+esc(u.cautionTitle)+'</h2><p>'+esc(u.cautionText)+'</p></article></div>'+
 '<nav class="guide-toc" id="guide-contents" aria-label="'+esc(u.tocTitle)+'"><div class="guide-toc-top"><h2>'+esc(u.tocTitle)+'</h2><small>'+esc(u.tocHint)+'</small></div><ol class="guide-toc-list">'+cards+'</ol></nav>'+
 '<div class="guide-chapters">'+body+'</div>'+
 '<section class="guide-tail"><h2>'+esc(u.footerTitle)+'</h2><p>'+esc(u.footerText)+'</p></section>'+
 '<a class="guide-fab" id="guideFloatingContents" href="#guide-contents" aria-label="'+esc(u.back)+'" hidden><span class="guide-fab-icon" aria-hidden="true">↑</span><span>'+esc(u.back)+'</span></a>';
 document.title=u.pageTitle+" • ABYX HUB";
 updateFloatingContents();
}
function updateFloatingContents(){
 var button=document.getElementById("guideFloatingContents");
 var toc=document.getElementById("guide-contents");
 if(!button||!toc)return;
 button.hidden=!(toc.getBoundingClientRect().bottom<100);
}
document.addEventListener("DOMContentLoaded",function(){
 render();
 window.addEventListener("scroll",updateFloatingContents,{passive:true});
 window.addEventListener("resize",updateFloatingContents);
 var l=document.getElementById("language");
 if(l)l.addEventListener("change",function(){requestAnimationFrame(render)});
});
window.abyxS8Render=render;
})();