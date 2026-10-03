(() => {
  'use strict';

  const TEMPLATE = `
    <div id="templeInfographic" class="temple-infographic" hidden aria-label="Divine Temples Quick Guide">
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
          <div class="temple-step-icon">𓉐</div>
          <h3>OVERVIEW</h3>
          <p>Eight Divine Ruins are located in the <strong>Origin Lands</strong>. These ruins release <mark>Ruin Tasks</mark> daily.</p>
        </article>
        <article class="temple-step">
          <span class="temple-step-number">2</span>
          <div class="temple-step-icon">☑</div>
          <h3>DO TASKS</h3>
          <p>Complete tasks to earn survivors <mark>Affinity</mark> with the ruins.</p>
        </article>
        <article class="temple-step">
          <span class="temple-step-number">3</span>
          <div class="temple-step-icon">△</div>
          <h3>INCREASE AFFINITY</h3>
          <p>As survivors' Affinity increases, they receive blessing bonuses: <mark>Affinity Buffs</mark>.</p>
        </article>
        <article class="temple-step">
          <span class="temple-step-number">4</span>
          <div class="temple-step-icon">▣</div>
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
            <p>Complete tasks to receive mysterious chests with rich rewards.</p>
            <div class="temple-rewards" aria-label="Example rewards">
              <span>🎫</span><span>✪</span><span>🧩</span><span>◉</span>
              <span>△</span><span>»</span><span>⚒</span><span>◆</span>
            </div>
          </section>

          <section class="temple-panel temple-runes">
            <div class="temple-panel-title"><span>⚚</span><h3>RUNES</h3></div>
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

  function ensureInfographic() {
    const sheet = document.querySelector('#detailModal .detail-sheet');
    if (!sheet || document.getElementById('templeInfographic')) return;
    sheet.insertAdjacentHTML('beforeend', TEMPLATE);
  }

  function isTempleDetail() {
    const title = document.getElementById('detailTitle');
    return !!title && title.textContent.trim().toLowerCase() === 'divine temples';
  }

  function syncTempleMode() {
    ensureInfographic();
    const modal = document.getElementById('detailModal');
    const sheet = modal && modal.querySelector('.detail-sheet');
    const infographic = document.getElementById('templeInfographic');
    if (!modal || !sheet || !infographic) return;

    const active = !modal.hidden && isTempleDetail();
    sheet.classList.toggle('temple-infographic-mode', active);
    infographic.hidden = !active;
    if (active) {
      sheet.setAttribute('aria-label', 'Divine Temples Quick Guide');
    } else {
      sheet.removeAttribute('aria-label');
    }
  }

  function init() {
    ensureInfographic();

    const modal = document.getElementById('detailModal');
    const title = document.getElementById('detailTitle');
    if (!modal) return;

    const observer = new MutationObserver(() => requestAnimationFrame(syncTempleMode));
    observer.observe(modal, { attributes: true, attributeFilter: ['hidden'] });
    if (title) observer.observe(title, { childList: true, characterData: true, subtree: true });

    document.addEventListener('click', (event) => {
      if (event.target.closest('.system-card, .event-card, .search-result')) {
        requestAnimationFrame(syncTempleMode);
      }
    });

    syncTempleMode();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();