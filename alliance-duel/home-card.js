(function(){
  function update(){
    var day=AbyxDuel.currentDay();
    document.getElementById('vs-today').textContent=day===0?'Sunday • Prepare for Monday':'Day '+day+' • '+AbyxDuel.days[day-1].name;
    document.getElementById('vs-summary').textContent=day===0?'Save construction and research items. Send gatherers to return after Monday’s reset.':AbyxDuel.days[day-1].summary;
  }
  update(); setInterval(update,60000);
})();
