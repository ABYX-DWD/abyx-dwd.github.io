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

function loadImageLayer(){
  if(!document.querySelector('link[data-temple-extra-images]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='temple-extra-images.css?v=2';
    link.dataset.templeExtraImages='1';
    document.head.appendChild(link);
  }
  if(!document.querySelector('script[data-temple-extra-images]')){
    const script=document.createElement('script');
    script.src='temple-extra-images.js?v=2';
    script.dataset.templeExtraImages='1';
    document.body.appendChild(script);
  }
}

function loadExtra(){
  if(!document.querySelector('link[data-temple-extra]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='temple-extra.css?v=3';
    link.dataset.templeExtra='1';
    document.head.appendChild(link);
  }

  const existing=document.querySelector('script[data-temple-extra]');
  if(existing){
    loadImageLayer();
    return;
  }

  setTimeout(()=>{
    const baseObserve=MutationObserver.prototype.observe;
    let once=true;
    MutationObserver.prototype.observe=function(target,options){
      if(once&&target&&target.matches&&target.matches('#detailModal .detail-sheet')&&options&&options.childList){
        once=false;
        MutationObserver.prototype.observe=baseObserve;
        options=Object.assign({},options,{subtree:false});
      }
      return baseObserve.call(this,target,options);
    };
    const script=document.createElement('script');
    script.src='temple-extra.js?v=3';
    script.dataset.templeExtra='1';
    script.addEventListener('load',loadImageLayer,{once:true});
    document.body.appendChild(script);
  },0);
}

function later(){requestAnimationFrame(()=>requestAnimationFrame(()=>{moveProTips();loadImageLayer();}));}

function init(){
  loadExtra();
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