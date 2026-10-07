(function(){
  function update(){
    var day=AbyxDuel.currentDay(),locale=abyxDuelLocale(),card=document.querySelector('.vs-daily');
    card.querySelector('.section-eyebrow').textContent=locale.guide;
    card.querySelector('.btn').textContent=locale.cardAction;
    card.setAttribute('aria-label',locale.title+' — '+locale.cardAction);
    document.getElementById('vs-today').textContent=day===0?locale.sunday:locale.day+' '+day+' • '+locale.names[day-1];
    document.getElementById('vs-summary').textContent=day===0?locale.sundayText:locale.summaries[day-1];
  }
  window.addEventListener('abyx:language',update);
  update();setInterval(update,60000);
})();
