import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

const adminEmail = "nagi@example.com";
const adminPass = "PAIN2358";

// Auto-create admin if not exists
async function ensureAdmin() {
  try {
    await signInWithEmailAndPassword(auth, adminEmail, adminPass);
    await auth.signOut();
  } catch(e) {
    if(e.code === "auth/user-not-found") {
      const cred = await createUserWithEmailAndPassword(auth, adminEmail, adminPass);
      await setDoc(doc(db, "users", cred.user.uid), { email: adminEmail, team: [], totalPoints: 0 });
      await auth.signOut();
    }
  }
}

ensureAdmin();

document.getElementById("btnLogin").addEventListener("click", async ()=>{
  const email = emailInput.value.trim();
  const pass = passInput.value.trim();
  if(!email || !pass) return alert("Enter email and password");
  try{
    await signInWithEmailAndPassword(auth, email, pass);
    window.location.href = "team.html";
  } catch(e){
    alert("Login error: "+e.message);
  }
});

document.getElementById("btnRegister").addEventListener("click", async ()=>{
  const email = emailInput.value.trim();
  const pass = passInput.value.trim();
  if(!email || !pass) return alert("Enter email and password");
  try{
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await setDoc(doc(db, "users", cred.user.uid), { email, team: [], totalPoints: 0 });
    alert("Registered. You can now log in.");
  } catch(e){
    alert("Register error: "+e.message);
  }
});

onAuthStateChanged(auth, user=>{
  if(user){
    window.location.href="team.html";
  }
});
