/* Game days change at 00:00 UTC, independent of the viewer's timezone. */
window.AbyxDuel = {
  days: [
    {day:1, name:'Monday', theme:'Shelter expansion', summary:'Gather, build and research. Save hero resources and radar events for Tuesday.'},
    {day:2, name:'Tuesday', theme:'Hero initiative', summary:'Complete radar events, recruit and use hero and weapon shards.'},
    {day:3, name:'Wednesday', theme:'Keep progressing', summary:'Escort gold trucks, complete orange missions, upgrade equipment and train soldiers.'},
    {day:4, name:'Thursday', theme:'Arms expert', summary:'Open chip chests, develop your equipment and hunt zombies with the alliance.'},
    {day:5, name:'Friday', theme:'Holistic growth', summary:'Use your saved development items. Every contribution counts!'},
    {day:6, name:'Saturday', theme:'Final battle', summary:'Attack and loot together. Ask in alliance chat and move in groups!'}
  ],
  currentDay: function(date) { return (date || new Date()).getUTCDay(); }
};
