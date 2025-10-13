// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Your Firebase config
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
