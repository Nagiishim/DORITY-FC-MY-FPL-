// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCFknCEG0zQjTVpPCs49zm_ERzalXC63Pg",
  authDomain: "dority-fc-site.firebaseapp.com",
  projectId: "dority-fc-site",
  storageBucket: "dority-fc-site.firebasestorage.app",
  messagingSenderId: "388572626223",
  appId: "1:388572626223:web:825dcd942c3056fd3df5da",
  measurementId: "G-FG54ZJ5BRJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Admin credentials
const adminEmail = "nagi@example.com";
const adminPass = "PAIN2358";

// Ensure admin exists
async function ensureAdmin() {
  try {
    await auth.signInWithEmailAndPassword(adminEmail, adminPass);
    await auth.signOut();
  } catch (e) {
    if (e.code === "auth/user-not-found") {
      const cred = await auth.createUserWithEmailAndPassword(adminEmail, adminPass);
      await db.collection("users").doc(cred.user.uid).set({
        email: adminEmail,
        team: [],
        totalPoints: 0
      });
      await auth.signOut();
    }
  }
}
ensureAdmin();

// Login
document.getElementById('btnLogin').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();
  if (!email || !pass) return alert("Enter email and password");

  try {
    await auth.signInWithEmailAndPassword(email, pass);
    const user = auth.currentUser;
    const ref = db.collection("users").doc(user.uid);
    const snap = await ref.get();
    if (!snap.exists) await ref.set({ email: user.email, team: [], totalPoints: 0 });
    window.location.href = "team.html";
  } catch (e) {
    alert("Login error: " + e.message);
  }
});

// Register
document.getElementById('btnRegister').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();
  if (!email || !pass) return alert("Enter email and password");

  try {
    const cred = await auth.createUserWithEmailAndPassword(email, pass);
    await db.collection("users").doc(cred.user.uid).set({ email, team: [], totalPoints: 0 });
    alert("Registered! You can now log in.");
  } catch (e) {
    alert("Register error: " + e.message);
  }
});

// Auto redirect if logged in
auth.onAuthStateChanged(user => {
  if (user) window.location.href = "team.html";
});
