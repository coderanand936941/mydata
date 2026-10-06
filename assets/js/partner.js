import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { showMessage } from "./app.js";

const form=document.getElementById("code-form"), msg=document.getElementById("code-message");
let currentUser=null;

onAuthStateChanged(auth,u=>{ if(!u){location.href="login.html";} else currentUser=u; });

form?.addEventListener("submit",async e=>{
  e.preventDefault(); const code=document.getElementById("partner-code").value.trim().toUpperCase();
  if(!code)return;
  showMessage(msg,"Verifying partner code...");
  try{
    const snap=await getDoc(doc(db,"partnerCodes",code));
    if(!snap.exists() || snap.data().status!=="active") return showMessage(msg,"This partner code is invalid or inactive.","error");
    const p=snap.data();
    await setDoc(doc(db,"users",currentUser.uid),{partnerId:p.partnerId,partnerCode:code,partnerAssignedAt:serverTimestamp()},{merge:true});
    localStorage.setItem("nexora_partner_connected","1");
    showMessage(msg,`Connected with ${p.partnerName||"your partner"}. Redirecting...`,"success");
    setTimeout(()=>location.href="dashboard.html",700);
  }catch(err){console.error(err);showMessage(msg,"Could not verify the code. Check your Firebase rules.","error");}
});
document.getElementById("skip-code")?.addEventListener("click",()=>location.href="dashboard.html");