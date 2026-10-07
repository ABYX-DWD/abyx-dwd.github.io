(function(){
  var tasks=[
    ['Gather wood, electricity, iron and coins. Arrange returns after reset.','Build: use Precision Parts and construction speedups.','Research: use Wisdom Medals and research speedups.','Activate Capital bonuses.','Save for Tuesday: recruitment tickets (free recruit only), hero and weapon shards, and radar events.'],
    ['Complete radar events.','Use weapon shards.','Perform advanced recruitment.','Use gold, purple and blue hero shards.','Save for Wednesday: Energy Cores, Lucky Chests and DX Blueprints.'],
    ['Escort gold trucks and complete orange Shadow Operation missions.','Use Energy Cores and DX Blueprints; open Lucky Chests.','Train and promote soldiers; use training speedups.','Aim for at least 2 million points and keep pushing.','Save for Thursday: chip chests, gears, titanium alloy, Design Blueprints and radar events.'],
    ['Open chip chests and complete radar events.','Use gears, titanium alloy, Design Blueprints and Precision Parts.','Use building, research and soldier training/promotion speedups.','Kill roaming zombies. Launch rallies and kill zombies.'],
    ['Open chip chests; use DX Blueprints and basic/advanced Training Protocols.','Use weapon shards, gold/purple/blue hero shards and Energy Cores.','Use Special Ops Honor Medals, Precision Parts and Design Blueprints; upgrade red D6 equipment.','Use Potential Chips, titanium alloy, Nutrition Potions and Tactical Rations.','Use construction, research and training/promotion speedups, Wisdom Medals and gears.','Pack purchases also score.'],
    ['Escort gold trucks and complete orange Shadow Operation missions.','Attack enemy bases and loot their resources. Defeat enemy troops; defeating the VS opponent gives bonus points.','Troop losses also score points.','Use any speedups, including healing. Pack purchases also score.','Move in groups! Ask in alliance chat and team up — you’re stronger together!']
  ];
  var selected,followToday=!/^#day-[1-6]$/.test(location.hash),lastCurrent;
  var img=document.getElementById('guide-image');
  function render(day){
    selected=day;var data=AbyxDuel.days[day-1],url='assets/day-'+day+'.webp';
    document.getElementById('day-label').textContent='Day '+day+' • '+data.name;
    document.getElementById('day-title').textContent=data.theme;
    document.getElementById('day-summary').textContent=data.summary;
    document.querySelectorAll('[data-day]').forEach(function(a){a.setAttribute('aria-current',Number(a.dataset.day)===day?'true':'false');});
    document.getElementById('image-error').hidden=true;img.src=url;img.alt='ABYX Alliance Duel Day '+day+' — '+data.name+' tasks';
    var dl=document.getElementById('download');dl.href=url;dl.download='ABYX-VS-Day-'+day+'.webp';document.getElementById('full-size').href=url;
    var ul=document.createElement('ul');tasks[day-1].forEach(function(t){var li=document.createElement('li');li.textContent=t;ul.appendChild(li);});document.getElementById('task-text').replaceChildren(ul);
  }
  function tick(){
    var now=new Date(),current=AbyxDuel.currentDay(now);
    document.getElementById('sunday').hidden=current!==0;
    if(followToday && current!==lastCurrent)render(current||1);
    lastCurrent=current;
    var next=new Date(now);next.setUTCHours(24,0,0,0);var mins=Math.ceil((next-now)/60000);
    document.getElementById('reset-clock').textContent='Reset in '+Math.floor(mins/60)+'h '+(mins%60)+'m • 00:00 UTC';
  }
  window.addEventListener('hashchange',function(){var m=location.hash.match(/^#day-([1-6])$/);followToday=!m;if(m)render(Number(m[1]));else{lastCurrent=undefined;tick();}});
  document.querySelectorAll('[data-day]').forEach(function(a){a.addEventListener('click',function(){followToday=false;render(Number(a.dataset.day));});});
  document.getElementById('today').addEventListener('click',function(){followToday=true;history.replaceState(null,'',location.pathname+location.search);lastCurrent=undefined;tick();});
  img.addEventListener('error',function(){document.getElementById('image-error').hidden=false;});
  var m=location.hash.match(/^#day-([1-6])$/);if(m)render(Number(m[1]));tick();setInterval(tick,30000);
})();
