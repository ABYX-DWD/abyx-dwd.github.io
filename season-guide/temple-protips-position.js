(()=>{'use strict';
function moveProTips(){
  const root=document.getElementById('templeInfographic');
  const tips=document.getElementById('templeProTips');
  const steps=root?.querySelector('.temple-steps');
  if(root&&tips&&steps&&tips.nextElementSibling!==steps){
    steps.before(tips);
    tips.style.marginTop='14px';
    tips.style.marginBottom='14px';
  }
}
function later(){requestAnimationFrame(()=>requestAnimationFrame(moveProTips));}
function init(){
  const root=document.getElementById('templeInfographic');
  if(root)new MutationObserver(later).observe(root,{childList:true});
  document.getElementById('languageSelect')?.addEventListener('change',later);
  document.addEventListener('click',e=>{if(e.target.closest('.abyx-lang-option,.system-card,.search-result'))later();});
  const modal=document.getElementById('detailModal');
  if(modal)new MutationObserver(later).observe(modal,{attributes:true,attributeFilter:['hidden']});
  later();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();