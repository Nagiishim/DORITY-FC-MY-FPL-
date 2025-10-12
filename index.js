<!-- team.html -->
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js"></script>
<script src="player.js"></script>
<script>
/* ---------- FIREBASE CONFIG ---------- */
const firebaseConfig = {
  apiKey: "AIzaSyCFknCEG0zQjTVpPCs49zm_ERzalXC63Pg",
  authDomain: "dority-fc-site.firebaseapp.com",
  projectId: "dority-fc-site",
  storageBucket: "dority-fc-site.firebasestorage.app",
  messagingSenderId: "388572626223",
  appId: "1:388572626223:web:825dcd942c3056fd3df5da",
  measurementId: "G-FG54ZJ5BRJ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

/* ---------- UI Setup ---------- */
const grid = document.getElementById("player-grid");
const myTeamGrid = document.getElementById("my-team");
const remainingEl = document.getElementById("remaining");
const welcomeEl = document.getElementById("welcome");

const budget = 180;
let myTeam = [];
let remaining = budget;

/* ---------- Auth check ---------- */
auth.onAuthStateChanged(async (user) => {
  if (!user) return (window.location.href = "index.html");

  welcomeEl.textContent = `Welcome, ${user.email}`;
  const ref = db.collection("users").doc(user.uid);
  const snap = await ref.get();

  if (snap.exists) {
    myTeam = snap.data().team || [];
  } else {
    await ref.set({ email: user.email, team: [], totalPoints: 0 });
  }

  remaining = budget - myTeam.reduce((a, p) => a + p.price, 0);
  remainingEl.textContent = remaining.toFixed(1);
  renderPlayers();
  renderMyTeam();
});

/* ---------- Logout ---------- */
document.getElementById("logout").addEventListener("click", async () => {
  await auth.signOut();
  window.location.href = "index.html";
});

/* ---------- Render players ---------- */
function renderPlayers() {
  grid.innerHTML = "";
  players.forEach((p) => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${p.name}</div>
        <div class="card-back">
          <p>${p.position}</p>
          <p>€${p.price}m</p>
          <button class="add">Add</button>
        </div>
      </div>
    `;
    card.querySelector(".add").addEventListener("click", () => addPlayer(p));
    grid.appendChild(card);
  });
}

/* ---------- Render My Team ---------- */
function renderMyTeam() {
  myTeamGrid.innerHTML = "";
  myTeam.forEach((p) => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${p.name}</div>
        <div class="card-back">
          <p>${p.position}</p>
          <p>€${p.price}m</p>
          <button class="remove">Remove</button>
        </div>
      </div>
    `;
    card.querySelector(".remove").addEventListener("click", () => removePlayer(p));
    myTeamGrid.appendChild(card);
  });
}

/* ---------- Add / Remove Players ---------- */
async function addPlayer(player) {
  if (remaining < player.price) return alert("Not enough budget!");
  if (myTeam.find((p) => p.name === player.name)) return alert("Already in team!");

  myTeam.push(player);
  remaining -= player.price;
  await saveTeam();
}

async function removePlayer(player) {
  const idx = myTeam.findIndex((p) => p.name === player.name);
  if (idx >= 0) {
    myTeam.splice(idx, 1);
    remaining += player.price;
    await saveTeam();
  }
}

/* ---------- Save to Firebase ---------- */
async function saveTeam() {
  const user = auth.currentUser;
  if (!user) return;

  await db.collection("users").doc(user.uid).update({ team: myTeam });
  remainingEl.textContent = remaining.toFixed(1);
  renderMyTeam();
}
</script>
