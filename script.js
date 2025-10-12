// DOM
const playersContainer = document.getElementById("players-container");
const budgetDisplay = document.getElementById("budget");
const flashcardsGrid = document.getElementById("flashcards-grid");
const totalPointsEl = document.getElementById("total-points");

const poolSection = document.getElementById("pool-section");
const teamSection = document.getElementById("team-section");
const showPoolBtn = document.getElementById("show-pool");
const showTeamBtn = document.getElementById("show-team");
const saveBtn = document.getElementById("saveTeam");
const resetBtn = document.getElementById("resetTeam");
const autoFillBtn = document.getElementById("autoFill");

// state
let budget = parseFloat(localStorage.getItem("budget")) || 180.0;
let myTeam = JSON.parse(localStorage.getItem("myTeam")) || [];
let players = JSON.parse(localStorage.getItem("playersPool")) || [
  { name: "CHIBUIKE SUCCESS", price: 10, position: "MID" },
  { name: "OKOYE NELSON", price: 9.5, position: "FWD" },
  { name: "NNADOZIE DESTINY", price: 10.5, position: "GK" },
  { name: "UKONU ANOINTING", price: 15, position: "DEF" },
  { name: "IBE EMMANUEL", price: 5, position: "MID" },
  { name: "NWANKWO OSITA", price: 10, position: "DEF" },
  { name: "JAMES NKWUMAH", price: 5, position: "MID" },
  { name: "OKONKNWO GERARD", price: 5, position: "DEF" },
  { name: "NNAJI MICHAEL", price: 8, position: "MID" },
  { name: "IHEANACHO PRAISE", price: 5, position: "FWD" },
  { name: "CHIAMAEZE OWN", price: 10, position: "FWD" },
  { name: "EZUEGO ENU", price: 10, position: "DEF" },
  { name: "MAC DONALD", price: 10, position: "MID" },
  { name: "OKWUDIRI SOLOMON", price: 10, position: "DEF" },
  { name: "EKE EMMANUEL", price: 7.5, position: "MID" },
  { name: "EMOLE JULES", price: 7, position: "MID" },
  { name: "NNONA KELVIN", price: 15, position: "DEF" },
  { name: "EGEMOLE HENRY", price: 10, position: "DEF" },
  { name: "UZOMA PERFECT", price: 8, position: "MID" },
  { name: "IBEZUE CHINEDU", price: 8, position: "DEF" },
  { name: "ONUOHA OSCAR", price: 8.5, position: "DEF" },
  { name: "NNADOZIE DIVINE", price: 10, position: "GK" },
  { name: "OKOYE VICTOR", price: 11, position: "MID" },
  { name: "ILLONA PRINCEWILL", price: 11, position: "MID" },
  { name: "OPARA JOHNSON", price: 12, position: "DEF" },
  { name: "CHIBUIKE FAITHFUL", price: 8, position: "MID" },
  { name: "IFEJIAGWA IKECHUKWU", price: 20, position: "FWD" },
  { name: "ENUKA RAMSEY", price: 4, position: "MID" },
  { name: "UDOH KENNETH", price: 10, position: "DEF" },
  { name: "UWANDU DELIGHT", price: 4.5, position: "MID" },
  { name: "KINGSLEY IBEZUE", price: 10, position: "DEF" },
  { name: "NDUISI SUCCESS", price: 10, position: "MID" },
  { name: "EGBE BETHEL", price: 12, position: "MID" },
  { name: "IGBONACHO SIXTUS", price: 14, position: "FWD" },
  { name: "JOSEPH PROSPER", price: 10, position: "MID" },
  { name: "AUGUSTIN OKECHUKWU", price: 10, position: "DEF" },
  { name: "OKEZIE DAVID", price: 10, position: "MID" },
  { name: "ONYEMA VICTOR", price: 10, position: "DEF" },
  { name: "NWANKWO CHUKWUEMEKA", price: 13, position: "MID" },
  { name: "MICHAEL ANUDU", price: 10, position: "MID" },
  { name: "GOODLUCK AMAEFULE", price: 6, position: "DEF" },
  { name: "CHUKWUMA JUSTIN", price: 13, position: "FWD" },
  { name: "ONUOHA ISAAC", price: 7, position: "DEF" },
  { name: "NWACHUKWU MARTINS", price: 11, position: "MID" },
  { name: "OFOMA RAPHAEL", price: 11, position: "MID" },
  { name: "ONUOHA SAMUEL", price: 13, position: "DEF" },
  { name: "ERNEST KELVIN", price: 9, position: "MID" },
  { name: "UCHECHRIS PROSPER", price: 12, position: "MID" },
  { name: "IHEJI JOSEPH", price: 9, position: "DEF" },
  { name: "ALABOGU ERNEST", price: 6, position: "DEF" },
  { name: "MOSES PATRIC", price: 5, position: "MID" },
  { name: "DIKE OGBOGU", price: 18, position: "MID" },
  { name: "EJIKE NOBLE", price: 3, position: "MID" },
  { name: "DIM OBINNA", price: 3, position: "MID" },
  { name: "MIRACLE C", price: 3, position: "MID" },
  { name: "OKOYE RICHARD", price: 22, position: "FWD" },
  { name: "UKA", price: 8, position: "DEF" },
  { name: "EMMANUEL VICTOR", price: 6, position: "MID" },
  { name: "KALU EKE", price: 21, position: "FWD" },
  { name: "NNAJI TEMPLE", price: 18, position: "MID" },
  { name: "OGUERI HENRY", price: 9, position: "DEF" },
  { name: "KALU JULES", price: 8, position: "MID" },
  { name: "ABAYOMI AYOMIDE", price: 25, position: "FWD" },
  { name: "OKORONKWO AKACHUKWU", price: 25, position: "FWD" }
];

