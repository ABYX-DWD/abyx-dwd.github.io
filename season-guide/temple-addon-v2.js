(() => {
  'use strict';

  const ART = {
    overview: 'assets/temple-overview.webp?v=3',
    tasks: 'assets/temple-tasks.webp?v=3',
    affinity: 'assets/temple-affinity.webp?v=3',
    rewards: 'assets/temple-rewards.webp?v=3',
    refresh: 'assets/temple-refresh.webp?v=3',
    chest: 'assets/temple-chest.webp?v=3',
    rune: 'assets/temple-rune.webp?v=3'
  };

  function imageMarkup(src, alt) {
    return `<img class="temple-source-image" src="${src}" alt="${alt}" loading="eager" decoding="async">`;
  }

  function fixTempleThumbnail() {
    document.querySelectorAll('.system-card[data-art="4"] .system-art').forEach((art) => {
      art.style.setProperty('background-position', 'center 10%', 'important');
      art.style.setProperty('background-size', 'cover', 'important');
      art.style.setProperty('background-repeat', 'no-repeat', 'important');
    });
  }

  function addMainStepVisuals(root) {
    const defs = [
      [ART.overview, 'Divine Ruins overview'],
      [ART.tasks, 'Ruin Tasks'],
      [ART.affinity, 'Affinity progression'],
      [ART.rewards, 'Divine rewards']
    ];

    root.querySelectorAll('.temple-step').forEach((step, i) => {
      const icon = step.querySelector('.temple-step-icon');
      if (!icon || !defs[i]) return;
      icon.dataset.sourceVisual = '1';
      icon.classList.add('temple-step-source');
      icon.innerHTML = imageMarkup(defs[i][0], defs[i][1]);
    });
  }

  function addPanelImage(panelSelector, src, alt, extraClass) {
    const panel = document.querySelector(`#templeInfographic ${panelSelector}`);
    if (!panel || panel.querySelector(`.${extraClass}`)) return;

    const title = panel.querySelector('.temple-panel-title');
    if (!title) return;

    const wrap = document.createElement('div');
    wrap.className = `temple-panel-source ${extraClass}`;
    wrap.innerHTML = imageMarkup(src, alt);
    title.insertAdjacentElement('afterend', wrap);
  }

  function enhanceTemplePopup() {
    const root = document.getElementById('templeInfographic');
    if (!root) return;

    addMainStepVisuals(root);
    addPanelImage('.temple-refresh', ART.refresh, 'Refresh cost and rubies', 'refresh-art');
    addPanelImage('.temple-chest', ART.chest, 'Blessed Chest rewards', 'chest-art');
    addPanelImage('.temple-runes', ART.rune, 'Rune used for Ancient Relic', 'runes-art');
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

    if (modal) observer.observe(modal, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden']
    });

    if (grid) observer.observe(grid, { childList: true, subtree: true });

    document.addEventListener('click', (event) => {
      if (event.target.closest('.system-card,.event-card,.search-result,[data-close-detail]')) {
        requestAnimationFrame(sync);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
