import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your players
const players = [
  { name: "CHIBUIKE SUCCESS", position: "FW", price: 10 },
  { name: "OKOYE NELSON", position: "GK", price: 9.5 },
  { name: "NNADOZIE DESTINY", position: "GK", price: 10.5 },
  { name: "UKONU ANOINTING", position: "DEF", price: 15 },
  { name: "IBE EMMANUEL", position: "MID", price: 5 },
  { name: "NWANKWO OSITA", position: "MID", price: 10 },
  { name: "JAMES NKWUMAH", position: "DEF", price: 5 },
  { name: "OKONKWO GERARD", position: "DEF", price: 5 },
  { name: "NNAJI MICHAEL", position: "MID", price: 8 },
  { name: "IHEANACHO PRAISE", position: "FW", price: 5 },
  { name: "CHIAMAEZE OWN", position: "FW", price: 10 },
  { name: "EZEUGO ENU", position: "MID", price: 10 },
  { name: "MAC DONALD", position: "MID", price: 10 },
  { name: "OKWUDIRI SOLOMON", position: "DEF", price: 10 },
  { name: "EKE EMMANUEL", position: "MID", price: 7.5 },
  { name: "EMOLE JULES", position: "MID", price: 7 },
  { name: "NNONA KELVIN", position: "DEF", price: 15 },
  { name: "EGEMOLE HENRY", position: "DEF", price: 10 },
  { name: "UZOMA PERFECT", position: "MID", price: 8 },
  { name: "IBEZUE CHINEDU", position: "MID", price: 8 },
  { name: "ONUOHA OSCAR", position: "DEF", price: 8.5 },
  { name: "NNADOZIE DIVINE", position: "GK", price: 10 },
  { name: "OKOYE VICTOR", position: "GK", price: 11 },
  { name: "ILLONA PRINCEWILL", position: "MID", price: 11 },
  { name: "OPARA JOHNSON", position: "DEF", price: 12 },
  { name: "CHIBUIKE FAITHFUL", position: "MID", price: 8 },
  { name: "IFEJIAGWA IKECHUKWU", position: "MID", price: 20 },
  { name: "ENUKA RAMSEY", position: "MID", price: 4 },
  { name: "UDOH KENNETH", position: "MID", price: 10 },
  { name: "UWANDU DELIGHT", position: "MID", price: 4.5 },
  { name: "KINGSLEY IBEZUE", position: "DEF", price: 10 },
  { name: "NDUISI SUCCESS", position: "MID", price: 10 },
  { name: "EGBE BETHEL", position: "DEF", price: 12 },
  { name: "IGBONACHO SIXTUS", position: "MID", price: 14 },
  { name: "JOSEPH PROSPER", position: "MID", price: 10 },
  { name: "AUGUSTIN OKECHUKWU", position: "DEF", price: 10 },
  { name: "OKEZIE DAVID", position: "DEF", price: 10 },
  { name: "ONYEMA VICTOR", position: "MID", price: 10 },
  { name: "NWANKWO CHUKWUEMEKA", position: "MID", price: 13 },
  { name: "MICHAEL ANUDU", position: "MID", price: 10 },
  { name: "GOODLUCK AMAEFULE", position: "MID", price: 6 },
  { name: "CHUKWUMA JUSTIN", position: "MID", price: 13 },
  { name: "ONUOHA ISAAC", position: "DEF", price: 7 },
  { name: "NWACHUKWU MARTINS", position: "DEF", price: 11 },
  { name: "OFOMA RAPHAEL", position: "DEF", price: 11 },
  { name: "ONUOHA SAMUEL", position: "DEF", price: 13 },
  { name: "ERNEST KELVIN", position: "MID", price: 9 },
  { name: "UCHECHRIS PROSPER", position: "MID", price: 12 },
  { name: "IHEJI JOSEPH", position: "MID", price: 9 },
  { name: "ALABOGU ERNEST", position: "MID", price: 6 },
  { name: "MOSES PATRIC", position: "MID", price: 5 },
  { name: "DIKE OGBOGU", position: "MID", price: 18 },
  { name: "EJIKE NOBLE", position: "MID", price: 3 },
  { name: "DIM OBINNA", position: "MID", price: 3 },
  { name: "MIRACLE C", position: "MID", price: 3 },
  { name: "OKOYE RICHARD", position: "GK", price: 22 },
  { name: "UKA", position: "MID", price: 8 },
  { name: "EMMANUEL VICTOR", position: "MID", price: 6 },
  { name: "KALU EKE", position: "MID", price: 21 },
  { name: "NNAJI TEMPLE", position: "MID", price: 18 },
  { name: "OGUERI HENRY", position: "DEF", price: 9 },
  { name: "KALU JULES", position: "MID", price: 8 },
  { name: "ABAYOMI AYOMIDE", position: "MID", price: 25 },
  { name: "OKORONKWO AKACHUKWU", position: "MID", price: 25 }
];

let userData;
let myTeam = [];
const budget = 180;
let remaining = budget;

const welcomeEl = document.getElementById("welcome");
const remainingEl = document.getElementById("remaining");
const grid = document.getElementById("player-grid");
const myTeamGrid = document.getElementById("my-team");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;
  const userDocRef = doc(db, "users", uid);
  const snap = await getDoc(userDocRef);
  if (!snap.exists()) {
    await setDoc(userDocRef, { email: user.email, team: [], totalPoints: 0 });
    userData = { email: user.email, team: [], totalPoints: 0 };
  } else {
    userData = snap.data();
  }

  myTeam = userData.team || [];
  remaining = budget - myTeam.reduce((a, p) => a + p.price, 0);

  welcomeEl.textContent = `Welcome, ${user.email}`;
  remainingEl.textContent = remaining.toFixed(1);

  renderPlayers();
  renderMyTeam();
});

// Logout
document.getElementById("logout").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});

// Render available players
function renderPlayers() {
  grid.innerHTML = "";
  players.forEach(p => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${p.name} (${p.position})</div>
        <div class="card-back">
          <p>€${p.price}m</p>
          <button class="add">Add</button>
        </div>
      </div>
    `;
    card.querySelector(".add").addEventListener("click", () => addPlayer(p));
    grid.appendChild(card);
  });
}

// Render my team
function renderMyTeam() {
  myTeamGrid.innerHTML = "";
  myTeam.forEach(p => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${p.name} (${p.position})</div>
        <div class="card-back">
          <p>€${p.price}m</p>
          <button class="remove">Remove</button>
        </div>
      </div>
    `;
    card.querySelector(".remove").addEventListener("click", () => removePlayer(p));
    myTeamGrid.appendChild(card);
  });
}

// Add player
async function addPlayer(player) {
  if (remaining < player.price) return alert("Not enough budget!");
  if (myTeam.find(p => p.name === player.name)) return alert("Already in team!");

  myTeam.push(player);
  remaining -= player.price;
  remainingEl.textContent = remaining.toFixed(1);
  renderMyTeam();
  await saveTeam();
}

// Remove player
async function removePlayer(player) {
  const idx = myTeam.findIndex(p => p.name === player.name);
  if (idx >= 0) {
    myTeam.splice(idx, 1);
    remaining += player.price;
    remainingEl.textContent = remaining.toFixed(1);
    renderMyTeam();
    await saveTeam();
  }
}

// Save team to Firestore
async function saveTeam() {
  const uid = auth.currentUser.uid;
  await setDoc(doc(db, "users", uid), { ...userData, team: myTeam });
}
