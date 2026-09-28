(() => {
  'use strict';

  const LANG_KEY = '434-ragnarok-language-v2';
  const supported = ['en','fr','it','de','pl'];
  const localeMap = { en:'en-US', fr:'fr-FR', it:'it-IT', de:'de-DE', pl:'pl-PL' };

  const ui = {
    en:{navRoadmap:'Road Map',navSystems:'Season Systems',search:'Search',season6:'SEASON 6',originLands:'ORIGIN LANDS II',roadmapTitle:'ROAD MAP',roadmapSubtitle:'Six weeks. One path. Everything important at a glance.',viewRoadmap:'View the road map',seasonSystems:'SEASON SYSTEMS',alwaysWorthKnowing:'Always worth knowing',systemsIntro:'These mechanics run alongside the weekly calendar. Tap a card for the essentials.',sixWeekJourney:'THE 6-WEEK JOURNEY',seasonRoadmap:'Season Road Map',guideAvailable:'Guide available',calendarOnly:'Calendar info',calendarDisclaimer:'Dates and content may change. If anything differs in game, follow the official Dark War Survival announcements.',footerTitle:'Ragnarok Season 6 · Interactive Road Map',footerSub:'Built for quick use on mobile and desktop.',findFast:'FIND IT FAST',searchGuide:'Search the season',searchPlaceholder:'Search Outpost, Temple, Merchant...',noResults:'No result. Try another event or system.',week:'WEEK',now:'NOW',startsIn:'Season starts in {n} day(s)',startsToday:'Season starts today',seasonLive:'Season in progress · Week {n}',seasonEnded:'Season completed',days:'days',day:'day',guide:'GUIDE',calendar:'CALENDAR',when:'WHEN?',where:'WHERE?',what:'WHAT?',keyRule:'KEY RULE',tips:'KEY POINTS'},
    fr:{navRoadmap:'Road Map',navSystems:'Systèmes de saison',search:'Recherche',season6:'SAISON 6',originLands:'ORIGIN LANDS II',roadmapTitle:'ROAD MAP',roadmapSubtitle:'Six semaines. Un seul chemin. Tout ce qui compte en un coup d’œil.',viewRoadmap:'Voir la Road Map',seasonSystems:'SYSTÈMES DE SAISON',alwaysWorthKnowing:'À connaître pendant toute la saison',systemsIntro:'Ces mécaniques fonctionnent en parallèle du calendrier hebdomadaire. Clique sur une fiche pour l’essentiel.',sixWeekJourney:'LE PARCOURS EN 6 SEMAINES',seasonRoadmap:'Road Map de la saison',guideAvailable:'Guide disponible',calendarOnly:'Info calendrier',calendarDisclaimer:'Les dates et le contenu peuvent évoluer. En cas de différence en jeu, réfère-toi aux annonces officielles de Dark War Survival.',footerTitle:'Ragnarok Saison 6 · Road Map interactive',footerSub:'Pensé pour une consultation rapide sur mobile et PC.',findFast:'TROUVER RAPIDEMENT',searchGuide:'Rechercher dans la saison',searchPlaceholder:'Rechercher Outpost, Temple, Merchant...',noResults:'Aucun résultat. Essaie un autre événement ou système.',week:'SEMAINE',now:'EN COURS',startsIn:'La saison commence dans {n} jour(s)',startsToday:'La saison commence aujourd’hui',seasonLive:'Saison en cours · Semaine {n}',seasonEnded:'Saison terminée',days:'jours',day:'jour',guide:'GUIDE',calendar:'CALENDRIER',when:'QUAND ?',where:'OÙ ?',what:'QUOI ?',keyRule:'RÈGLE CLÉ',tips:'POINTS CLÉS'},
    it:{navRoadmap:'Road Map',navSystems:'Sistemi stagionali',search:'Cerca',season6:'STAGIONE 6',originLands:'ORIGIN LANDS II',roadmapTitle:'ROAD MAP',roadmapSubtitle:'Sei settimane. Un solo percorso. Tutto ciò che conta a colpo d’occhio.',viewRoadmap:'Vedi la Road Map',seasonSystems:'SISTEMI STAGIONALI',alwaysWorthKnowing:'Da sapere per tutta la stagione',systemsIntro:'Queste meccaniche funzionano insieme al calendario settimanale. Tocca una scheda per i dettagli essenziali.',sixWeekJourney:'IL PERCORSO DI 6 SETTIMANE',seasonRoadmap:'Road Map stagionale',guideAvailable:'Guida disponibile',calendarOnly:'Info calendario',calendarDisclaimer:'Date e contenuti possono cambiare. In caso di differenze, segui gli annunci ufficiali di Dark War Survival.',footerTitle:'Ragnarok Stagione 6 · Road Map interattiva',footerSub:'Pensata per uso rapido su smartphone e desktop.',findFast:'TROVA SUBITO',searchGuide:'Cerca nella stagione',searchPlaceholder:'Cerca Outpost, Temple, Merchant...',noResults:'Nessun risultato. Prova un altro evento o sistema.',week:'SETTIMANA',now:'ORA',startsIn:'La stagione inizia tra {n} giorno/i',startsToday:'La stagione inizia oggi',seasonLive:'Stagione in corso · Settimana {n}',seasonEnded:'Stagione terminata',days:'giorni',day:'giorno',guide:'GUIDA',calendar:'CALENDARIO',when:'QUANDO?',where:'DOVE?',what:'COSA?',keyRule:'REGOLA CHIAVE',tips:'PUNTI CHIAVE'},
    de:{navRoadmap:'Road Map',navSystems:'Saison-Systeme',search:'Suche',season6:'SAISON 6',originLands:'ORIGIN LANDS II',roadmapTitle:'ROAD MAP',roadmapSubtitle:'Sechs Wochen. Ein Weg. Alles Wichtige auf einen Blick.',viewRoadmap:'Road Map ansehen',seasonSystems:'SAISON-SYSTEME',alwaysWorthKnowing:'Während der ganzen Saison wichtig',systemsIntro:'Diese Mechaniken laufen parallel zum Wochenkalender. Öffne eine Karte für die wichtigsten Infos.',sixWeekJourney:'DIE 6-WOCHEN-REISE',seasonRoadmap:'Saison Road Map',guideAvailable:'Guide verfügbar',calendarOnly:'Kalenderinfo',calendarDisclaimer:'Termine und Inhalte können sich ändern. Bei Abweichungen gelten die offiziellen Dark War Survival-Ankündigungen.',footerTitle:'Ragnarok Saison 6 · Interaktive Road Map',footerSub:'Für schnelle Nutzung auf Handy und Desktop.',findFast:'SCHNELL FINDEN',searchGuide:'Saison durchsuchen',searchPlaceholder:'Outpost, Temple, Merchant suchen...',noResults:'Kein Ergebnis. Versuche ein anderes Event oder System.',week:'WOCHE',now:'JETZT',startsIn:'Die Saison startet in {n} Tag(en)',startsToday:'Die Saison startet heute',seasonLive:'Saison läuft · Woche {n}',seasonEnded:'Saison beendet',days:'Tage',day:'Tag',guide:'GUIDE',calendar:'KALENDER',when:'WANN?',where:'WO?',what:'WAS?',keyRule:'WICHTIGE REGEL',tips:'WICHTIGE PUNKTE'},
    pl:{navRoadmap:'Road Map',navSystems:'Systemy sezonowe',search:'Szukaj',season6:'SEZON 6',originLands:'ORIGIN LANDS II',roadmapTitle:'ROAD MAP',roadmapSubtitle:'Sześć tygodni. Jedna droga. Wszystko, co ważne, na pierwszy rzut oka.',viewRoadmap:'Zobacz Road Map',seasonSystems:'SYSTEMY SEZONOWE',alwaysWorthKnowing:'Warto znać przez cały sezon',systemsIntro:'Te mechaniki działają równolegle z kalendarzem tygodniowym. Otwórz kartę, aby zobaczyć najważniejsze informacje.',sixWeekJourney:'6-TYGODNIOWA DROGA',seasonRoadmap:'Road Map sezonu',guideAvailable:'Poradnik dostępny',calendarOnly:'Informacja kalendarza',calendarDisclaimer:'Daty i zawartość mogą się zmienić. W razie różnic sprawdź oficjalne ogłoszenia Dark War Survival.',footerTitle:'Ragnarok Sezon 6 · Interaktywna Road Map',footerSub:'Do szybkiego użycia na telefonie i komputerze.',findFast:'ZNAJDŹ SZYBKO',searchGuide:'Przeszukaj sezon',searchPlaceholder:'Szukaj Outpost, Temple, Merchant...',noResults:'Brak wyników. Spróbuj innego wydarzenia lub systemu.',week:'TYDZIEŃ',now:'TERAZ',startsIn:'Sezon zaczyna się za {n} dni',startsToday:'Sezon zaczyna się dziś',seasonLive:'Sezon trwa · Tydzień {n}',seasonEnded:'Sezon zakończony',days:'dni',day:'dzień',guide:'PORADNIK',calendar:'KALENDARZ',when:'KIEDY?',where:'GDZIE?',what:'CO?',keyRule:'KLUCZOWA ZASADA',tips:'NAJWAŻNIEJSZE'}
  };

  const dayNames = {
    en:{mon:'Monday',tue:'Tuesday',wed:'Wednesday',thu:'Thursday',fri:'Friday',sat:'Saturday',sun:'Sunday',ongoing:'Ongoing',weekly:'Weekly'},
    fr:{mon:'Lundi',tue:'Mardi',wed:'Mercredi',thu:'Jeudi',fri:'Vendredi',sat:'Samedi',sun:'Dimanche',ongoing:'En continu',weekly:'Hebdo'},
    it:{mon:'Lunedì',tue:'Martedì',wed:'Mercoledì',thu:'Giovedì',fri:'Venerdì',sat:'Sabato',sun:'Domenica',ongoing:'In corso',weekly:'Settimanale'},
    de:{mon:'Montag',tue:'Dienstag',wed:'Mittwoch',thu:'Donnerstag',fri:'Freitag',sat:'Samstag',sun:'Sonntag',ongoing:'Laufend',weekly:'Wöchentlich'},
    pl:{mon:'Poniedziałek',tue:'Wtorek',wed:'Środa',thu:'Czwartek',fri:'Piątek',sat:'Sobota',sun:'Niedziela',ongoing:'Przez cały sezon',weekly:'Co tydzień'}
  };

  const L = (en,fr,it,de,pl) => ({en,fr,it,de,pl});

  const details = {
    kickoff:{icon:'☠',kicker:L('WEEK 1','SEMAINE 1','SETTIMANA 1','WOCHE 1','TYDZIEŃ 1'),title:L('Season Kickoff','Lancement de saison','Inizio stagione','Saisonstart','Start sezonu'),lead:L('Hunt the highest-level Mummies you can handle to help your camp climb the rankings.','Élimine les Momies du plus haut niveau possible pour faire progresser ton camp au classement.','Elimina le Mummie del livello più alto possibile per far salire il tuo campo in classifica.','Besiege möglichst hochstufige Mumien, damit dein Camp im Ranking steigt.','Pokonuj Mumie na najwyższym możliwym poziomie, aby twój obóz awansował w rankingu.'),facts:[['when',L('Week 1 · 6 days','Semaine 1 · 6 jours','Settimana 1 · 6 giorni','Woche 1 · 6 Tage','Tydzień 1 · 6 dni')],['what',L('Camp ranking event','Événement de classement de camp','Evento classifica campo','Camp-Ranglisten-Event','Wydarzenie rankingowe obozu')]],tips:[L('The higher the Mummy level and the earlier the kill, the better the ranking contribution.','Plus le niveau de la Momie est élevé et plus tu la tues tôt, meilleure est la contribution au classement.','Più alto è il livello della Mummia e prima la elimini, migliore è il contributo alla classifica.','Je höher das Mumien-Level und je früher der Kill, desto besser für das Ranking.','Im wyższy poziom Mumii i im wcześniejsze zabicie, tym lepszy wynik rankingowy.')]},
    outpost:{icon:'⚔',kicker:L('TERRITORY','TERRITOIRE','TERRITORIO','TERRITORIUM','TERYTORIUM'),title:L('Outpost','Outpost','Outpost','Outpost','Outpost'),lead:L('Neutral Outposts are your first territorial stepping stones. Defeat NPC guards and remove all durability to capture them.','Les Outposts neutres sont les premières étapes d’expansion. Élimine les gardes PNJ puis réduis toute la durabilité pour les capturer.','Gli Outpost neutrali sono i primi passi dell’espansione. Sconfiggi le guardie NPC e azzera la durabilità.','Neutrale Outposts sind die ersten Schritte der Expansion. Besiege NPC-Wachen und reduziere die Haltbarkeit auf null.','Neutralne Outposty to pierwszy krok ekspansji. Pokonaj strażników NPC i zbij wytrzymałość do zera.'),facts:[['what',L('Capture and connect territory','Capturer et relier les territoires','Cattura e collega territori','Gebiete erobern und verbinden','Zdobywaj i łącz terytoria')],['keyRule',L('8-hour truce after ownership changes','Trêve de 8 h après changement de propriétaire','Tregua di 8 ore dopo il cambio di proprietà','8 Std. Waffenruhe nach Besitzerwechsel','8 godzin rozejmu po zmianie właściciela')]],tips:[L('Outposts with an owner have no NPC guards.','Un Outpost déjà possédé n’a plus de gardes PNJ.','Gli Outpost già posseduti non hanno guardie NPC.','Outposts mit Besitzer haben keine NPC-Wachen.','Outpost z właścicielem nie ma strażników NPC.'),L('There is no limit to how many Outposts an alliance may capture.','Il n’y a pas de limite au nombre d’Outposts qu’une alliance peut capturer.','Non c’è limite al numero di Outpost catturabili da un’alleanza.','Es gibt kein Limit für die Anzahl eroberbarer Outposts.','Sojusz nie ma limitu liczby zdobytych Outpostów.')]},
    temples:{icon:'☥',kicker:L('DIVINE TEMPLES','DIVINE TEMPLES','DIVINE TEMPLES','DIVINE TEMPLES','DIVINE TEMPLES'),title:L('Divine Temples','Divine Temples','Divine Temples','Divine Temples','Divine Temples'),lead:L('Eight Divine Ruins release daily tasks. Complete tasks to gain Affinity, unlock buffs and earn Divine Artifacts.','Huit Divine Ruins proposent des tâches quotidiennes. Accomplis-les pour gagner de l’Affinity, débloquer des buffs et obtenir des Divine Artifacts.','Otto Divine Ruins offrono task giornalieri. Completali per ottenere Affinity, buff e Divine Artifacts.','Acht Divine Ruins geben tägliche Aufgaben. Erledige sie für Affinity, Buffs und Divine Artifacts.','Osiem Divine Ruins daje codzienne zadania. Wykonuj je, aby zdobywać Affinity, buffy i Divine Artifacts.'),facts:[['what',L('Daily Ruin Tasks','Tâches quotidiennes de Ruins','Ruins Tasks giornaliere','Tägliche Ruins Tasks','Codzienne Ruins Tasks')],['keyRule',L('Tasks from up to 2 different Ruins per day','Tâches de 2 Ruins différentes maximum par jour','Task da massimo 2 Ruins diverse al giorno','Aufgaben aus max. 2 verschiedenen Ruins pro Tag','Zadania z maks. 2 różnych Ruins dziennie')]],tips:[L('Each Ruin releases only one task per day.','Chaque Ruin ne propose qu’une tâche par jour.','Ogni Ruin offre una sola task al giorno.','Jede Ruin gibt nur eine Aufgabe pro Tag.','Każda Ruin daje tylko jedno zadanie dziennie.'),L('The first two refreshes are free.','Les deux premiers refresh sont gratuits.','I primi due refresh sono gratuiti.','Die ersten zwei Refreshes sind kostenlos.','Pierwsze dwa odświeżenia są darmowe.'),L('Claim rewards before accepting new tasks.','Récupère les récompenses avant d’accepter de nouvelles tâches.','Riscatta le ricompense prima di accettare nuove task.','Belohnungen abholen, bevor neue Aufgaben angenommen werden.','Odbierz nagrody przed przyjęciem nowych zadań.')]},
    tasks:{icon:'☑',kicker:L('RUIN TASKS','TÂCHES DES RUINES','RUIN TASKS','RUIN TASKS','RUIN TASKS'),title:L('Ruin Tasks','Tâches des Ruines','Ruin Tasks','Ruin Tasks','Ruin Tasks'),lead:L('Complete daily tasks from Divine Ruins to earn Affinity and progress through the season systems.','Accomplis les tâches quotidiennes des Divine Ruins pour gagner de l’Affinity et progresser dans les systèmes de saison.','Completa le attività giornaliere delle Divine Ruins per ottenere Affinity e progredire nei sistemi stagionali.','Erledige tägliche Aufgaben der Divine Ruins, um Affinity zu erhalten und die Saison-Systeme voranzutreiben.','Wykonuj codzienne zadania Divine Ruins, aby zdobywać Affinity i rozwijać systemy sezonowe.'),facts:[['what',L('Daily objectives','Objectifs quotidiens','Obiettivi giornalieri','Tägliche Ziele','Codzienne cele')],['keyRule',L('Tasks from up to 2 different Ruins per day','Tâches de 2 Ruins différentes maximum par jour','Task da massimo 2 Ruins diverse al giorno','Aufgaben aus max. 2 verschiedenen Ruins pro Tag','Zadania z maks. 2 różnych Ruins dziennie')]],tips:[L('Each Ruin releases only one task per day.','Chaque Ruin ne propose qu’une tâche par jour.','Ogni Ruin offre una sola task al giorno.','Jede Ruin gibt nur eine Aufgabe pro Tag.','Każda Ruin daje tylko jedno zadanie dziennie.'),L('The first two refreshes are free.','Les deux premiers refresh sont gratuits.','I primi due refresh sono gratuiti.','Die ersten zwei Refreshes sind kostenlos.','Pierwsze dwa odświeżenia są darmowe.'),L('Claim rewards before accepting new tasks.','Récupère les récompenses avant d’accepter de nouvelles tâches.','Riscatta le ricompense prima di accettare nuove task.','Belohnungen abholen, bevor neue Aufgaben angenommen werden.','Odbierz nagrody przed przyjęciem nowych zadań.')]},
    affinity:{icon:'△',kicker:L('AFFINITY','AFFINITY','AFFINITY','AFFINITY','AFFINITY'),title:L('Increase Affinity','Augmenter l’Affinity','Aumenta Affinity','Affinity erhöhen','Zwiększ Affinity'),lead:L('Affinity grows as you complete Ruin Tasks. Higher Affinity unlocks blessing bonuses and stronger seasonal advantages.','L’Affinity augmente en accomplissant les Ruin Tasks. Des niveaux plus élevés débloquent des bonus de bénédiction et des avantages de saison plus puissants.','L’Affinity aumenta completando le Ruin Tasks. Livelli più alti sbloccano bonus e vantaggi stagionali più potenti.','Affinity steigt durch Ruin Tasks. Höhere Stufen schalten Segensboni und stärkere Saisonvorteile frei.','Affinity rośnie dzięki Ruin Tasks. Wyższe poziomy odblokowują bonusy błogosławieństw i silniejsze korzyści sezonowe.'),facts:[['what',L('Season progression meter','Progression de saison','Progressione stagionale','Saison-Fortschritt','Postęp sezonowy')],['keyRule',L('More Affinity = more blessings','Plus d’Affinity = plus de bénédictions','Più Affinity = più benedizioni','Mehr Affinity = mehr Segen','Więcej Affinity = więcej błogosławieństw')]],tips:[L('Prioritize high-value Ruin Tasks whenever possible.','Privilégie les Ruin Tasks de meilleure valeur quand c’est possible.','Dai priorità alle Ruin Tasks di maggior valore quando possibile.','Bevorzuge möglichst wertvolle Ruin Tasks.','Wybieraj możliwie najbardziej wartościowe Ruin Tasks.')]},
    rewards:{icon:'▣',kicker:L('REWARDS','RÉCOMPENSES','RICOMPENSE','BELOHNUNGEN','NAGRODY'),title:L('Divine Rewards','Récompenses divines','Ricompense Divine','Göttliche Belohnungen','Boskie Nagrody'),lead:L('Reaching Affinity milestones grants powerful seasonal rewards, including Divine Artifacts and special chests.','Atteindre certains paliers d’Affinity donne des récompenses puissantes, notamment des Divine Artifacts et des coffres spéciaux.','Raggiungere determinate soglie di Affinity concede ricompense potenti, inclusi Divine Artifacts e forzieri speciali.','Affinity-Meilensteine geben starke Saisonbelohnungen, darunter Divine Artifacts und besondere Truhen.','Progi Affinity dają silne nagrody sezonowe, w tym Divine Artifacts i specjalne skrzynie.'),facts:[['what',L('Artifacts · Chests · Seasonal bonuses','Artifacts · Coffres · Bonus de saison','Artifacts · Forzieri · Bonus stagionali','Artifacts · Truhen · Saisonboni','Artifacts · Skrzynie · Bonusy sezonowe')]],tips:[L('Check milestone rewards regularly so you do not miss claimable items.','Vérifie régulièrement les récompenses de palier pour ne rien oublier.','Controlla regolarmente le ricompense delle soglie per non perdere nulla.','Prüfe Meilenstein-Belohnungen regelmäßig.','Regularnie sprawdzaj nagrody za progi.')]},
    relic:{icon:'◆',kicker:L('ANCIENT POWER','POUVOIR ANCIEN','POTERE ANTICO','ALTE MACHT','STAROŻYTNA MOC'),title:L('Ancient Relic','Ancient Relic','Ancient Relic','Ancient Relic','Ancient Relic'),lead:L('Upgrade the Ancient Relic with Runes to unlock Origin Lands skills and strengthen your seasonal formation.','Améliore l’Ancient Relic avec des Runes pour débloquer des compétences utilisables dans Origin Lands.','Potenzia l’Ancient Relic con le Runes per sbloccare abilità nelle Origin Lands.','Verbessere das Ancient Relic mit Runen und schalte Fähigkeiten für die Origin Lands frei.','Ulepsz Ancient Relic za pomocą Run, aby odblokować umiejętności w Origin Lands.'),facts:[['where',L('Origin Lands only','Origin Lands uniquement','Solo Origin Lands','Nur Origin Lands','Tylko Origin Lands')],['what',L('Relic skills by hero type','Compétences de relique par type de héros','Abilità reliquia per tipo di eroe','Relikt-Fähigkeiten nach Heldentyp','Umiejętności reliktu wg typu bohatera')]],tips:[L('Runes come from Ruin Tasks, Season Achievements and the Season Pass.','Les Runes viennent des Ruin Tasks, Season Achievements et du Season Pass.','Le Runes arrivano da Ruin Tasks, Season Achievements e Season Pass.','Runen kommen aus Ruin Tasks, Season Achievements und Season Pass.','Runy zdobywasz z Ruin Tasks, Season Achievements i Season Pass.'),L('Relic stats are removed when the season ends.','Les stats de relique disparaissent à la fin de la saison.','Le statistiche della reliquia vengono rimosse a fine stagione.','Reliktwerte werden am Saisonende entfernt.','Statystyki reliktu znikają po zakończeniu sezonu.')]},
    envoy:{icon:'◈',kicker:L('SEASON-LONG','TOUTE LA SAISON','TUTTA LA STAGIONE','SAISONWEIT','CAŁY SEZON'),title:L('Save the Divine Envoy','Sauver le Divine Envoy','Salva il Divine Envoy','Rette den Divine Envoy','Uratuj Divine Envoy'),lead:L('A season-long puzzle/event. Use event items to clear the board and help the Divine Envoy resolve the crisis.','Un événement/puzzle sur toute la saison. Utilise les objets dédiés pour nettoyer le plateau et aider le Divine Envoy.','Un evento/puzzle stagionale. Usa gli oggetti evento per liberare la tavola e aiutare il Divine Envoy.','Ein saisonweites Puzzle-Event. Nutze Event-Items, um das Brett zu räumen und dem Divine Envoy zu helfen.','Sezonowe wydarzenie logiczne. Używaj przedmiotów eventowych, aby czyścić planszę i pomagać Divine Envoy.'),facts:[['when',L('Ongoing · about 48 days','En continu · environ 48 jours','In corso · circa 48 giorni','Laufend · ca. 48 Tage','Przez sezon · ok. 48 dni')]],tips:[]},
    shop:{icon:'¤',kicker:L('WEEKLY SHOP','BOUTIQUE HEBDO','SHOP SETTIMANALE','WOCHENSHOP','SKLEP TYGODNIOWY'),title:L('Season Shop with Ra','Season Shop with Ra','Season Shop with Ra','Season Shop with Ra','Season Shop with Ra'),lead:L('Exchange Scales for rotating seasonal items. The shop refreshes every Monday and each item has its own purchase limit.','Échange les Scales contre des objets saisonniers. La boutique change chaque lundi et chaque objet possède sa propre limite.','Scambia le Scales con oggetti stagionali. Lo shop cambia ogni lunedì e ogni oggetto ha un proprio limite.','Tausche Scales gegen Saison-Items. Der Shop aktualisiert sich jeden Montag; jedes Item hat ein eigenes Limit.','Wymieniaj Scales na przedmioty sezonowe. Sklep odświeża się w każdy poniedziałek, a każdy przedmiot ma własny limit.'),facts:[['when',L('Refresh every Monday at 00:00 UTC','Mise à jour chaque lundi à 00:00 UTC','Aggiornamento ogni lunedì alle 00:00 UTC','Update jeden Montag um 00:00 UTC','Odświeżenie w każdy poniedziałek o 00:00 UTC')],['what',L('Spend Scales on Ra’s Collection items','Dépenser les Scales dans la collection de Ra','Usa le Scales nella collezione di Ra','Scales für Ra’s Collection ausgeben','Wydawaj Scales w Ra’s Collection')]],tips:[L('Items may change from week to week.','Les objets peuvent changer chaque semaine.','Gli oggetti possono cambiare ogni settimana.','Items können sich wöchentlich ändern.','Przedmioty mogą zmieniać się co tydzień.')]},
    merchant:{icon:'♜',kicker:L('ORIGIN MERCHANT GUILD','ORIGIN MERCHANT GUILD','ORIGIN MERCHANT GUILD','ORIGIN MERCHANT GUILD','ORIGIN MERCHANT GUILD'),title:L('Origin Merchant Guild','Origin Merchant Guild','Origin Merchant Guild','Origin Merchant Guild','Origin Merchant Guild'),lead:L('Capture the Merchant Guild to gain ownership, better shop prices and a share of purchase taxes.','Capture la Merchant Guild pour en devenir gouverneur, obtenir de meilleurs prix et toucher une part des taxes.','Cattura la Merchant Guild per ottenere proprietà, prezzi migliori e una quota delle tasse.','Erobere die Merchant Guild für Besitz, bessere Preise und einen Anteil an den Steuern.','Zdobądź Merchant Guild, aby uzyskać kontrolę, lepsze ceny i udział w podatkach.'),facts:[['when',L('First opening: Monday of Week 2 at 12:00 server time','Première ouverture : lundi de la semaine 2 à 12:00 heure serveur','Prima apertura: lunedì della Settimana 2 alle 12:00 server time','Erste Öffnung: Montag in Woche 2 um 12:00 Serverzeit','Pierwsze otwarcie: poniedziałek Tygodnia 2 o 12:00 czasu serwera')],['keyRule',L('Contest duration: 1 hour · interval: 7 days','Durée du concours : 1 h · intervalle : 7 jours','Durata: 1 ora · intervallo: 7 giorni','Dauer: 1 Std. · Intervall: 7 Tage','Czas trwania: 1 godz. · odstęp: 7 dni')]],tips:[L('The highest capture progress wins a neutral Guild.','Sur une Guild neutre, la meilleure progression de capture gagne.','Su una Guild neutrale vince il maggior progresso di cattura.','Bei neutraler Guild gewinnt der höchste Eroberungsfortschritt.','Neutralną Guild zdobywa gracz z najwyższym postępem przejęcia.'),L('Ownership gives better item prices (-20%) and a 20% tax rate.','La propriété donne de meilleurs prix (-20 %) et 20 % de taxe.','La proprietà offre prezzi migliori (-20%) e tasse del 20%.','Besitz gibt bessere Preise (-20 %) und 20 % Steuern.','Kontrola daje lepsze ceny (-20%) i 20% podatku.')]},
    clash:{icon:'⚔',kicker:L('WAR EVENT','ÉVÉNEMENT DE GUERRE','EVENTO DI GUERRA','KRIEGS-EVENT','WYDARZENIE WOJENNE'),title:L('Territory Invasion / Camp Clash','Territory Invasion / Camp Clash','Territory Invasion / Camp Clash','Territory Invasion / Camp Clash','Territory Invasion / Camp Clash'),lead:L('From Week 3, alliances can declare war on other camps’ Fortresses during the War Declaration period.','À partir de la semaine 3, les alliances peuvent déclarer la guerre aux Fortresses des autres camps pendant la période dédiée.','Dalla Settimana 3, le alleanze possono dichiarare guerra alle Fortress degli altri campi durante il periodo previsto.','Ab Woche 3 können Allianzen während der War-Declaration-Phase Fortresses anderer Camps angreifen.','Od Tygodnia 3 sojusze mogą wypowiadać wojnę Fortressom innych obozów podczas okresu deklaracji.'),facts:[['when',L('From Week 3 · Tuesdays & Thursdays · 1 hour','À partir de la semaine 3 · mardi et jeudi · 1 h','Dalla Settimana 3 · martedì e giovedì · 1 ora','Ab Woche 3 · Dienstag & Donnerstag · 1 Std.','Od Tygodnia 3 · wtorki i czwartki · 1 godz.')],['keyRule',L('Destroyed Fortresses are permanently removed','Une Fortress détruite disparaît définitivement','Le Fortress distrutte vengono rimosse definitivamente','Zerstörte Fortresses werden dauerhaft entfernt','Zniszczone Fortressy są usuwane na stałe')]],tips:[L('Multiple alliances can participate; credit goes to the alliance dealing the most Durability damage.','Plusieurs alliances peuvent participer ; le crédit revient à celle qui inflige le plus de dégâts de durabilité.','Possono partecipare più alleanze; il credito va a chi infligge più danni alla Durability.','Mehrere Allianzen können teilnehmen; gewertet wird die höchste Durability-Schadensmenge.','Może uczestniczyć wiele sojuszy; zaliczenie dostaje ten z największym obrażeniem Durability.')]},
    fortress:{icon:'♛',kicker:L('FORTRESS WAR','GUERRE DE FORTRESS','GUERRA FORTRESS','FORTRESS-KRIEG','WOJNA O FORTRESS'),title:L('Territory Triumph','Territory Triumph','Territory Triumph','Territory Triumph','Territory Triumph'),lead:L('Use a War Declaration to attack an enemy Fortress and expand your territory through adjacent Fortresses.','Utilise une War Declaration pour attaquer une Fortress ennemie et étendre ton territoire de Fortress en Fortress.','Usa una War Declaration per attaccare una Fortress nemica ed espandere il territorio.','Nutze eine War Declaration gegen eine gegnerische Fortress und erweitere dein Gebiet über angrenzende Fortresses.','Użyj War Declaration, aby zaatakować wrogą Fortress i rozszerzać terytorium przez sąsiednie Fortressy.'),facts:[['when',L('Daily 12:00–13:00 server time on Invasion Days','12:00–13:00 heure serveur les jours d’Invasion','12:00–13:00 server time nei giorni Invasion','12:00–13:00 Serverzeit an Invasion Days','12:00–13:00 czasu serwera w dni Invasion')],['keyRule',L('One War Declaration per captured Fortress this season','Une seule War Declaration par Fortress capturée cette saison','Una sola War Declaration per Fortress catturata in questa stagione','Nur eine War Declaration pro eroberter Fortress in dieser Saison','Jedna War Declaration na każdą zdobytą Fortress w tym sezonie')]],tips:[L('Tuesdays and Thursdays are Invasion Days.','Mardi et jeudi sont les jours d’Invasion.','Martedì e giovedì sono Invasion Days.','Dienstag und Donnerstag sind Invasion Days.','Wtorki i czwartki to Invasion Days.')] }
  };

  const systems = [
    {id:'temples',icon:'☥',tag:L('DIVINE RUINS','DIVINE RUINS','DIVINE RUINS','DIVINE RUINS','DIVINE RUINS'),sub:L('Daily Ruins · Blessings','Ruines quotidiennes · Bénédictions','Ruins giornaliere · Benedizioni','Tägliche Ruins · Segen','Codzienne Ruins · Błogosławieństwa')},
    {id:'tasks',icon:'☑',tag:L('DAILY TASKS','TÂCHES QUOTIDIENNES','TASK GIORNALIERI','TÄGLICHE AUFGABEN','CODZIENNE ZADANIA'),sub:L('Choose · Complete · Refresh','Choisir · Accomplir · Refresh','Scegli · Completa · Refresh','Wählen · Erledigen · Refresh','Wybierz · Wykonaj · Odśwież')},
    {id:'affinity',icon:'△',tag:L('PROGRESSION','PROGRESSION','PROGRESSIONE','FORTSCHRITT','POSTĘP'),sub:L('Affinity · Blessing Buffs','Affinity · Buffs de bénédiction','Affinity · Buff benedizione','Affinity · Segens-Buffs','Affinity · Buffy błogosławieństw')},
    {id:'rewards',icon:'▣',tag:L('MILESTONES','PALIERS','SOGLIE','MEILENSTEINE','PROGI'),sub:L('Artifacts · Chests · Bonuses','Artifacts · Coffres · Bonus','Artifacts · Forzieri · Bonus','Artifacts · Truhen · Boni','Artifacts · Skrzynie · Bonusy')},
    {id:'relic',icon:'◆',tag:L('SEASON POWER','PUISSANCE DE SAISON','POTERE STAGIONALE','SAISON-MACHT','MOC SEZONOWA'),sub:L('Runes · Skills · Formation','Runes · Compétences · Formation','Runes · Abilità · Formazione','Runen · Skills · Formation','Runy · Umiejętności · Formacja')},
    {id:'envoy',icon:'◈',tag:L('ONGOING','EN CONTINU','IN CORSO','LAUFEND','CAŁY SEZON'),sub:L('Season-long puzzle event','Événement puzzle de saison','Puzzle stagionale','Saisonweites Puzzle','Sezonowe wydarzenie logiczne')},
    {id:'shop',icon:'¤',tag:L('EVERY MONDAY','CHAQUE LUNDI','OGNI LUNEDÌ','JEDEN MONTAG','CO PONIEDZIAŁEK'),sub:L('Scales · Weekly rotation','Scales · Rotation hebdo','Scales · Rotazione settimanale','Scales · Wochenrotation','Scales · Rotacja tygodniowa')}
  ];
  const artIndex = {
    map:0, kickoff:1, envoy:2, outpost:3, temples:4, tasks:5,
    affinity:6, rewards:7, relic:8, merchant:9, shop:10,
    clash:11, fortress:12, calendar:0
  };


  const weeks = [
    {n:1,start:'2026-09-22',end:'2026-09-28',chips:[L('Season Kickoff','Lancement de saison','Inizio stagione','Saisonstart','Start sezonu')],events:[
      {day:'mon',title:L('Outpost Lv. 1–2','Outpost niv. 1–2','Outpost Lv. 1–2','Outpost Lv. 1–2','Outpost poz. 1–2'),sub:L('Territory expansion begins','Début de l’expansion territoriale','Inizia l’espansione territoriale','Gebietserweiterung beginnt','Początek ekspansji terytorialnej'),detail:'outpost'},
      {day:'mon',title:L('Fortress Lv. 3','Fortress niv. 3','Fortress Lv. 3','Fortress Lv. 3','Fortress poz. 3'),sub:L('Fortress progression','Progression des Fortress','Progressione Fortress','Fortress-Fortschritt','Rozwój Fortress'),detail:'fortress'},
      {day:'wed',title:L('Fortress Lv. 4 Unlock','Déblocage Fortress niv. 4','Sblocco Fortress Lv. 4','Fortress Lv. 4 freigeschaltet','Odblokowanie Fortress poz. 4'),sub:L('New Fortress level','Nouveau niveau de Fortress','Nuovo livello Fortress','Neue Fortress-Stufe','Nowy poziom Fortress'),detail:'fortress'},
      {day:'sat',title:L('Temple 1 Battle + KE','Bataille Temple 1 + KE','Battaglia Temple 1 + KE','Temple-1-Kampf + KE','Walka Temple 1 + KE'),sub:L('Divine Temple battle','Bataille de Divine Temple','Battaglia Divine Temple','Divine-Temple-Kampf','Walka Divine Temple'),detail:'temples'},
      {day:'ongoing',title:L('Season Kickoff','Lancement de saison','Inizio stagione','Saisonstart','Start sezonu'),sub:L('6-day ranking event','Événement de classement · 6 jours','Evento classifica · 6 giorni','Ranglisten-Event · 6 Tage','Wydarzenie rankingowe · 6 dni'),detail:'kickoff'}
    ]},
    {n:2,start:'2026-09-29',end:'2026-10-05',chips:[L('Merchant Guild opens','Ouverture Merchant Guild','Apertura Merchant Guild','Merchant Guild öffnet','Otwarcie Merchant Guild')],events:[
      {day:'mon',title:L('Passes Unlock','Déblocage des Passes','Sblocco Passes','Passes freigeschaltet','Odblokowanie Passes'),sub:L('New routes open','De nouvelles routes s’ouvrent','Si aprono nuove rotte','Neue Routen öffnen sich','Otwierają się nowe trasy')},
      {day:'mon',title:L('Origin Merchant Guild','Origin Merchant Guild','Origin Merchant Guild','Origin Merchant Guild','Origin Merchant Guild'),sub:L('First opening · 12:00 server time','Première ouverture · 12:00 heure serveur','Prima apertura · 12:00 server time','Erste Öffnung · 12:00 Serverzeit','Pierwsze otwarcie · 12:00 czasu serwera'),detail:'merchant'},
      {day:'wed',title:L('Fortress Lv. 5 Unlock','Déblocage Fortress niv. 5','Sblocco Fortress Lv. 5','Fortress Lv. 5 freigeschaltet','Odblokowanie Fortress poz. 5'),sub:L('New Fortress level','Nouveau niveau de Fortress','Nuovo livello Fortress','Neue Fortress-Stufe','Nowy poziom Fortress'),detail:'fortress'},
      {day:'sat',title:L('Temple 2 Battle + KE','Bataille Temple 2 + KE','Battaglia Temple 2 + KE','Temple-2-Kampf + KE','Walka Temple 2 + KE'),sub:L('Divine Temple battle','Bataille de Divine Temple','Battaglia Divine Temple','Divine-Temple-Kampf','Walka Divine Temple'),detail:'temples'}
    ]},
    {n:3,start:'2026-10-06',end:'2026-10-12',chips:[L('Camp Clash starts','Début de Camp Clash','Inizia Camp Clash','Camp Clash beginnt','Start Camp Clash')],events:[
      {day:'mon',title:L('Merchant Battle Lv. 1–2','Merchant Battle niv. 1–2','Merchant Battle Lv. 1–2','Merchant Battle Lv. 1–2','Merchant Battle poz. 1–2'),sub:L('Merchant Guild contest','Compétition Merchant Guild','Competizione Merchant Guild','Merchant-Guild-Wettkampf','Rywalizacja Merchant Guild'),detail:'merchant'},
      {day:'tue',title:L('New Passes Unlock','Nouveaux Passes débloqués','Nuovi Passes sbloccati','Neue Passes freigeschaltet','Odblokowanie nowych Passes'),sub:L('New routes open','De nouvelles routes s’ouvrent','Si aprono nuove rotte','Neue Routen öffnen sich','Otwierają się nowe trasy')},
      {day:'tue',title:L('Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion'),sub:L('Camp Clash · 1 hour','Camp Clash · 1 h','Camp Clash · 1 ora','Camp Clash · 1 Std.','Camp Clash · 1 godz.'),detail:'clash'},
      {day:'thu',title:L('Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion'),sub:L('Camp Clash · 1 hour','Camp Clash · 1 h','Camp Clash · 1 ora','Camp Clash · 1 Std.','Camp Clash · 1 godz.'),detail:'clash'},
      {day:'sat',title:L('KE','KE','KE','KE','KE'),sub:L('Kill Event','Kill Event','Kill Event','Kill Event','Kill Event')}
    ]},
    {n:4,start:'2026-10-13',end:'2026-10-19',chips:[L('Territory pressure rises','La pression territoriale monte','Cresce la pressione territoriale','Territorialer Druck steigt','Rośnie presja terytorialna')],events:[
      {day:'mon',title:L('Merchant Battle Lv. 1–2','Merchant Battle niv. 1–2','Merchant Battle Lv. 1–2','Merchant Battle Lv. 1–2','Merchant Battle poz. 1–2'),sub:L('Merchant Guild contest','Compétition Merchant Guild','Competizione Merchant Guild','Merchant-Guild-Wettkampf','Rywalizacja Merchant Guild'),detail:'merchant'},
      {day:'tue',title:L('New Passes Unlock','Nouveaux Passes débloqués','Nuovi Passes sbloccati','Neue Passes freigeschaltet','Odblokowanie nowych Passes'),sub:L('New routes open','De nouvelles routes s’ouvrent','Si aprono nuove rotte','Neue Routen öffnen sich','Otwierają się nowe trasy')},
      {day:'tue',title:L('Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion'),sub:L('Camp Clash · 1 hour','Camp Clash · 1 h','Camp Clash · 1 ora','Camp Clash · 1 Std.','Camp Clash · 1 godz.'),detail:'clash'},
      {day:'thu',title:L('Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion'),sub:L('Camp Clash · 1 hour','Camp Clash · 1 h','Camp Clash · 1 ora','Camp Clash · 1 Std.','Camp Clash · 1 godz.'),detail:'clash'},
      {day:'sat',title:L('KE','KE','KE','KE','KE'),sub:L('Kill Event','Kill Event','Kill Event','Kill Event','Kill Event')}
    ]},
    {n:5,start:'2026-10-20',end:'2026-10-26',chips:[L('Merchant Battle Lv. 1–2–3','Merchant Battle niv. 1–2–3','Merchant Battle Lv. 1–2–3','Merchant Battle Lv. 1–2–3','Merchant Battle poz. 1–2–3')],events:[
      {day:'mon',title:L('Merchant Battle Lv. 1–2–3','Merchant Battle niv. 1–2–3','Merchant Battle Lv. 1–2–3','Merchant Battle Lv. 1–2–3','Merchant Battle poz. 1–2–3'),sub:L('Expanded Merchant Guild contest','Compétition Merchant Guild étendue','Competizione Merchant Guild estesa','Erweiterter Merchant-Guild-Wettkampf','Rozszerzona rywalizacja Merchant Guild'),detail:'merchant'},
      {day:'tue',title:L('New Passes Unlock','Nouveaux Passes débloqués','Nuovi Passes sbloccati','Neue Passes freigeschaltet','Odblokowanie nowych Passes'),sub:L('New routes open','De nouvelles routes s’ouvrent','Si aprono nuove rotte','Neue Routen öffnen sich','Otwierają się nowe trasy')},
      {day:'tue',title:L('Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion'),sub:L('Camp Clash · 1 hour','Camp Clash · 1 h','Camp Clash · 1 ora','Camp Clash · 1 Std.','Camp Clash · 1 godz.'),detail:'clash'},
      {day:'thu',title:L('Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion'),sub:L('Camp Clash · 1 hour','Camp Clash · 1 h','Camp Clash · 1 ora','Camp Clash · 1 Std.','Camp Clash · 1 godz.'),detail:'clash'},
      {day:'sat',title:L('KE','KE','KE','KE','KE'),sub:L('Kill Event','Kill Event','Kill Event','Kill Event','Kill Event')}
    ]},
    {n:6,start:'2026-10-27',end:'2026-11-02',chips:[L('Final phase','Phase finale','Fase finale','Finalphase','Faza finałowa')],events:[
      {day:'mon',title:L('Merchant Battle Lv. 1–2–3','Merchant Battle niv. 1–2–3','Merchant Battle Lv. 1–2–3','Merchant Battle Lv. 1–2–3','Merchant Battle poz. 1–2–3'),sub:L('Merchant Guild contest','Compétition Merchant Guild','Competizione Merchant Guild','Merchant-Guild-Wettkampf','Rywalizacja Merchant Guild'),detail:'merchant'},
      {day:'tue',title:L('Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion'),sub:L('Camp Clash · 1 hour','Camp Clash · 1 h','Camp Clash · 1 ora','Camp Clash · 1 Std.','Camp Clash · 1 godz.'),detail:'clash'},
      {day:'thu',title:L('Judgment Altar Unlock','Déblocage du Judgment Altar','Sblocco Judgment Altar','Judgment Altar freigeschaltet','Odblokowanie Judgment Altar'),sub:L('Late-season unlock','Déblocage de fin de saison','Sblocco di fine stagione','Späte Saisonfreischaltung','Odblokowanie pod koniec sezonu')},
      {day:'thu',title:L('Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion','Territory Invasion'),sub:L('Camp Clash · 1 hour','Camp Clash · 1 h','Camp Clash · 1 ora','Camp Clash · 1 Std.','Camp Clash · 1 godz.'),detail:'clash'},
      {day:'sat',title:L('Ancient Temple Lv. 3 Battle + KE','Bataille Ancient Temple niv. 3 + KE','Battaglia Ancient Temple Lv. 3 + KE','Ancient-Temple-Lv.-3-Kampf + KE','Walka Ancient Temple poz. 3 + KE'),sub:L('Final Temple phase','Phase finale des Temples','Fase finale dei Temple','Letzte Temple-Phase','Finałowa faza Temple'),detail:'temples'}
    ]}
  ];

  let lang = getInitialLanguage();
  let searchIndex = [];

  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
  const tr = ()=>ui[lang] || ui.en;
  const pick = obj => (obj && (obj[lang] || obj.en)) || '';

  function getInitialLanguage(){
    try{const s=localStorage.getItem(LANG_KEY);if(supported.includes(s))return s;}catch(_){}
    const b=(navigator.language||'en').slice(0,2).toLowerCase();
    return supported.includes(b)?b:'en';
  }
  function saveLanguage(){try{localStorage.setItem(LANG_KEY,lang);}catch(_){}}

  function fmtDate(iso){
    const d=new Date(iso+'T12:00:00');
    return new Intl.DateTimeFormat(localeMap[lang],{month:'short',day:'numeric'}).format(d);
  }
  function weekRange(w){return fmtDate(w.start)+' — '+fmtDate(w.end);}

  function renderSystems(){
    const grid=$('#systemGrid'); grid.replaceChildren();
    systems.forEach(s=>{
      const d=details[s.id];
      const card=document.createElement('button');
      card.type='button'; card.className='system-card';
      card.dataset.art = String(artIndex[s.id] ?? 0);
      card.innerHTML='<span class="system-art art-'+card.dataset.art+'"></span><span class="system-icon">'+s.icon+'</span><span class="system-copy"><small>'+pick(s.tag)+'</small><strong>'+pick(d.title)+'</strong><p>'+pick(s.sub)+'</p></span><span class="system-arrow">→</span>';
      card.addEventListener('click',()=>openDetail(s.id));
      grid.appendChild(card);
    });
  }

  function renderRoadmap(){
    const root=$('#roadmapWeeks'); root.replaceChildren();
    const now=new Date();
    weeks.forEach(w=>{
      const start=new Date(w.start+'T00:00:00'), end=new Date(w.end+'T23:59:59');
      const row=document.createElement('article');
      row.className='week-row'+(now>=start&&now<=end?' is-current':'');
      row.id='week-'+w.n;

      const node=document.createElement('div');
      node.className='week-node'; node.innerHTML='<strong>'+String(w.n).padStart(2,'0')+'</strong>';

      const card=document.createElement('div'); card.className='week-card';
      const head=document.createElement('div'); head.className='week-head';
      head.innerHTML='<div class="week-title-wrap"><small>'+tr().week+'</small><strong>'+w.n+'</strong></div><span class="week-date">'+weekRange(w)+'</span>';
      card.appendChild(head);

      const list=document.createElement('div'); list.className='event-list';
      w.events.forEach(e=>{
        const btn=document.createElement('button');
        btn.type='button'; btn.className='event-card'+(e.detail?'':' no-detail');
        const day=dayNames[lang][e.day] || e.day;
        const title = pick(e.title), sub = pick(e.sub);
        const art = e.detail && artIndex[e.detail] !== undefined ? artIndex[e.detail] : null;
        if (art !== null) btn.dataset.art = String(art);
        btn.innerHTML='<span class="event-day"><b>'+day+'</b><span>'+(e.detail?tr().guide:tr().calendar)+'</span></span><span class="event-copy"><strong>'+title+'</strong><small>'+sub+'</small>'+(e.detail?'<em class="event-badge">'+tr().guide+'</em>':'')+'</span><span class="event-arrow">'+(e.detail?'→':'·')+'</span>';
        if(e.detail) btn.addEventListener('click',()=>openDetail(e.detail));
        list.appendChild(btn);
      });
      card.appendChild(list);

      if(w.chips.length){
        const foot=document.createElement('div'); foot.className='week-footer';
        w.chips.forEach(chip=>{const x=document.createElement('span');x.className='week-chip';x.textContent=pick(chip);foot.appendChild(x);});
        card.appendChild(foot);
      }
      row.append(node,card); root.appendChild(row);
    });
  }

  function openDetail(id){
    const d=details[id]; if(!d)return;
    const art = artIndex[id] !== undefined ? artIndex[id] : 0;
    const detailArt = $('#detailArt');
    if(detailArt) detailArt.className = 'detail-art art-' + art;
    const ornament = $('.detail-ornament');
    if(ornament) ornament.textContent = d.icon || '☥';
    $('#detailKicker').textContent=pick(d.kicker);
    $('#detailTitle').textContent=pick(d.title);
    $('#detailLead').textContent=pick(d.lead);
    const facts=$('#detailFacts'); facts.replaceChildren();
    (d.facts||[]).forEach(([label,val])=>{
      const x=document.createElement('div');x.className='fact-card';
      x.innerHTML='<small>'+((tr()[label]||label).toUpperCase())+'</small><strong>'+pick(val)+'</strong>';facts.appendChild(x);
    });
    const tips=$('#detailTips');tips.replaceChildren();
    (d.tips||[]).forEach(t=>{const x=document.createElement('div');x.className='detail-tip';x.textContent=pick(t);tips.appendChild(x);});
    $('#detailModal').hidden=false;document.body.style.overflow='hidden';
  }
  function closeDetail(){ $('#detailModal').hidden=true; document.body.style.overflow=''; }

  function updateSeasonProgress(){
    const start=new Date('2026-09-22T00:00:00'), end=new Date('2026-11-02T23:59:59'), now=new Date();
    let pct=0,state='';
    if(now<start){
      const diff=Math.ceil((start-now)/86400000);
      state=diff<=0?tr().startsToday:tr().startsIn.replace('{n}',diff);
    }else if(now>end){pct=100;state=tr().seasonEnded;}
    else{
      pct=Math.max(0,Math.min(100,((now-start)/(end-start))*100));
      const current=weeks.find(w=>now>=new Date(w.start+'T00:00:00')&&now<=new Date(w.end+'T23:59:59'));
      state=tr().seasonLive.replace('{n}',current?current.n:'');
    }
    $('#seasonState').textContent=state;
    $('#seasonProgressLabel').textContent=Math.round(pct)+'%';
    $('#seasonProgressFill').style.width=pct+'%';
  }

  function buildSearch(){
    searchIndex=[];
    systems.forEach(s=>{const d=details[s.id];searchIndex.push({kind:'SYSTEM',title:pick(d.title),sub:pick(s.sub),detail:s.id,text:(pick(d.title)+' '+pick(d.lead)+' '+pick(s.sub)).toLowerCase()});});
    weeks.forEach(w=>w.events.forEach(e=>{const title=pick(e.title),sub=pick(e.sub);searchIndex.push({kind:'W'+w.n,title,sub,detail:e.detail||null,week:w.n,text:(title+' '+sub+' '+dayNames[lang][e.day]).toLowerCase()});}));
  }
  function renderSearch(q){
    const root=$('#searchResults');root.replaceChildren();
    const n=(q||'').trim().toLowerCase();
    if(!n)return;
    const matches=searchIndex.filter(x=>x.text.includes(n)).slice(0,12);
    if(!matches.length){const e=document.createElement('div');e.className='search-empty';e.textContent=tr().noResults;root.appendChild(e);return;}
    matches.forEach(x=>{
      const b=document.createElement('button');b.type='button';b.className='search-result';
      b.innerHTML='<span class="search-result-icon">'+x.kind+'</span><span class="search-result-copy"><strong>'+x.title+'</strong><small>'+x.sub+'</small></span><span class="search-result-arrow">→</span>';
      b.addEventListener('click',()=>{
        closeSearch();
        if(x.detail)openDetail(x.detail);
        else if(x.week){const w=$('#week-'+x.week);if(w)w.scrollIntoView({behavior:'smooth',block:'center'});}
      });
      root.appendChild(b);
    });
  }
  function openSearch(){ $('#searchPanel').hidden=false; document.body.style.overflow='hidden'; setTimeout(()=>$('#guideSearch').focus(),30);}
  function closeSearch(){ $('#searchPanel').hidden=true; document.body.style.overflow=''; $('#guideSearch').value=''; $('#searchResults').replaceChildren();}

  function applyLanguage(){
    document.documentElement.lang=lang;
    document.title='434 — '+(lang==='fr'?'Road Map Ragnarok':lang==='it'?'Road Map Ragnarok':lang==='de'?'Ragnarok Road Map':lang==='pl'?'Ragnarok Road Map':'Ragnarok Road Map');
    $('#languageSelect').value=lang;
    $$('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(tr()[key])el.textContent=tr()[key];});
    $('#guideSearch').placeholder=tr().searchPlaceholder;
    const sr=$('.nav-toggle .sr-only'); if(sr) sr.textContent=lang==='fr'?'Ouvrir la navigation':'Open navigation';
    renderSystems();renderRoadmap();updateSeasonProgress();buildSearch();saveLanguage();
  }

  const navToggle=$('.nav-toggle'), mobileNav=$('#mobileNav');
  navToggle.addEventListener('click',()=>{const open=navToggle.getAttribute('aria-expanded')==='true';navToggle.setAttribute('aria-expanded',String(!open));mobileNav.hidden=open;});
  $$('#mobileNav a').forEach(a=>a.addEventListener('click',()=>{navToggle.setAttribute('aria-expanded','false');mobileNav.hidden=true;}));

  const languageSelect=$('#languageSelect');
  const onLanguageChange=e=>{const next=e.target.value;if(supported.includes(next)){lang=next;applyLanguage();}};
  languageSelect.addEventListener('change',onLanguageChange);
  languageSelect.addEventListener('input',onLanguageChange);
  $('#searchOpen').addEventListener('click',openSearch);
  $$('[data-close-search]').forEach(x=>x.addEventListener('click',closeSearch));
  $$('[data-close-detail]').forEach(x=>x.addEventListener('click',closeDetail));
  $('#guideSearch').addEventListener('input',e=>renderSearch(e.target.value));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#detailModal').hidden)closeDetail();if(!$('#searchPanel').hidden)closeSearch();}});

  applyLanguage();
})();