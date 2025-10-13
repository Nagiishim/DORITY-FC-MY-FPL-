

import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");

// Ensure admin exists
async function ensureAdmin() {
  const adminEmail = "nagi@local";
  const adminPass = "PAIN2358";
  try {
    await signInWithEmailAndPassword(auth, adminEmail, adminPass);
  } catch (e) {
    if (e.code === "auth/user-not-found") {
      const cred = await createUserWithEmailAndPassword(auth, adminEmail, adminPass);
      await setDoc(doc(db, "users", cred.user.uid), { email: adminEmail, team: [], totalPoints: 0 });
    }
  }
}
ensureAdmin();

btnLogin.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const pass = passInput.value.trim();
  if (!email || !pass) return alert("Enter email and password");
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, pass);
    const uid = userCred.user.uid;
    const docRef = doc(db, "users", uid);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      await setDoc(docRef, { email, team: [], totalPoints: 0 });
    }
    localStorage.setItem("currentUser", uid);
    window.location.href = "team.html";
  } catch (e) {
    alert("Login error: " + e.message);
  }
});

btnRegister.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const pass = passInput.value.trim();
  if (!email || !pass) return alert("Enter email and password");
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await setDoc(doc(db, "users", cred.user.uid), { email, team: [], totalPoints: 0 });
    alert("Registered. You can now log in.");
  } catch (e) {
    alert("Register error: " + e.message);
  }
});
