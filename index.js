// index.js
import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const adminEmail = "nagi@example.com";
const adminPass = "PAIN2358";

// Ensure admin exists
async function ensureAdmin() {
  try {
    await signInWithEmailAndPassword(auth, adminEmail, adminPass);
    await auth.signOut();
  } catch (e) {
    if (e.code === "auth/user-not-found") {
      const cred = await createUserWithEmailAndPassword(auth, adminEmail, adminPass);
      await setDoc(doc(db, "users", cred.user.uid), { email: adminEmail, team: [], totalPoints: 0 });
      await auth.signOut();
    }
  }
}
ensureAdmin();

// Login
document.getElementById('btnLogin').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!email || !password) return alert("Enter email and password");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    const uid = auth.currentUser.uid;
    const userDoc = doc(db, "users", uid);
    const snap = await getDoc(userDoc);
    if (!snap.exists()) await setDoc(userDoc, { email, team: [], totalPoints: 0 });
    window.location.href = "team.html";
  } catch (err) {
    alert("Login error: " + err.message);
  }
});

// Register
document.getElementById('btnRegister').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  if (!email || !password) return alert("Enter email and password");

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), { email, team: [], totalPoints: 0 });
    alert("Registered! You can now log in.");
  } catch (err) {
    alert("Register error: " + err.message);
  }
});

// Auto-redirect if already logged in
onAuthStateChanged(auth, user => {
  if (user) window.location.href = "team.html";
});
