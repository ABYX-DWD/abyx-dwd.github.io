(function(){
  "use strict";

  var KEY="abyx_install_done";
  var deferredPrompt=null;
  var bubble=null;

  var copy={
    en:{bubble:"Add to Home Screen",title:"Add ABYX to your home screen",ios:"On iPhone and iPad, Apple requires the final confirmation from Safari.",share:"Open Share",done:"Done",close:"Close",s1:"Tap Share in Safari.",s2:"Choose Add to Home Screen.",s3:"Confirm with Add.",android:"Your browser has not made the native install prompt available yet. Open its menu and choose Install app or Add to Home screen.",desktop:"Open your browser menu and choose Install ABYX or Install app."},
    fr:{bubble:"Ajouter au bureau",title:"Ajouter ABYX au bureau",ios:"Sur iPhone et iPad, Apple impose la confirmation finale depuis Safari.",share:"Ouvrir Partager",done:"C’est fait",close:"Fermer",s1:"Touchez Partager dans Safari.",s2:"Choisissez Sur l’écran d’accueil.",s3:"Confirmez avec Ajouter.",android:"Le navigateur n’a pas encore rendu l’installation native disponible. Ouvrez son menu puis choisissez Installer l’application ou Ajouter à l’écran d’accueil.",desktop:"Ouvrez le menu du navigateur puis choisissez Installer ABYX ou Installer l’application."},
    it:{bubble:"Aggiungi alla schermata Home",title:"Aggiungi ABYX alla schermata Home",ios:"Su iPhone e iPad, Apple richiede la conferma finale da Safari.",share:"Apri Condividi",done:"Fatto",close:"Chiudi",s1:"Tocca Condividi in Safari.",s2:"Scegli Aggiungi alla schermata Home.",s3:"Conferma con Aggiungi.",android:"Il browser non ha ancora reso disponibile il prompt nativo. Apri il menu e scegli Installa app o Aggiungi alla schermata Home.",desktop:"Apri il menu del browser e scegli Installa ABYX o Installa app."},
    de:{bubble:"Zum Startbildschirm",title:"ABYX zum Startbildschirm hinzufügen",ios:"Auf iPhone und iPad verlangt Apple die letzte Bestätigung in Safari.",share:"Teilen öffnen",done:"Erledigt",close:"Schließen",s1:"Tippe in Safari auf Teilen.",s2:"Wähle Zum Home-Bildschirm.",s3:"Bestätige mit Hinzufügen.",android:"Der Browser bietet die native Installation noch nicht an. Öffne das Menü und wähle App installieren oder Zum Startbildschirm hinzufügen.",desktop:"Öffne das Browsermenü und wähle ABYX installieren oder App installieren."},
    pl:{bubble:"Dodaj do ekranu",title:"Dodaj ABYX do ekranu początkowego",ios:"Na iPhonie i iPadzie Apple wymaga końcowego potwierdzenia w Safari.",share:"Otwórz Udostępnij",done:"Gotowe",close:"Zamknij",s1:"Dotknij Udostępnij w Safari.",s2:"Wybierz Dodaj do ekranu początkowego.",s3:"Potwierdź Dodaj.",android:"Przeglądarka nie udostępniła jeszcze natywnego okna instalacji. Otwórz menu i wybierz Zainstaluj aplikację lub Dodaj do ekranu głównego.",desktop:"Otwórz menu przeglądarki i wybierz Zainstaluj ABYX lub Zainstaluj aplikację."},
    ru:{bubble:"Добавить на экран",title:"Добавить ABYX на главный экран",ios:"На iPhone и iPad Apple требует финального подтверждения в Safari.",share:"Открыть Поделиться",done:"Готово",close:"Закрыть",s1:"Нажмите Поделиться в Safari.",s2:"Выберите На экран «Домой».",s3:"Подтвердите Добавить.",android:"Браузер пока не предоставил системное окно установки. Откройте меню и выберите Установить приложение или Добавить на главный экран.",desktop:"Откройте меню браузера и выберите Установить ABYX или Установить приложение."},
    uk:{bubble:"Додати на екран",title:"Додати ABYX на початковий екран",ios:"На iPhone та iPad Apple вимагає фінального підтвердження в Safari.",share:"Відкрити Поділитися",done:"Готово",close:"Закрити",s1:"Натисніть Поділитися в Safari.",s2:"Виберіть На початковий екран.",s3:"Підтвердьте Додати.",android:"Браузер ще не надав системне вікно встановлення. Відкрийте меню та виберіть Встановити застосунок або Додати на головний екран.",desktop:"Відкрийте меню браузера та виберіть Встановити ABYX або Встановити застосунок."}
  };

  function lang(){
    var l=(document.documentElement.lang||"en").toLowerCase().slice(0,2);
    return copy[l]?l:"en";
  }
  function t(){return copy[lang()]}
  function installed(){
    return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===true;
  }
  function done(){
    if(installed())return true;
    try{return localStorage.getItem(KEY)==="1"}catch(_){return false}
  }
  function markDone(){
    try{localStorage.setItem(KEY,"1")}catch(_){}
    if(bubble)bubble.hidden=true;
  }
  function isIOS(){
    return /iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  }
  function isAndroid(){return /android/i.test(navigator.userAgent)}

  function ensureBubble(){
    if(bubble)return bubble;
    bubble=document.createElement("button");
    bubble.id="abyxInstallBubble";
    bubble.className="abyx-install-bubble";
    bubble.type="button";
    bubble.innerHTML='<span class="abyx-install-bubble-icon" aria-hidden="true">⇩</span><span class="abyx-install-bubble-label"></span>';
    document.body.appendChild(bubble);
    bubble.addEventListener("click",handleInstall);
    return bubble;
  }

  function updateBubble(){
    var b=ensureBubble();
    b.querySelector(".abyx-install-bubble-label").textContent=t().bubble;
    b.hidden=done();
  }

  function ensureDialog(){
    var o=document.getElementById("abyxInstallOverlay");
    if(o)return o;
    o=document.createElement("div");
    o.id="abyxInstallOverlay";
    o.className="abyx-install-overlay";
    o.hidden=true;
    o.innerHTML='<div class="abyx-install-dialog" role="dialog" aria-modal="true" aria-labelledby="abyxInstallTitle">'+
      '<button class="abyx-install-close" type="button" aria-label="Close">×</button>'+
      '<h3 id="abyxInstallTitle"></h3><p id="abyxInstallText"></p>'+
      '<ol class="abyx-install-steps" id="abyxInstallSteps"></ol>'+
      '<div class="abyx-install-actions"><button class="abyx-install-primary" id="abyxInstallShare" type="button"></button><button class="abyx-install-secondary" id="abyxInstallDone" type="button"></button><button class="abyx-install-secondary" id="abyxInstallDismiss" type="button"></button></div>'+
      '</div>';
    document.body.appendChild(o);
    function close(){o.hidden=true}
    o.querySelector(".abyx-install-close").addEventListener("click",close);
    o.querySelector("#abyxInstallDismiss").addEventListener("click",close);
    o.querySelector("#abyxInstallDone").addEventListener("click",function(){markDone();close()});
    o.addEventListener("click",function(e){if(e.target===o)close()});
    return o;
  }

  function showHelp(){
    var o=ensureDialog(),d=t(),steps=o.querySelector("#abyxInstallSteps"),share=o.querySelector("#abyxInstallShare");
    o.querySelector("#abyxInstallTitle").textContent=d.title;
    o.querySelector("#abyxInstallDismiss").textContent=d.close;
    o.querySelector("#abyxInstallDone").textContent=d.done;

    if(isIOS()){
      o.querySelector("#abyxInstallText").textContent=d.ios;
      steps.innerHTML='<li><span class="abyx-install-stepnum">1</span><span>'+d.s1+'</span></li>'+
        '<li><span class="abyx-install-stepnum">2</span><span>'+d.s2+'</span></li>'+
        '<li><span class="abyx-install-stepnum">3</span><span>'+d.s3+'</span></li>';
      share.hidden=!navigator.share;
      share.textContent=d.share;
      share.onclick=async function(){
        try{
          await navigator.share({title:"ABYX",url:location.origin+"/"});
          markDone();
          o.hidden=true;
        }catch(_){}
      };
    }else{
      o.querySelector("#abyxInstallText").textContent=isAndroid()?d.android:d.desktop;
      steps.innerHTML="";
      share.hidden=true;
    }
    o.hidden=false;
  }

  async function handleInstall(){
    if(done()){markDone();return}
    if(deferredPrompt){
      var p=deferredPrompt;
      deferredPrompt=null;
      p.prompt();
      try{
        var result=await p.userChoice;
        if(result&&result.outcome==="accepted")markDone();
      }catch(_){}
      return;
    }
    if(isIOS()&&navigator.share){
      try{
        await navigator.share({title:"ABYX",url:location.origin+"/"});
        markDone();
        return;
      }catch(_){}
    }
    showHelp();
  }

  window.addEventListener("beforeinstallprompt",function(e){
    e.preventDefault();
    deferredPrompt=e;
    updateBubble();
  });

  window.addEventListener("appinstalled",function(){
    deferredPrompt=null;
    markDone();
  });

  if(installed())markDone();

  if("serviceWorker" in navigator){
    window.addEventListener("load",function(){
      navigator.serviceWorker.register("/sw.js?v=1").catch(function(){});
    });
  }

  new MutationObserver(updateBubble).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
  updateBubble();
})();