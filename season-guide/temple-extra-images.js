(()=>{
  'use strict';

  const buffSprites={shou:'sprite-shou',seth:'sprite-seth',nout:'sprite-nout',tefnout:'sprite-tefnout',geb:'sprite-geb',nephthys:'sprite-nephthys',sobek:'sprite-sobek',isis:'sprite-isis'};

  const questVisuals=[
    '<div class="qv-ui qv-menu"><div class="qv-menu-rail"><span>◈</span><span>⌕</span><span class="is-target">▤</span></div><div class="qv-menu-pointer">☝</div><div class="qv-menu-badge">1</div></div>',
    '<div class="qv-ui qv-list"><div class="qv-mission-row"><span class="qv-hero">𓂀</span><span class="qv-mission-copy"><b>Temple of Seth</b><small>Mission</small></span><span class="qv-go">GO</span></div><div class="qv-mission-row is-alt"><span class="qv-hero">𓃗</span><span class="qv-mission-copy"><b>Temple of Shou</b><small>Mission</small></span><span class="qv-go">GO</span></div></div>',
    '<div class="qv-ui qv-options"><div class="qv-rank">A</div><div class="qv-task"><b>Mission objective</b><small>Choose the best mission</small></div><div class="qv-actions"><span class="qv-refresh">Free Refresh</span><span class="qv-accept">Accept Mission</span></div><div class="qv-upgrade">⚡ Upgrade to <b>A or S</b></div></div>'
  ];

  function patchQuestImages(){
    document.querySelectorAll('#templeQuestExtra .temple-quest-card').forEach((card,i)=>{
      const visual=card.querySelector('.quest-visual');
      if(!visual||!questVisuals[i])return;
      visual.className='quest-visual quest-ui-shell';
      if(visual.dataset.questVisual!==String(i)){
        visual.innerHTML=questVisuals[i];
        visual.dataset.questVisual=String(i);
      }
      visual.removeAttribute('aria-hidden');
      visual.setAttribute('role','img');
      visual.setAttribute('aria-label',['Temple Quest menu','Temple selection and GO button','Temple mission options'][i]);
    });
  }

  function patchBuffImages(){
    document.querySelectorAll('#templeBuffExtra .temple-buff-card').forEach(card=>{
      const id=card.dataset.buff,visual=card.querySelector('.temple-buff-visual');
      if(!visual||!buffSprites[id])return;
      visual.className=`temple-buff-visual temple-extra-sprite ${buffSprites[id]}`;
      visual.replaceChildren();
      visual.setAttribute('role','img');
      visual.setAttribute('aria-label',`Temple of ${id}`);
    });
  }

  function patch(){patchQuestImages();patchBuffImages();}
  function later(){requestAnimationFrame(()=>requestAnimationFrame(patch));}
  function init(){
    const sheet=document.querySelector('#detailModal .detail-sheet');
    if(sheet)new MutationObserver(later).observe(sheet,{childList:true,subtree:true});
    document.addEventListener('click',e=>{if(e.target.closest('.system-card,.search-result,.abyx-lang-option'))later();});
    document.getElementById('languageSelect')?.addEventListener('change',later);
    later();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();