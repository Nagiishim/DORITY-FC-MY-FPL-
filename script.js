const user = localStorage.getItem("currentUser");
if (!user) window.location.href = "index.html";

const userData = JSON.parse(localStorage.getItem(user));
const myTeam = userData.team || [];
const budget = 180;
let remaining = budget - myTeam.reduce((a, p) => a + p.price, 0);

document.getElementById("welcome").textContent = `Welcome, ${user}`;
document.getElementById("remaining").textContent = remaining.toFixed(1);

// logout
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});

const grid = document.getElementById("player-grid");
const myTeamGrid = document.getElementById("my-team");

function renderPlayers() {
  grid.innerHTML = "";
  players.forEach(p => {
    const card = document.createElement("div");
    card.className = "player-card";

    card.innerHTML = `
      <div class="card-inner ${p.injured ? 'injured' : ''}">
        <div class="card-front">
          ${p.name}
          ${p.injured ? '<span class="injury">⚕️</span>' : ''}
        </div>
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

function renderMyTeam() {
  myTeamGrid.innerHTML = "";
  myTeam.forEach(p => {
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

function addPlayer(player) {
  if (remaining < player.price) return alert("Not enough budget!");
  if (myTeam.find(p => p.name === player.name)) return alert("Already in team!");

  myTeam.push(player);
  remaining -= player.price;
  updateUser();
}

function removePlayer(player) {
  const idx = myTeam.findIndex(p => p.name === player.name);
  if (idx >= 0) {
    myTeam.splice(idx, 1);
    remaining += player.price;
    updateUser();
  }
}

function updateUser() {
  userData.team = myTeam;
  localStorage.setItem(user, JSON.stringify(userData));
  document.getElementById("remaining").textContent = remaining.toFixed(1);
  renderMyTeam();
}

renderPlayers();
renderMyTeam();
