(function(){
"use strict";
var $=function(id){return document.getElementById(id)}, posts=[],sha=null,selection=-1;
function message(t){$("editorMessage").textContent=t}
function grant(){if(sessionStorage.getItem("abyx_leader_unlocked")==="1"){$("unlockForm").hidden=true;$("editingArea").hidden=false;message("Unlocked via Leader Tools. GitHub write permission is required to publish.");return true}return false}
function token(){var t=$("githubToken").value.trim();if(!t)throw Error("Enter a GitHub access token with repository Contents write permission.");return t}
function encode(s){return btoa(unescape(encodeURIComponent(s)))}
function decode(s){return decodeURIComponent(escape(atob(s.replace(/\s/g,""))))}
async function api(method,payload){var response=await fetch("https://api.github.com/repos/ABYX-DWD/abyx-dwd.github.io/contents/news-guides/posts.json",{method:method,headers:{"Accept":"application/vnd.github+json","Authorization":"Bearer "+token(),"Content-Type":"application/json"},body:payload?JSON.stringify(payload):undefined,cache:"no-store"});if(!response.ok)throw Error("GitHub rejected request (HTTP "+response.status+"). Check your permissions and reload before retrying.");return response.json()}
function fill(){var p=posts[selection]||{},language=$("postLanguage").value;$("postDate").value=p.date||new Date().toISOString().slice(0,10);$("postThumb").value=p.thumbnail||"";$("postLink").value=p.url||"";$("postTitle").value=(p.title||{})[language]||"";$("postText").value=(p.text||{})[language]||""}
function refresh(){var sel=$("postSelect");sel.replaceChildren();sel.add(new Option("— New article —","-1"));posts.forEach(function(p,i){sel.add(new Option((p.date||"")+" — "+((p.title||{}).en||Object.values(p.title||{})[0]||"Untitled"),String(i)))});sel.value=String(selection);fill();POSTS=posts;renderPosts()}
async function load(){var r=await api("GET");var parsed=JSON.parse(decode(r.content));if(!Array.isArray(parsed))throw Error("Invalid article list.");posts=parsed;sha=r.sha;selection=-1;refresh();message("Published articles loaded.")}
async function publish(list,verb){if(!sha)throw Error("Load the published articles first.");var r=await api("PUT",{message:"ABYX News: "+verb,branch:"main",sha:sha,content:encode(JSON.stringify(list,null,2)+"\n")});sha=r.content.sha;posts=list;selection=-1;refresh();message("Published successfully.")}
async function run(f){try{message("");await f()}catch(e){message(e.message)}}
document.addEventListener("DOMContentLoaded",function(){
$("adminToggle").addEventListener("click",function(){$("editorPanel").hidden=!$("editorPanel").hidden;if(!$("editorPanel").hidden&&!grant()){$("adminPassword").focus()}});
$("unlockForm").addEventListener("submit",function(e){e.preventDefault();message("Open Leader Tools, unlock it using your usual password, then return here and click ADMIN again.");$("adminPassword").value=""});
$("loadRemote").addEventListener("click",function(){run(load)});
$("newPost").addEventListener("click",function(){selection=-1;$("postSelect").value="-1";fill()});
$("postSelect").addEventListener("change",function(){selection=Number(this.value);fill()});
$("postLanguage").addEventListener("change",fill);
$("postForm").addEventListener("submit",function(e){e.preventDefault();run(async function(){if(!sha)throw Error("Load the articles first.");var p=selection<0?{title:{},text:{}}:JSON.parse(JSON.stringify(posts[selection])),l=$("postLanguage").value;p.date=$("postDate").value;p.thumbnail=$("postThumb").value.trim();p.url=$("postLink").value.trim();p.title[l]=$("postTitle").value.trim();p.text[l]=$("postText").value.trim();if(!p.title[l]||!p.text[l])throw Error("Title and text are required.");var list=posts.slice();if(selection<0)list.push(p);else list[selection]=p;list.sort(function(a,b){return String(b.date).localeCompare(String(a.date))});await publish(list,"update articles")})});
$("deletePost").addEventListener("click",function(){run(async function(){if(selection<0)throw Error("Select an article.");if(!confirm("Delete this article?"))return;await publish(posts.filter(function(_,i){return i!==selection}),"delete article")})});
$("exportPosts").addEventListener("click",function(){var b=new Blob([JSON.stringify(posts,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="abyx-news.json";a.click();URL.revokeObjectURL(a.href)});
});})();