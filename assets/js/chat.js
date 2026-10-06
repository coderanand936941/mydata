import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
onAuthStateChanged(auth,u=>{if(!u)location.href="login.html";});
document.getElementById("message-form")?.addEventListener("submit",e=>{
 e.preventDefault(); const input=document.getElementById("message-input"); const text=input.value.trim(); if(!text)return;
 const box=document.createElement("div"); box.className="bubble client"; box.innerHTML=`${escapeHtml(text)}<span>Just now · ✓</span>`;
 document.querySelector(".messages").appendChild(box); input.value=""; document.querySelector(".messages").scrollTop=999999;
});
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}