const POS = ["GK","DEF","MID","FWD"];
const MAX_PLAYERS = 15;

// UI toggles
showPoolBtn.addEventListener("click", () => { poolSection.classList.remove("hidden"); teamSection.classList.add("hidden"); showPoolBtn.classList.add("active"); showTeamBtn.classList.remove("active"); });
showTeamBtn.addEventListener("click", () => { poolSection.classList.add("hidden"); teamSection.classList.remove("hidden"); showTeamBtn.classList.add("active"); showPoolBtn.classList.remove("active"); });

// render pool
function renderPool(){
  playersContainer.innerHTML = "";
  players.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.innerHTML = `
      <h4>${p.name}</h4>
      <div class="small">€${p.price.toFixed(1)}M • Position:
        <select data-idx="${idx}" class="pos-select">
          ${POS.map(pos => `<option value="${pos}" ${pos===p.position?'selected':''}>${pos}</option>`).join("")}
        </select>
      </div>
      <div class="controls">
        <input type="number" min="0" step="1" placeholder="Points" data-pts="${idx}" style="width:80px"/>
        <button class="btn-add" data-idx="${idx}">Add</button>
      </div>
    `;
    playersContainer.appendChild(card);
  });

  // attach listeners for selects and add buttons
  document.querySelectorAll(".pos-select").forEach(s => s.addEventListener("change", (e)=>{
    const i = +e.target.dataset.idx;
    players[i].position = e.target.value;
    persistPool();
  }));
  document.querySelectorAll(".btn-add").forEach(b => b.addEventListener("click", (e)=>{
    const i = +e.target.dataset.idx;
    addPlayerToTeam(players[i]);
  }));
}

// add to team
function addPlayerToTeam(player){
  if (myTeam.length >= MAX_PLAYERS){
    alert(`You can pick up to ${MAX_PLAYERS} players.`);
    return;
  }
  if (budget - player.price < 0){
    alert("Not enough budget!");
    return;
  }
  if (myTeam.find(x => x.name === player.name)){
    alert("Player already in your team!");
    return;
  }
  // default points 0, captain false
  myTeam.push({ ...player, points: 0, captain: false });
  budget = +(budget - player.price);
  renderTeam();
  persistAll();
}

