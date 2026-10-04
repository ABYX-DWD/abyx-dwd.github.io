(()=>{'use strict';
const original=MutationObserver.prototype.observe;
let patched=false;
MutationObserver.prototype.observe=function(target,options){
  if(!patched&&target&&target.matches&&target.matches('#detailModal .detail-sheet')&&options&&options.childList&&options.subtree&&!options.attributes){
    patched=true;
    MutationObserver.prototype.observe=original;
    options=Object.assign({},options,{subtree:false});
  }
  return original.call(this,target,options);
};

function moveProTips(){
  const root=document.getElementById('templeInfographic');
  const tips=document.getElementById('templeProTips');
  const steps=root?.querySelector('.temple-steps');
  if(!root||!tips||!steps)return;
  if(tips.nextElementSibling!==steps)steps.before(tips);
  tips.style.marginTop='14px';
  tips.style.marginBottom='14px';
}

function later(){requestAnimationFrame(()=>requestAnimationFrame(moveProTips));}

function init(){
  const root=document.getElementById('templeInfographic');
  if(root)new MutationObserver(later).observe(root,{childList:true});
  const modal=document.getElementById('detailModal');
  if(modal)new MutationObserver(later).observe(modal,{attributes:true,attributeFilter:['hidden']});
  document.getElementById('languageSelect')?.addEventListener('change',later);
  document.addEventListener('click',e=>{
    if(e.target.closest('.abyx-lang-option,.system-card,.search-result'))later();
  });
  later();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();