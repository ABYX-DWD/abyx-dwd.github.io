(function(){
"use strict";
var AUTH_KEY="abyx_leader_unlocked";
var PASS_HASH="99ad0c262ec5c6d3c9575fdeea969eece8655cdd759547ef1db28cd87e37108d";
function unlocked(){try{return sessionStorage.getItem(AUTH_KEY)==="1"}catch(_){return false}}
function injectStyle(){
  if(document.getElementById("abyxToolAuthStyle"))return;
  var s=document.createElement("style");s.id="abyxToolAuthStyle";
  s.textContent=".abyx-auth-pending body>*{visibility:hidden}.abyx-auth-pending #abyxToolLock{visibility:visible!important}.abyx-tool-lock{position:fixed;inset:0;z-index:50000;display:grid;place-items:center;padding:20px;background:linear-gradient(rgba(1,7,12,.82),rgba(1,7,12,.96)),url('../../assets/abyx-hero-egypt.webp') center/cover no-repeat;font-family:Inter,Segoe UI,Arial,sans-serif}.abyx-tool-lock-card{width:min(420px,100%);padding:28px 24px 23px;border:1px solid rgba(216,182,110,.28);border-radius:17px;background:linear-gradient(180deg,rgba(8,24,38,.99),rgba(3,12,21,.99));box-shadow:0 38px 120px rgba(0,0,0,.72);text-align:center;color:#f7fbff}.abyx-tool-lock-mark{width:62px;height:62px;margin:0 auto 17px;display:grid;place-items:center;border:1px solid rgba(102,229,255,.28);background:linear-gradient(145deg,rgba(102,229,255,.14),rgba(216,182,110,.07));clip-path:polygon(50% 0,100% 26%,100% 74%,50% 100%,0 74%,0 26%);color:#66e5ff;font-size:1.55rem;font-weight:950}.abyx-tool-lock-card h2{margin:0;font-size:1.55rem}.abyx-tool-lock-card p{margin:9px 0 18px;color:#8fa7b7;font-size:.9rem;line-height:1.5}.abyx-tool-lock-card input{width:100%;height:49px;padding:0 13px;border:1px solid rgba(102,229,255,.18);border-radius:9px;background:rgba(1,8,14,.76);color:#fff;outline:none;text-align:center;letter-spacing:.11em}.abyx-tool-lock-card input:focus{border-color:rgba(102,229,255,.50)}.abyx-tool-lock-card button{width:100%;height:49px;margin-top:9px;border:0;border-radius:9px;background:linear-gradient(135deg,#66e5ff,#aef3ff);color:#031019;font-weight:950;letter-spacing:.07em;text-transform:uppercase;cursor:pointer}.abyx-tool-lock-error{min-height:18px!important;margin:7px 0 0!important;color:#ff7f8d!important;font-size:.76rem!important}.abyx-tool-lock-back{display:inline-block;margin-top:13px;color:#7f98a8;text-decoration:none;font-size:.75rem}.abyx-tool-lock-back:hover{color:#fff}";
  document.head.appendChild(s);
}
async function sha256(v){var data=new TextEncoder().encode(v);var hash=await crypto.subtle.digest("SHA-256",data);return Array.from(new Uint8Array(hash)).map(function(b){return b.toString(16).padStart(2,"0")}).join("")}
function unlock(){try{sessionStorage.setItem(AUTH_KEY,"1")}catch(_){}document.documentElement.classList.remove("abyx-auth-pending");var o=document.getElementById("abyxToolLock");if(o)o.remove()}
function show(){
  injectStyle();
  var o=document.createElement("div");o.id="abyxToolLock";o.className="abyx-tool-lock";
  o.innerHTML='<div class="abyx-tool-lock-card"><div class="abyx-tool-lock-mark">A</div><h2>ABYX Leader Access</h2><p>This tool is reserved for ABYX leadership.</p><form id="abyxToolLockForm"><input id="abyxToolPassword" type="password" autocomplete="current-password" placeholder="Password"><button type="submit">Unlock</button><p class="abyx-tool-lock-error" id="abyxToolLockError"></p></form><a class="abyx-tool-lock-back" href="../">← Leader Tools</a></div>';
  document.body.appendChild(o);document.documentElement.classList.add("abyx-auth-pending");
  var f=document.getElementById("abyxToolLockForm"),i=document.getElementById("abyxToolPassword"),e=document.getElementById("abyxToolLockError");
  f.addEventListener("submit",async function(ev){ev.preventDefault();e.textContent="";try{if(await sha256(i.value)===PASS_HASH){i.value="";unlock()}else{e.textContent="Incorrect password.";i.select()}}catch(_){e.textContent="Incorrect password."}});
  setTimeout(function(){i.focus()},50);
}
function init(){if(unlocked()){document.documentElement.classList.remove("abyx-auth-pending");return}show()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();