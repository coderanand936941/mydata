import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const loader = document.getElementById("app-loader");
window.addEventListener("load",()=>setTimeout(()=>loader?.classList.add("hidden"),250));

document.querySelectorAll(".reveal").forEach(el=>{
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});
  io.observe(el);
});

document.getElementById("logout")?.addEventListener("click", async ()=>{
  try { await signOut(auth); location.href="index.html"; } catch(e){ alert("Could not sign out."); }
});
document.getElementById("mobile-menu")?.addEventListener("click",()=>{
  document.querySelector(".sidebar")?.classList.toggle("open");
});

document.querySelectorAll(".request-service").forEach(a=>{
  a.addEventListener("click",e=>{
    e.preventDefault();
    const service=a.dataset.service;
    localStorage.setItem("nexora_requested_service",service);
    alert(`${service} selected. Connect this action to your Firebase project request collection.`);
  });
});

export function initials(name="User"){return name.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase()||"U";}
export function showMessage(el,msg,type=""){if(!el)return;el.textContent=msg;el.className=`form-message ${type}`;}