(()=>{
  'use strict';

  const questSprites=['sprite-qmenu','sprite-qchoose','sprite-qoptions'];
  const buffSprites={
    shou:'sprite-shou',
    seth:'sprite-seth',
    nout:'sprite-nout',
    tefnout:'sprite-tefnout',
    geb:'sprite-geb',
    nephthys:'sprite-nephthys',
    sobek:'sprite-sobek',
    isis:'sprite-isis'
  };

  function patchQuestImages(){
    document.querySelectorAll('#templeQuestExtra .temple-quest-card').forEach((card,i)=>{
      const visual=card.querySelector('.quest-visual');
      if(!visual || !questSprites[i]) return;
      visual.className=`quest-visual temple-extra-sprite ${questSprites[i]}`;
      visual.replaceChildren();
      visual.removeAttribute('aria-hidden');
      visual.setAttribute('role','img');
      visual.setAttribute('aria-label',['Temple Quest menu','Temple selection and GO button','Temple mission options'][i]);
    });
  }

  function patchBuffImages(){
    document.querySelectorAll('#templeBuffExtra .temple-buff-card').forEach(card=>{
      const id=card.dataset.buff;
      const visual=card.querySelector('.temple-buff-visual');
      if(!visual || !buffSprites[id]) return;
      visual.className=`temple-buff-visual temple-extra-sprite ${buffSprites[id]}`;
      visual.replaceChildren();
      visual.setAttribute('role','img');
      visual.setAttribute('aria-label',`Temple of ${id}`);
    });
  }

  function patch(){
    patchQuestImages();
    patchBuffImages();
  }

  function later(){requestAnimationFrame(()=>requestAnimationFrame(patch));}

  function init(){
    const sheet=document.querySelector('#detailModal .detail-sheet');
    if(sheet){
      new MutationObserver(later).observe(sheet,{childList:true,subtree:true});
    }
    document.addEventListener('click',e=>{
      if(e.target.closest('.system-card,.search-result,.abyx-lang-option')) later();
    });
    document.getElementById('languageSelect')?.addEventListener('change',later);
    later();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
