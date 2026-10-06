import { auth, db, googleProvider } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, updateProfile } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
import { showMessage } from "./app.js";

const msg=document.getElementById("auth-message");

async function saveUser(user,name=""){
  await setDoc(doc(db,"users",user.uid),{
    uid:user.uid,name:name||user.displayName||"",email:user.email||"",
    provider:user.providerData?.[0]?.providerId||"unknown",
    role:"client",updatedAt:serverTimestamp()
  },{merge:true});
}

document.getElementById("login-form")?.addEventListener("submit",async e=>{
  e.preventDefault(); showMessage(msg,"Signing you in...");
  try{
    const c=await signInWithEmailAndPassword(auth,email.value.trim(),password.value);
    await saveUser(c.user);
    location.href="partner-code.html";
  }catch(err){showMessage(msg,friendly(err),"error");}
});

document.getElementById("register-form")?.addEventListener("submit",async e=>{
  e.preventDefault();
  if(password.value!==document.getElementById("confirm-password").value) return showMessage(msg,"Passwords do not match.","error");
  showMessage(msg,"Creating your secure account...");
  try{
    const c=await createUserWithEmailAndPassword(auth,email.value.trim(),password.value);
    await updateProfile(c.user,{displayName:name.value.trim()});
    await saveUser(c.user,name.value.trim());
    location.href="partner-code.html";
  }catch(err){showMessage(msg,friendly(err),"error");}
});

document.getElementById("google-login")?.addEventListener("click",google);
document.getElementById("google-register")?.addEventListener("click",google);
async function google(){
  showMessage(msg,"Opening Google sign-in...");
  try{const c=await signInWithPopup(auth,googleProvider);await saveUser(c.user);location.href="partner-code.html";}
  catch(err){showMessage(msg,friendly(err),"error");}
}

document.getElementById("forgot-password")?.addEventListener("click",async e=>{
  e.preventDefault();
  const address=document.getElementById("email")?.value.trim();
  if(!address)return showMessage(msg,"Enter your email first.","error");
  try{await sendPasswordResetEmail(auth,address);showMessage(msg,"Password reset email sent.","success");}
  catch(err){showMessage(msg,friendly(err),"error");}
});

function friendly(err){
  const c=err?.code||"";
  const map={"auth/invalid-credential":"Email or password is incorrect.","auth/email-already-in-use":"An account already exists with this email.","auth/weak-password":"Use a stronger password.","auth/invalid-email":"Please enter a valid email address.","auth/popup-closed-by-user":"Google sign-in was cancelled.","auth/popup-blocked":"Allow popups for Google sign-in."};
  return map[c]||"Something went wrong. Check your Firebase configuration and try again.";
}