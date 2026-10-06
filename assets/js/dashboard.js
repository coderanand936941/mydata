import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { initials } from "./app.js";

onAuthStateChanged(auth, async user=>{
 if(!user){location.href="login.html";return;}
 document.getElementById("user-name").textContent=user.displayName||"User";
 document.getElementById("user-avatar").textContent=initials(user.displayName||user.email);
 try{
   const u=await getDoc(doc(db,"users",user.uid));
   if(u.exists() && u.data().partnerId){
      const p=await getDoc(doc(db,"partners",u.data().partnerId));
      if(p.exists()){
        const d=p.data();
        document.getElementById("partner-name").textContent=d.name||"Connected";
        document.getElementById("partner-status").textContent=d.status==="active"?"Verified partner":"Partner unavailable";
        document.getElementById("partner-title").textContent="Your partner";
        document.getElementById("partner-display").textContent=d.name||"Partner";
        document.getElementById("partner-role").textContent=d.role||"Digital professional";
        document.getElementById("partner-avatar").textContent=initials(d.name||"P");
      }
   }
 }catch(e){console.warn("Partner data unavailable",e);}
});