// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
