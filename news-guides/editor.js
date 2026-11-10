(function(){
"use strict";
var $=function(id){return document.getElementById(id)};
var KEY="abyx_news_editor_drafts_v1", drafts=[], selection=-1;
function msg(s){$("editorMessage").textContent=s}
function language(){try{return localStorage.getItem("abyx_lang")||"en"}catch(e){return"en"}}
function copy(a){return JSON.parse(JSON.stringify(a))}
function get(){try{var a=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(a)?a:[]}catch(e){return[]}}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(drafts));return true}catch(e){msg("Browser storage is unavailable. Download the JSON to keep your changes.");return false}}
function setForm(){var p=drafts[selection]||{}, l=$("postLanguage").value;$("postDate").value=p.date||new Date().toISOString().slice(0,10);$("postThumb").value=p.thumbnail||"";$("postLink").value=p.url||"";$("postTitle").value=(p.title||{})[l]||"";$("postText").value=(p.text||{})[l]||""}
function refresh(){var sel=$("postSelect");sel.replaceChildren();sel.add(new Option("— New article —","-1"));drafts.forEach(function(p,i){sel.add(new Option((p.date||"")+" — "+((p.title||{}).en||Object.values(p.title||{})[0]||"Untitled"),String(i)))});sel.value=String(selection);setForm()}
function unlock(){if(sessionStorage.getItem("abyx_leader_unlocked")==="1"){$("unlockForm").hidden=true;$("editingArea").hidden=false;drafts=get();selection=-1;refresh();msg("Draft mode: changes are saved in this browser only, not published online.");return true}return false}
function download(){var b=new Blob([JSON.stringify(drafts,null,2)+"\n"],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="abyx-news-draft.json";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},1500)}
document.addEventListener("DOMContentLoaded",function(){
$("adminToggle").addEventListener("click",function(){$("editorPanel").hidden=!$("editorPanel").hidden;if(!$("editorPanel").hidden)unlock()});
$("loadRemote").textContent="Load local drafts";
$("loadRemote").addEventListener("click",function(){drafts=get();selection=-1;refresh();msg("Local drafts loaded. These are not published articles.")});
$("newPost").addEventListener("click",function(){selection=-1;$("postSelect").value="-1";setForm()});
$("postSelect").addEventListener("change",function(){selection=Number(this.value);setForm()});
$("postLanguage").addEventListener("change",setForm);
$("postForm").addEventListener("submit",function(e){e.preventDefault();var p=selection<0?{title:{},text:{}}:copy(drafts[selection]),l=$("postLanguage").value;p.date=$("postDate").value;p.thumbnail=$("postThumb").value.trim();p.url=$("postLink").value.trim();p.title[l]=$("postTitle").value.trim();p.text[l]=$("postText").value.trim();if(!p.title[l]||!p.text[l]){msg("Title and text are required.");return}if(selection<0)drafts.push(p);else drafts[selection]=p;drafts.sort(function(a,b){return String(b.date||"").localeCompare(String(a.date||"")});selection=-1;persist();refresh();msg("Draft saved in this browser. It is NOT published to the site.")});
$("deletePost").addEventListener("click",function(){if(selection<0){msg("Select a draft first.");return}if(!confirm("Remove this draft from this browser?"))return;drafts.splice(selection,1);selection=-1;persist();refresh();msg("Draft removed from this browser.")});
$("exportPosts").addEventListener("click",download);
});})();