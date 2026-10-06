import { auth, db } from "./firebase.js";
import { onAuthStateChanged, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { initials } from "./app.js";

let user;
onAuthStateChanged(auth,async u=>{
 if(!u){location.href="login.html";return;} user=u;
 const name=u.displayName||"User";
 document.getElementById("profile-name").textContent=name;
 document.getElementById("profile-email").textContent=u.email||"";
 document.getElementById("profile-avatar").textContent=initials(name);
 document.getElementById("profile-name-input").value=name;
 document.getElementById("profile-email-input").value=u.email||"";
 try{
   const s=await getDoc(doc(db,"users",u.uid)); const d=s.data()||{};
   document.getElementById("profile-phone").value=d.phone||"";
   document.getElementById("profile-company").value=d.company||"";
   document.getElementById("profile-partner-status").textContent=d.partnerId?`Connected · Code ${d.partnerCode||""}`:"No partner assigned.";
 }catch(e){}
});
document.getElementById("save-profile")?.addEventListener("click",async()=>{
 try{
   await setDoc(doc(db,"users",user.uid),{name:document.getElementById("profile-name-input").value.trim(),phone:document.getElementById("profile-phone").value.trim(),company:document.getElementById("profile-company").value.trim()},{merge:true});
   alert("Profile updated.");
 }catch(e){alert("Could not save profile. Check Firebase rules.");}
});
document.getElementById("reset-password")?.addEventListener("click",async()=>{
 try{await sendPasswordResetEmail(auth,user.email);alert("Password reset email sent.");}catch(e){alert("Could not send reset email.");}
});
document.getElementById("logout-profile")?.addEventListener("click",async()=>{await signOut(auth);location.href="index.html";});