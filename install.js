
(function(){
  "use strict";
  var deferredPrompt=null;
  var btn=document.getElementById("abyxInstallBtn");
  if(!btn)return;

  var copy={
    en:{button:"Install",title:"Install ABYX",ios:"On iPhone and iPad, Apple requires the final confirmation through Safari's Share menu.",share:"Open Share menu",close:"Close",s1:"Tap Share in Safari.",s2:"Choose Add to Home Screen.",s3:"Confirm with Add.",android:"Your browser has not made the native install prompt available yet. Open the browser menu and choose Install app or Add to Home screen.",desktop:"Open your browser menu and choose Install ABYX or Install app."},
    fr:{button:"Installer",title:"Installer ABYX",ios:"Sur iPhone et iPad, Apple impose la confirmation finale depuis le menu Partager de Safari.",share:"Ouvrir Partager",close:"Fermer",s1:"Touchez Partager dans Safari.",s2:"Choisissez Sur l’écran d’accueil.",s3:"Confirmez avec Ajouter.",android:"Le navigateur n’a pas encore rendu l’installation native disponible. Ouvrez son menu puis choisissez Installer l’application ou Ajouter à l’écran d’accueil.",desktop:"Ouvrez le menu du navigateur puis choisissez Installer ABYX ou Installer l’application."},
    it:{button:"Installa",title:"Installa ABYX",ios:"Su iPhone e iPad, Apple richiede la conferma finale dal menu Condividi di Safari.",share:"Apri Condividi",close:"Chiudi",s1:"Tocca Condividi in Safari.",s2:"Scegli Aggiungi alla schermata Home.",s3:"Conferma con Aggiungi.",android:"Il browser non ha ancora reso disponibile il prompt nativo. Apri il menu e scegli Installa app o Aggiungi alla schermata Home.",desktop:"Apri il menu del browser e scegli Installa ABYX o Installa app."},
    de:{button:"Installieren",title:"ABYX installieren",ios:"Auf iPhone und iPad verlangt Apple die letzte Bestätigung über das Teilen-Menü von Safari.",share:"Teilen öffnen",close:"Schließen",s1:"Tippe in Safari auf Teilen.",s2:"Wähle Zum Home-Bildschirm.",s3:"Bestätige mit Hinzufügen.",android:"Der Browser bietet die native Installation noch nicht an. Öffne das Menü und wähle App installieren oder Zum Startbildschirm hinzufügen.",desktop:"Öffne das Browsermenü und wähle ABYX installieren oder App installieren."},
    pl:{button:"Zainstaluj",title:"Zainstaluj ABYX",ios:"Na iPhonie i iPadzie Apple wymaga końcowego potwierdzenia w menu Udostępnij Safari.",share:"Otwórz Udostępnij",close:"Zamknij",s1:"Dotknij Udostępnij w Safari.",s2:"Wybierz Dodaj do ekranu początkowego.",s3:"Potwierdź Dodaj.",android:"Przeglądarka nie udostępniła jeszcze natywnego okna instalacji. Otwórz menu i wybierz Zainstaluj aplikację lub Dodaj do ekranu głównego.",desktop:"Otwórz menu przeglądarki i wybierz Zainstaluj ABYX lub Zainstaluj aplikację."},
    ru:{button:"Установить",title:"Установить ABYX",ios:"На iPhone и iPad Apple требует финальное подтверждение через меню Поделиться в Safari.",share:"Открыть Поделиться",close:"Закрыть",s1:"Нажмите Поделиться в Safari.",s2:"Выберите На экран «Домой».",s3:"Подтвердите Добавить.",android:"Браузер пока не предоставил системное окно установки. Откройте меню и выберите Установить приложение или Добавить на главный экран.",desktop:"Откройте меню браузера и выберите Установить ABYX или Установить приложение."},
    uk:{button:"Встановити",title:"Встановити ABYX",ios:"На iPhone та iPad Apple вимагає фінального підтвердження через меню Поділитися в Safari.",share:"Відкрити Поділитися",close:"Закрити",s1:"Натисніть Поділитися в Safari.",s2:"Виберіть На початковий екран.",s3:"Підтвердьте Додати.",android:"Браузер ще не надав системне вікно встановлення. Відкрийте меню та виберіть Встановити застосунок або Додати на головний екран.",desktop:"Відкрийте меню браузера та виберіть Встановити ABYX або Встановити застосунок."}
  };

  function lang(){var l=(document.documentElement.lang||"en").toLowerCase().slice(0,2);return copy[l]?l:"en"}
  function t(){return copy[lang()]}
  function installed(){return window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===true}
  function isIOS(){return /iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)}
  function isAndroid(){return /android/i.test(navigator.userAgent)}

  function updateLabel(){
    var l=btn.querySelector(".abyx-install-label");
    if(l)l.textContent=t().button;
    if(installed())btn.hidden=true;
  }

  function ensureDialog(){
    var o=document.getElementById("abyxInstallOverlay");
    if(o)return o;
    o=document.createElement("div");
    o.id="abyxInstallOverlay";o.className="abyx-install-overlay";o.hidden=true;
    o.innerHTML='<div class="abyx-install-dialog" role="dialog" aria-modal="true" aria-labelledby="abyxInstallTitle">'+
      '<button class="abyx-install-close" type="button" aria-label="Close">×</button>'+
      '<h3 id="abyxInstallTitle"></h3><p id="abyxInstallText"></p>'+
      '<ol class="abyx-install-steps" id="abyxInstallSteps"></ol>'+
      '<div class="abyx-install-actions"><button class="abyx-install-primary" id="abyxInstallShare" type="button"></button><button class="abyx-install-secondary" id="abyxInstallDismiss" type="button"></button></div>'+
      '</div>';
    document.body.appendChild(o);
    function close(){o.hidden=true}
    o.querySelector(".abyx-install-close").addEventListener("click",close);
    o.querySelector("#abyxInstallDismiss").addEventListener("click",close);
    o.addEventListener("click",function(e){if(e.target===o)close()});
    return o;
  }

  function showHelp(){
    var o=ensureDialog(),d=t(),steps=o.querySelector("#abyxInstallSteps"),share=o.querySelector("#abyxInstallShare");
    o.querySelector("#abyxInstallTitle").textContent=d.title;
    o.querySelector("#abyxInstallDismiss").textContent=d.close;
    if(isIOS()){
      o.querySelector("#abyxInstallText").textContent=d.ios;
      steps.innerHTML='<li><span class="abyx-install-stepnum">1</span><span>'+d.s1+'</span></li><li><span class="abyx-install-stepnum">2</span><span>'+d.s2+'</span></li><li><span class="abyx-install-stepnum">3</span><span>'+d.s3+'</span></li>';
      share.hidden=!navigator.share;share.textContent=d.share;
      share.onclick=function(){navigator.share({title:"ABYX",url:location.origin+"/"}).catch(function(){})};
    }else{
      o.querySelector("#abyxInstallText").textContent=isAndroid()?d.android:d.desktop;
      steps.innerHTML="";
      share.hidden=true;
    }
    o.hidden=false;
  }

  window.addEventListener("beforeinstallprompt",function(e){
    e.preventDefault();deferredPrompt=e;btn.hidden=false;updateLabel();
  });
  window.addEventListener("appinstalled",function(){deferredPrompt=null;btn.hidden=true});

  btn.addEventListener("click",async function(){
    if(installed()){btn.hidden=true;return}
    if(deferredPrompt){
      var p=deferredPrompt;deferredPrompt=null;
      p.prompt();
      try{await p.userChoice}catch(_){}
      return;
    }
    if(isIOS()&&navigator.share){
      try{await navigator.share({title:"ABYX",url:location.origin+"/"});return}catch(_){}
    }
    showHelp();
  });

  if("serviceWorker" in navigator){
    window.addEventListener("load",function(){navigator.serviceWorker.register("/sw.js?v=1").catch(function(){})});
  }
  new MutationObserver(updateLabel).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
  updateLabel();
})();
