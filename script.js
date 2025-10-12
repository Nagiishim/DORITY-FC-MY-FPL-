const playersContainer = document.getElementById("players-container");
const teamContainer = document.getElementById("team-container");
const budgetDisplay = document.getElementById("budget");
const saveBtn = document.getElementById("saveTeam");
const resetBtn = document.getElementById("resetTeam");

let myTeam = JSON.parse(localStorage.getItem("myTeam")) || [];
let budget = parseFloat(localStorage.getItem("budget")) || 180.0;

// 🧍 YOUR CUSTOM PLAYERS
const players = [
  { name: "CHIBUIKE SUCCESS", price: 10 },
  { name: "OKOYE NELSON", price: 9.5 },
  { name: "NNADOZIE DESTINY", price: 10.5 },
  { name: "UKONU ANOINTING", price: 15 },
  { name: "IBE EMMANUEL", price: 5 },
  { name: "NWANKWO OSITA", price: 10 },
  { name: "JAMES NKWUMAH", price: 5 },
  { name: "OKONKNWO GERARD", price: 5 },
  { name: "NNAJI MICHAEL", price: 8 },
  { name: "IHEANACHO PRAISE", price: 5 },
  { name: "CHIAMAEZE OWN", price: 10 },
  { name: "EZUEGO ENU", price: 10 },
  { name: "MAC DONALD", price: 10 },
  { name: "OKWUDIRI SOLOMON", price: 10 },
  { name: "EKE EMMANUEL", price: 7.5 },
  { name: "EMOLE JULES", price: 7 },
  { name: "NNONA KELVIN", price: 15 },
  { name: "EGEMOLE HENRY", price: 10 },
  { name: "UZOMA PERFECT", price: 8 },
  { name: "IBEZUE CHINEDU", price: 8 },
  { name: "ONUOHA OSCAR", price: 8.5 },
  { name: "NNADOZIE DIVINE", price: 10 },
  { name: "OKOYE VICTOR", price: 11 },
  { name: "ILLONA PRINCEWILL", price: 11 },
  { name: "OPARA JOHNSON", price: 12 },
  { name: "CHIBUIKE FAITHFUL", price: 8 },
  { name: "IFEJIAGWA IKECHUKWU", price: 20 },
  { name: "ENUKA RAMSEY", price: 4 },
  { name: "UDOH KENNETH", price: 10 },
  { name: "UWANDU DELIGHT", price: 4.5 },
  { name: "KINGSLEY IBEZUE", price: 10 },
  { name: "NDUISI SUCCESS", price: 10 },
  { name: "EGBE BETHEL", price: 12 },
  { name: "IGBONACHO SIXTUS", price: 14 },
  { name: "JOSEPH PROSPER", price: 10 },
  { name: "AUGUSTIN OKECHUKWU", price: 10 },
  { name: "OKEZIE DAVID", price: 10 },
  { name: "ONYEMA VICTOR", price: 10 },
  { name: "NWANKWO CHUKWUEMEKA", price: 13 },
  { name: "MICHAEL ANUDU", price: 10 },
  { name: "GOODLUCK AMAEFULE", price: 6 },
  { name: "CHUKWUMA JUSTIN", price: 13 },
  { name: "ONUOHA ISAAC", price: 7 },
  { name: "NWACHUKWU MARTINS", price: 11 },
  { name: "OFOMA RAPHAEL", price: 11 },
  { name: "ONUOHA SAMUEL", price: 13 },
  { name: "ERNEST KELVIN", price: 9 },
  { name: "UCHECHRIS PROSPER", price: 12 },
  { name: "IHEJI JOSEPH", price: 9 },
  { name: "ALABOGU ERNEST", price: 6 },
  { name: "MOSES PATRIC", price: 5 },
  { name: "DIKE OGBOGU", price: 18 },
  { name: "EJIKE NOBLE", price: 3 },
  { name: "DIM OBINNA", price: 3 },
  { name: "MIRACLE C", price: 3 },
  { name: "OKOYE RICHARD", price: 22 },
  { name: "UKA", price: 8 },
  { name: "EMMANUEL VICTOR", price: 6 },
  { name: "KALU EKE", price: 21 },
  { name: "NNAJI TEMPLE", price: 18 },
  { name: "OGUERI HENRY", price: 9 },
  { name: "KALU JULES", price: 8 },
  { name: "ABAYOMI AYOMIDE", price: 25 },
  { name: "OKORONKWO AKACHUKWU", price: 25 }
];

function renderPlayers() {
  playersContainer.innerHTML = "";
  players.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("player-card");
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>€${p.price.toFixed(1)}M</p>
      <button>Add</button>
    `;
    card.querySelector("button").addEventListener("click", () => addPlayer(p));
    playersContainer.appendChild(card);
  });
}

function addPlayer(player) {
  if (budget - player.price < 0) {
    alert("Not enough budget!");
    return;
  }
  if (myTeam.find(p => p.name === player.name)) {
    alert("Player already added!");
    return;
  }
  myTeam.push({ ...player, points: 0, captain: false });
  budget -= player.price;
  renderTeam();
}

function renderTeam() {
  teamContainer.innerHTML = "";
  myTeam.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("player-card");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>€${p.price}M</p>
      <p>Points: ${p.points}</p>
      <button>Select Captain</button>
      <button>Remove</button>
    `;

    const [capBtn, remBtn] = div.querySelectorAll("button");
    capBtn.addEventListener("click", () => setCaptain(p.name));
    remBtn.addEventListener("click", () => removePlayer(p.name));

    if (p.captain) {
      div.style.border = "2px solid gold";
      div.querySelector("h3").innerHTML += " 👑";
    }

    teamContainer.appendChild(div);
  });

  budgetDisplay.textContent = budget.toFixed(1);
  saveData();
}

function setCaptain(name) {
  myTeam.forEach(p => (p.captain = p.name === name));
  renderTeam();
}

function removePlayer(name) {
  const player = myTeam.find(p => p.name === name);
  myTeam = myTeam.filter(p => p.name !== name);
  budget += player.price;
  renderTeam();
}

function saveData() {
  localStorage.setItem("myTeam", JSON.stringify(myTeam));
  localStorage.setItem("budget", budget);
}

saveBtn.addEventListener("click", () => {
  alert("Team saved successfully!");
});

resetBtn.addEventListener("click", () => {
  if (confirm("Reset your team?")) {
    myTeam = [];
    budget = 180.0;
    renderTeam();
  }
});

renderPlayers();
renderTeam();