// render team as flashcards grid
function renderTeam(){
  flashcardsGrid.innerHTML = "";

  myTeam.forEach((p, idx) => {
    const wrapper = document.createElement("div");
    wrapper.className = "card-3d";

    const inner = document.createElement("div");
    inner.className = "card-inner";
    if (p.captain) inner.classList.add("is-flipped"); // optional: show rotated state if wanted

    // front
    const front = document.createElement("div");
    front.className = "card-face card-front";
    front.innerHTML = `
      <div>
        <div class="name">${p.name}</div>
        <div class="sub">${p.position}</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div style="font-weight:800">€${p.price.toFixed(1)}M</div>
        <div style="font-size:0.95rem;color:rgba(255,255,255,0.8)">Tap to flip</div>
      </div>
    `;

    // back
    const back = document.createElement("div");
    back.className = "card-face card-back";
    back.innerHTML = `
      <div>
        <div class="meta">€${p.price.toFixed(1)}M</div>
        <div class="meta"><small>Position: ${p.position}</small></div>
        <div class="meta"><small>Points: <input class="pt-input" data-idx="${idx}" type="number" value="${p.points}" style="width:70px" /></small></div>
      </div>
      <div class="back-controls">
        <button class="cap-btn" data-idx="${idx}" title="Make Captain">Set Captain</button>
        <button class="remove-btn" data-idx="${idx}" title="Remove">Remove</button>
      </div>
    `;

    inner.appendChild(front);
    inner.appendChild(back);
    wrapper.appendChild(inner);
    flashcardsGrid.appendChild(wrapper);

    // flip handler (click anywhere on the card)
    inner.addEventListener("click", (e) => {
      // prevent flipping when clicking input / buttons on back
      if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON" || e.target.closest('button')) return;
      inner.classList.toggle("is-flipped");
    });

    // points input listener (on back)
    back.querySelector(".pt-input").addEventListener("input", (ev) => {
      const val = parseFloat(ev.target.value) || 0;
      myTeam[idx].points = val;
      calculateTotalPoints();
      persistAll();
    });

    // set captain
    back.querySelector(".cap-btn").addEventListener("click", (ev) => {
      ev.stopPropagation();
      setCaptain(idx);
    });

    // remove player
    back.querySelector(".remove-btn").addEventListener("click", (ev) => {
      ev.stopPropagation();
      removePlayer(idx);
    });

    // highlight captain visually
    if (p.captain) {
      inner.classList.add("is-flipped"); // keep flipped so captain stands out
      wrapper.querySelector(".card-front")?.classList.add("captain");
      wrapper.querySelector(".card-back")?.classList.add("captain");
    }
  });

  budgetDisplay.textContent = budget.toFixed(1);
  calculateTotalPoints();
  persistAll();
}

function removePlayer(idx){
  const player = myTeam[idx];
  if (!player) return;
  budget = +(budget + player.price);
  myTeam.splice(idx,1);
  renderTeam();
  persistAll();
}

function setCaptain(idx){
  myTeam = myTeam.map((p,i) => ({ ...p, captain: i===idx }));
  renderTeam();
  persistAll();
}

function calculateTotalPoints(){
  let total = 0;
  myTeam.forEach(p => {
    let pts = Number(p.points) || 0;
    if (p.captain) pts = pts * 2;
    total += pts;
  });
  totalPointsEl.textContent = total;
}

// save/load
function persistAll(){
  localStorage.setItem("myTeam", JSON.stringify(myTeam));
  localStorage.setItem("budget", budget);
  localStorage.setItem("playersPool", JSON.stringify(players));
}
function persistPool(){ localStorage.setItem("playersPool", JSON.stringify(players)); }

// reset
resetBtn.addEventListener("click", () => {
  if (!confirm("Reset your team and budget?")) return;
  myTeam = [];
  budget = 180.0;
  renderTeam();
  persistAll();
});

// save button
saveBtn.addEventListener("click", () => {
  persistAll();
  alert("Team saved locally ✅");
});

// autofill (quick test) - fills remaining slots randomly from pool (respects budget)
autoFillBtn.addEventListener("click", ()=>{
  const remain = MAX_PLAYERS - myTeam.length;
  if (remain <= 0) { alert("Team is full"); return; }
  const available = players.filter(p => !myTeam.find(x => x.name === p.name));
  for (let i=available.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [available[i],available[j]] = [available[j],available[i]];
  }
  for (let i=0;i<available.length && myTeam.length<MAX_PLAYERS;i++){
    if (budget - available[i].price >= 0){
      myTeam.push({ ...available[i], points:0, captain:false });
      budget = +(budget - available[i].price);
    }
  }
  renderTeam();
  persistAll();
});

// initial render
renderPool();
renderTeam();
