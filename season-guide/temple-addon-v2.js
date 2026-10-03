(() => {
  'use strict';

  const SRC = 'assets/divine-temple-source.webp?v=1';
  const BASE = 1254;

  const crops = {
    overview:[45,335,275,220],
    tasks:[380,350,210,210],
    affinity:[645,350,270,205],
    rewards:[945,350,260,205],
    rulesIcon:[32,675,55,55],
    refreshIcon:[327,675,55,55],
    examplesIcon:[605,675,55,55],
    chestIcon:[900,675,62,55],
    runesIcon:[900,950,70,50],
    refreshGems:[385,995,170,75],
    chestRewards:[900,790,310,150],
    runesStaff:[905,975,115,90]
  };

  function cropMarkup(name, cls, alt) {
    const c = crops[name];
    if (!c) return '';
    const [x,y,w,h] = c;
    const ratio = (w/h).toFixed(4);
    const iw = ((BASE/w)*100).toFixed(2);
    const il = (-(x/w)*100).toFixed(2);
    const it = (-(y/h)*100).toFixed(2);
    return `<span class="${cls}" style="--ratio:${ratio};--iw:${iw}%;--il:${il}%;--it:${it}%"><img src="${SRC}" alt="${alt || ''}" loading="lazy"></span>`;
  }

  function fixTempleThumbnail() {
    document.querySelectorAll('.system-card[data-art="4"] .system-art').forEach((art) => {
      art.style.setProperty('background-position','center 10%','important');
      art.style.setProperty('background-size','cover','important');
      art.style.setProperty('background-repeat','no-repeat','important');
    });
  }

  function addMainStepVisuals(root) {
    const defs = [
      ['overview','Divine Ruins overview'],
      ['tasks','Ruin Tasks'],
      ['affinity','Affinity progression'],
      ['rewards','Divine rewards']
    ];
    root.querySelectorAll('.temple-step').forEach((step, i) => {
      const icon = step.querySelector('.temple-step-icon');
      if (!icon || icon.dataset.sourceVisual === '1' || !defs[i]) return;
      icon.dataset.sourceVisual = '1';
      icon.classList.add('temple-step-source');
      icon.innerHTML = cropMarkup(defs[i][0], 'temple-source-crop', defs[i][1]);
    });
  }

  function replacePanelIcon(panelSelector, cropName, alt) {
    const panel = document.querySelector(`#templeInfographic ${panelSelector}`);
    if (!panel) return;
    const icon = panel.querySelector('.temple-panel-title > span');
    if (!icon || icon.dataset.sourceVisual === '1') return;
    icon.dataset.sourceVisual = '1';
    icon.classList.add('temple-panel-source-icon');
    icon.innerHTML = cropMarkup(cropName, 'temple-source-inline', alt);
  }

  function addPanelVisual(panelSelector, cropName, alt, extraClass='') {
    const panel = document.querySelector(`#templeInfographic ${panelSelector}`);
    if (!panel || panel.querySelector(`.temple-panel-source.${extraClass || 'source-added'}`)) return;
    const title = panel.querySelector('.temple-panel-title');
    if (!title) return;
    const wrap = document.createElement('div');
    wrap.className = `temple-panel-source ${extraClass || 'source-added'}`;
    wrap.innerHTML = cropMarkup(cropName, 'temple-source-crop', alt);
    title.insertAdjacentElement('afterend', wrap);
  }

  function enhanceTemplePopup() {
    const root = document.getElementById('templeInfographic');
    if (!root) return;

    addMainStepVisuals(root);

    replacePanelIcon('.temple-rules','rulesIcon','Task rules');
    replacePanelIcon('.temple-refresh','refreshIcon','Refresh');
    replacePanelIcon('.temple-tasks','examplesIcon','Task examples');
    replacePanelIcon('.temple-chest','chestIcon','Blessed chest');
    replacePanelIcon('.temple-runes','runesIcon','Runes');

    addPanelVisual('.temple-refresh','refreshGems','Rubies used for refreshes','refresh-art');
    addPanelVisual('.temple-chest','chestRewards','Blessed Chest rewards','chest-art');
    addPanelVisual('.temple-runes','runesStaff','Rune used for the Ancient Relic','runes-art');
  }

  function sync() {
    fixTempleThumbnail();
    enhanceTemplePopup();
  }

  function init() {
    sync();

    const observer = new MutationObserver(() => requestAnimationFrame(sync));
    const modal = document.getElementById('detailModal');
    const grid = document.getElementById('systemGrid');
    if (modal) observer.observe(modal,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
    if (grid) observer.observe(grid,{childList:true,subtree:true});

    document.addEventListener('click',(event) => {
      if (event.target.closest('.system-card,.event-card,.search-result,[data-close-detail]')) {
        requestAnimationFrame(sync);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();