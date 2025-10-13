import { auth, db } from './firebase.js';
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Get current user
const uid = localStorage.getItem("currentUser");
if (!uid) window.location.href = "index.html";

const playerGrid = document.getElementById("player-grid");
const myTeamGrid = document.getElementById("my-team");
const remainingEl = document.getElementById("remaining");
const logoutBtn = document.getElementById("logout");
let userData;
let myTeam = [];
let remaining = 180;

// FULL PLAYER LIST
const players = [
  { name: "CHIBUIKE SUCCESS", position: "Forward", price: 10 },
  { name: "OKOYE NELSON", position: "Goalkeeper", price: 9.5 },
  { name: "NNADOZIE DESTINY", position: "Goalkeeper", price: 10.5 },
  { name: "UKONU ANOINTING", position: "Defender", price: 15 },
  { name: "IBE EMMANUEL", position: "Midfielder", price: 5 },
  { name: "NWANKWO OSITA", position: "Forward", price: 10 },
  { name: "JAMES NKWUMAH", position: "Midfielder", price: 5 },
  { name: "OKONKWO GERARD", position: "Defender", price: 5 },
  { name: "NNAJI MICHAEL", position: "Midfielder", price: 8 },
  { name: "IHEANACHO PRAISE", position: "Forward", price: 5 },
  { name: "CHIAMAEZE OWN", position: "Forward", price: 10 },
  { name: "EZUEGO ENU", position: "Midfielder", price: 10 },
  { name: "MAC DONALD", position: "Defender", price: 10 },
  { name: "OKWUDIRI SOLOMON", position: "Defender", price: 10 },
  { name: "EKE EMMANUEL", position: "Midfielder", price: 7.5 },
  { name: "EMOLE JULES", position: "Midfielder", price: 7 },
  { name: "NNONA KELVIN", position: "Forward", price: 15 },
  { name: "EGEMOLE HENRY", position: "Midfielder", price: 10 },
  { name: "UZOMA PERFECT", position: "Defender", price: 8 },
  { name: "IBEZUE CHINEDU", position: "Midfielder", price: 8 },
  // ... add remaining players from your full list here
];

// Fetch user data
async function loadUser() {
  const docRef = doc(db, "users", uid);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    userData = snap.data();
    myTeam = userData.team || [];
    remaining = 180 - myTeam.reduce((a,p)=>a+p.price,0);
    remainingEl.textContent = remaining.toFixed(1);
    renderPlayers();
    renderMyTeam();
  }
}

// Render all available players
function renderPlayers() {
  playerGrid.innerHTML = "";
  players.forEach(p=>{
    const card = document.createElement("
