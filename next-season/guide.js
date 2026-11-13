/* ABYX HUB — Dinosaur Era (Season 8). All editorial content is language-specific. */
(function(){
"use strict";
var IDS=[["world","🌿"],["camps","🏕️"],["calendar","🗓️"],["mines","💎"],["passes","🚧"],["outposts","🏛️"],["crystals","⛏️"],["movement","🌀"],["merchant","🏪"],["dinosaurs","🦖"],["progression","🧬"],["research","🎮"],["planning","🧭"],["unknowns","🔎"]];
var ART={world:"world-ark-v4.webp",camps:"four-camps-v4.webp",mines:"territory-v4.webp",merchant:"merchant-guild-v4.webp",dinosaurs:"dinosaurs-v4.webp",progression:"season-progress-v4.webp",planning:"abyx-planning-v4.webp"};
var MAP_LABELS={"en":{"title":"Season map · Conceptual overview","note":"Map layout is illustrative, not official. The region opening order comes from the early Season 8 preview.","first":"East & West open first","later":"North & South open later","blockade":"Ark Blockade Zone · Four camps meet","core":"Ark Forbidden Zone · Ark Core finale","alt":"Schematic map of the Season 8 regions","hero":"Jungle with dinosaurs and futuristic Ark Project base"},"fr":{"title":"Carte de la saison · Vue schématique","note":"Carte illustrative, non officielle. L'ordre d'ouverture des régions provient des premières informations sur la saison 8.","first":"Est et Ouest : ouverture en premier","later":"Nord et Sud : ouverture ensuite","blockade":"Ark Blockade Zone · Rencontre des quatre camps","core":"Ark Forbidden Zone · Finale de l'Ark Core","alt":"Schéma des régions de la saison 8","hero":"Jungle avec dinosaures et base futuriste du projet Ark"},"it":{"title":"Mappa stagionale · Schema illustrativo","note":"Mappa simbolica, non ufficiale. L'ordine di apertura delle regioni proviene dalle prime anticipazioni.","first":"Est e Ovest si aprono prima","later":"Nord e Sud si aprono dopo","blockade":"Ark Blockade Zone · Quattro schieramenti","core":"Ark Forbidden Zone · Finale dell'Ark Core","alt":"Schema delle regioni della stagione 8","hero":"Giungla con dinosauri e base futuristica del Progetto Ark"},"de":{"title":"Saisonkarte · Schematische Übersicht","note":"Die Karte ist symbolisch, nicht offiziell. Die Öffnungsreihenfolge stammt aus der Saisonvorschau.","first":"Ost und West öffnen zuerst","later":"Nord und Süd öffnen später","blockade":"Ark Blockade Zone · Vier Lager treffen aufeinander","core":"Ark Forbidden Zone · Ark-Core-Finale","alt":"Schematische Karte der Saison-8-Regionen","hero":"Dschungel mit Dinosauriern und futuristischer Ark-Forschungsbasis"},"pl":{"title":"Mapa sezonu · Schemat poglądowy","note":"Mapa ma charakter poglądowy, nie jest oficjalna. Kolejność otwierania regionów wynika z zapowiedzi.","first":"Wschód i Zachód otwierają się najpierw","later":"Północ i Południe otwierają się później","blockade":"Ark Blockade Zone · Spotkanie czterech obozów","core":"Ark Forbidden Zone · Finał Ark Core","alt":"Schemat regionów sezonu 8","hero":"Dżungla z dinozaurami i futurystyczną bazą Projektu Ark"},"ru":{"title":"Карта сезона · Условная схема","note":"Это условная, неофициальная карта. Порядок открытия регионов взят из предварительных сведений.","first":"Восток и Запад открываются первыми","later":"Север и Юг открываются позже","blockade":"Ark Blockade Zone · Встреча четырёх лагерей","core":"Ark Forbidden Zone · Финал Ark Core","alt":"Схема регионов сезона 8","hero":"Джунгли с динозаврами и футуристической базой проекта Ark"},"uk":{"title":"Карта сезону · Умовна схема","note":"Це умовна, неофіційна карта. Порядок відкриття регіонів узято з попередніх даних.","first":"Схід і Захід відкриваються першими","later":"Північ і Південь відкриваються пізніше","blockade":"Ark Blockade Zone · Зустріч чотирьох таборів","core":"Ark Forbidden Zone · Фінал Ark Core","alt":"Схема регіонів сезону 8","hero":"Джунглі з динозаврами й футуристичною базою проєкту Ark"}};
MAP_LABELS.nl={"title":"Seizoenskaart · Schematisch overzicht","note":"Deze kaart is een illustratie, geen officiële gamekaart. De volgorde waarin de regio's opengaan, komt uit de vroege informatie over seizoen 8.","first":"Oost en West gaan als eerste open","later":"Noord en Zuid gaan later open","blockade":"Ark Blockade Zone · Hier komen de vier kampen samen","core":"Ark Forbidden Zone · Finale strijd om de Ark Core","alt":"Schematische kaart van de regio's in seizoen 8","hero":"Regenwoud met dinosauriërs en een futuristische basis van Project Ark"};
function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function getLang(){try{var l=localStorage.getItem("abyx_lang")||"en";return (window.ABYX_S8_LANG||{})[l]?l:"en"}catch(e){return "en"}}
function render(){
 var data=(window.ABYX_S8_LANG||{})[getLang()]||(window.ABYX_S8_LANG||{}).en;
 var root=document.getElementById("guide-root");
 if(!data||!root)return;
 var u=data.ui, sections=data.sections, map=MAP_LABELS[getLang()]||MAP_LABELS.en;
 var cards=sections.map(function(s,i){var id=IDS[i][0],emoji=IDS[i][1],number=String(i+1).padStart(2,"0");
 return '<li><a href="#'+id+'"><span class="toc-num">'+number+'</span><span class="toc-icon" aria-hidden="true">'+emoji+'</span><span>'+esc(s.title)+'</span></a></li>'}).join("");
 var body=sections.map(function(s,i){var id=IDS[i][0],emoji=IDS[i][1];
 var inner=s.cards.map(function(c){return '<article class="guide-card"><h3>'+esc(c.title)+'</h3><ul>'+c.points.map(function(p){return '<li>'+esc(p)+'</li>'}).join("")+'</ul></article>'}).join("");
 var illustration=ART[id]?'<figure class="guide-chapter-art"><img src="./art/'+ART[id]+'" loading="lazy" decoding="async" alt="'+esc(s.title)+'"></figure>':"";
 return '<section class="guide-section" id="'+id+'" aria-labelledby="'+id+'-title"><div class="guide-section-head"><div class="guide-section-icon" aria-hidden="true">'+emoji+'</div><div><h2 id="'+id+'-title">'+esc(s.title)+'</h2><p class="guide-section-intro">'+esc(s.description)+'</p></div></div>'+illustration+'<div class="guide-grid">'+inner+'</div><a class="guide-back" href="#guide-contents">↑ '+esc(u.back)+'</a></section>'
 }).join("");
 root.innerHTML=
 '<section class="guide-hero"><div class="guide-topline"><span>'+esc(u.kicker)+'</span><span class="guide-status">'+esc(u.status)+'</span></div>'+
 '<h1>'+esc(u.title)+' <span>'+esc(u.highlight)+'</span></h1>'+
 '<p class="guide-lead">'+esc(u.subtitle)+'</p>'+ 
 '<figure class="guide-hero-art"><img src="./art/hero-dinosaur-era.webp" width="1400" height="475" loading="eager" decoding="async" alt="'+esc(map.hero)+'"></figure>'+
 '<p class="guide-warning">'+esc(u.disclaimer)+'</p>'+
 '<div class="guide-metrics"><div class="guide-metric"><strong>4</strong><span>'+esc(u.metricCamps)+'</span></div><div class="guide-metric"><strong>10</strong><span>'+esc(u.metricWeeks)+'</span></div><div class="guide-metric"><strong>200</strong><span>'+esc(u.metricGroups)+'</span></div><div class="guide-metric"><strong>ARK CORE</strong><span>'+esc(u.metricFinal)+'</span></div></div>'+
 '<p class="guide-credit">'+esc(u.credit)+'</p></section>'+
 '<div class="guide-intro"><article><h2>'+esc(u.introTitle)+'</h2><p>'+esc(u.introText)+'</p></article>'+
 '<article><h2>'+esc(u.cautionTitle)+'</h2><p>'+esc(u.cautionText)+'</p></article></div>'+
 '<nav class="guide-toc" id="guide-contents" aria-label="'+esc(u.tocTitle)+'"><div class="guide-toc-top"><h2>'+esc(u.tocTitle)+'</h2><small>'+esc(u.tocHint)+'</small></div><ol class="guide-toc-list">'+cards+'</ol></nav>'+
 '<section class="guide-map" aria-labelledby="guide-map-title"><div class="guide-map-head"><h2 id="guide-map-title">'+esc(map.title)+'</h2><p>'+esc(map.note)+'</p></div><div class="guide-map-layout"><figure class="guide-map-figure"><img src="./art/season-map.webp" width="1200" height="520" loading="lazy" decoding="async" alt="'+esc(map.alt)+'"></figure><div class="guide-map-key"><div><i class="guide-map-dot zone-first" aria-hidden="true"></i><span>'+esc(map.first)+'</span></div><div><i class="guide-map-dot zone-later" aria-hidden="true"></i><span>'+esc(map.later)+'</span></div><div><i class="guide-map-dot zone-blockade" aria-hidden="true"></i><span>'+esc(map.blockade)+'</span></div><div><i class="guide-map-dot zone-core" aria-hidden="true"></i><span>'+esc(map.core)+'</span></div></div></div></section>'+
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