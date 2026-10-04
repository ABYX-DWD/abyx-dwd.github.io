(() => {
  'use strict';

  const THUMB = 'assets/divine-temple-thumb.webp?v=4';
  const ART = {
    overview: 'assets/temple-overview.webp?v=4',
    tasks: 'assets/temple-tasks.webp?v=4',
    affinity: 'assets/temple-affinity.webp?v=4',
    rewards: 'assets/temple-rewards.webp?v=4',
    refresh: 'assets/temple-refresh.webp?v=5',
    chest: 'assets/temple-chest.webp?v=4',
    rune: 'assets/temple-rune.webp?v=6'
  };

  const art = (src, alt, fit = 'cover', height = '150px') => `
    <figure style="margin:10px 0 14px;border:1px solid rgba(242,182,61,.24);border-radius:12px;overflow:hidden;background:#120804;box-shadow:0 8px 20px rgba(0,0,0,.22);height:${height};">
      <img src="${src}" alt="${alt}" loading="eager" decoding="sync" style="display:block!important;width:100%!important;height:100%!important;object-fit:${fit}!important;opacity:1!important;visibility:visible!important;position:static!important;max-width:none!important;" />
    </figure>`;

  const TEMPLATE = `
    <div id="templeInfographic" class="temple-infographic" data-temple-v4="1" hidden aria-label="Divine Temples Quick Guide">
      <header class="temple-guide-hero">
        <div class="temple-guide-brand">
          <span class="temple-guide-season">RAGNAROK · SEASON 6</span>
          <h2>DIVINE TEMPLES</h2>
          <div class="temple-guide-ribbon">QUICK GUIDE</div>
          <p>EXPLORE <b>✦</b> COMPLETE <b>✦</b> UPGRADE <b>✦</b> GET REWARDS</p>
        </div>
        <div class="temple-guide-visual" aria-hidden="true">
          <span class="temple-sun"></span>
          <span class="temple-pyramid temple-pyramid-a"></span>
          <span class="temple-pyramid temple-pyramid-b"></span>
          <span class="temple-shrine"><i>☥</i></span>
          <span class="temple-anubis">♟</span>
        </div>
      </header>

      <section class="temple-steps" aria-label="Divine Temple progression">
        <article class="temple-step">
          <span class="temple-step-number">1</span>
          ${art(ART.overview, 'Divine Ruins overview', 'cover', '150px')}
          <h3>OVERVIEW</h3>
          <p>Eight Divine Ruins are located in the <strong>Origin Lands</strong>. These ruins release <mark>Ruin Tasks</mark> daily.</p>
        </article>
        <article class="temple-step">
          <span class="temple-step-number">2</span>
          ${art(ART.tasks, 'Ruin task parchment', 'cover', '150px')}
          <h3>DO TASKS</h3>
          <p>Complete tasks to earn survivors <mark>Affinity</mark> with the ruins.</p>
        </article>
        <article class="temple-step">
          <span class="temple-step-number">3</span>
          ${art(ART.affinity, 'Affinity progression', 'cover', '150px')}
          <h3>INCREASE AFFINITY</h3>
          <p>As survivors' Affinity increases, they receive blessing bonuses: <mark>Affinity Buffs</mark>.</p>
        </article>
        <article class="temple-step">
          <span class="temple-step-number">4</span>
          ${art(ART.rewards, 'Divine rewards chest', 'cover', '150px')}
          <h3>GET REWARDS</h3>
          <p>Reaching certain Affinity levels grants powerful <mark>Divine Artifacts</mark>.</p>
        </article>
      </section>

      <div class="temple-info-grid">
        <section class="temple-panel temple-rules">
          <div class="temple-panel-title"><span>☷</span><h3>TASK RULES</h3></div>
          <ol>
            <li><b>1</b><span>Accept tasks from up to <strong>2 different Divine Ruins</strong> per day.</span></li>
            <li><b>2</b><span>Each ruin releases only <strong>one task per day</strong>.</span></li>
            <li><b>3</b><span>All tasks reset daily.</span></li>
            <li><b>4</b><span>Completed tasks reset only after rewards are claimed.</span></li>
            <li><b>5</b><span>Claim rewards before accepting new tasks.</span></li>
          </ol>
        </section>

        <section class="temple-panel temple-refresh">
          <div class="temple-panel-title"><span>⟳</span><h3>REFRESH COST</h3></div>
          ${art(ART.refresh, 'Refresh costs and ruby prices', 'contain', '230px')}
          <p>To choose a different task. The first two refreshes are free.</p>
          <div class="temple-cost-list">
            <div><b>1</b><strong>Free</strong></div>
            <div><b>2</b><strong>Free</strong></div>
            <div><b>3</b><strong><i>◆</i> 100</strong></div>
            <div><b>4</b><strong><i>◆</i> 100</strong></div>
            <div><b>5</b><strong><i>◆</i> 100</strong></div>
            <div><b>6</b><strong><i>◆</i> 200</strong></div>
          </div>
        </section>

        <section class="temple-panel temple-tasks">
          <div class="temple-panel-title"><span>⚔</span><h3>TASK EXAMPLES</h3></div>
          <ul>
            <li><span>☠</span>Kill Mummies / Corrupted</li>
            <li><span>»</span>Use speedups <small>(training, research, construction)</small></li>
            <li><span>▦</span>Consume resources <small>(Titanium, Wisdom Medals, etc.)</small></li>
            <li><span>♟</span>Recruit survivors</li>
            <li><span>✦</span>Use fragments <small>(hero / equipment)</small></li>
            <li><span>⚙</span>Consume Power Cores</li>
            <li><span>▤</span>Consume design blueprints</li>
            <li><span>◆</span>Spend Rubies</li>
            <li><span>🛒</span>Purchase packs</li>
          </ul>
          <div class="temple-tier-note">★ ALL S-TIER TASKS ARE DOUBLED</div>
        </section>

        <aside class="temple-side-stack">
          <section class="temple-panel temple-chest">
            <div class="temple-panel-title"><span>▣</span><h3>BLESSED CHEST</h3></div>
            ${art(ART.chest, 'Blessed Chest rewards', 'cover', '150px')}
            <p>Complete tasks to receive mysterious chests with rich rewards.</p>
          </section>

          <section class="temple-panel temple-runes">
            <div class="temple-panel-title"><span>⚚</span><h3>RUNES</h3></div>
            ${art(ART.rune, 'Rune used for Ancient Relic upgrades', 'contain', '115px')}
            <div class="temple-rune-copy">
              <div class="temple-rune-icon">✧</div>
              <p>Used to upgrade <strong>ancient relic levels</strong>.<br><small>Runes will be recycled after the season ends.</small></p>
            </div>
          </section>
        </aside>
      </div>

      <footer class="temple-guide-footer">
        <span>☥</span><strong>ORIGIN LANDS</strong><span>SEASON 6</span>
      </footer>
    </div>`;

  function installInfographic() {
    const sheet = document.querySelector('#detailModal .detail-sheet');
    if (!sheet) return;

    const current = document.getElementById('templeInfographic');
    if (current && current.dataset.templeV4 === '1') return;
    if (current) current.remove();

    sheet.insertAdjacentHTML('beforeend', TEMPLATE);
  }

  function applyTempleThumbnail() {
    document.querySelectorAll('.system-card[data-art="4"] .system-art').forEach((node) => {
      node.style.setProperty('background-image', `url("${THUMB}")`, 'important');
      node.style.setProperty('background-size', 'cover', 'important');
      node.style.setProperty('background-position', 'center 10%', 'important');
      node.style.setProperty('background-repeat', 'no-repeat', 'important');
    });
  }

  function isTempleDetail() {
    const title = document.getElementById('detailTitle');
    return !!title && title.textContent.trim().toLowerCase() === 'divine temples';
  }

  function syncTempleMode() {
    installInfographic();
    applyTempleThumbnail();

    const modal = document.getElementById('detailModal');
    const sheet = modal && modal.querySelector('.detail-sheet');
    const infographic = document.getElementById('templeInfographic');
    if (!modal || !sheet || !infographic) return;

    const active = !modal.hidden && isTempleDetail();
    sheet.classList.toggle('temple-infographic-mode', active);
    infographic.hidden = !active;
  }

  function init() {
    installInfographic();
    applyTempleThumbnail();

    const modal = document.getElementById('detailModal');
    const title = document.getElementById('detailTitle');
    const grid = document.getElementById('systemGrid');

    const observer = new MutationObserver(() => requestAnimationFrame(syncTempleMode));
    if (modal) observer.observe(modal, { attributes: true, attributeFilter: ['hidden'] });
    if (title) observer.observe(title, { childList: true, subtree: true, characterData: true });
    if (grid) observer.observe(grid, { childList: true, subtree: true });

    document.addEventListener('click', (event) => {
      if (event.target.closest('.system-card,.event-card,.search-result,[data-close-detail]')) {
        requestAnimationFrame(syncTempleMode);
      }
    });

    syncTempleMode();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
