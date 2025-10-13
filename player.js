import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let currentUser;
let userData;
let myTeam = [];
const budget = 180;
let remaining = budget;

const welcomeEl = document.getElementById("welcome");
const remainingEl = document.getElementById("remaining");
const myTeamGrid = document.getElementById("my-team");
const playerGrid = document.getElementById("player-grid");
const logoutBtn = document.getElementById("logout");

const players = [
  {name:"CHIBUIKE SUCCESS", position:"FWD", price:10},
  {name:"OKOYE NELSON", position:"GK", price:9.5},
  {name:"NNADOZIE DESTINY", position:"GK", price:10.5},
  {name:"UKONU ANOINTING", position:"DEF", price:15},
  {name:"IBE EMMANUEL", position:"MID", price:5},
  {name:"NWANKWO OSITA", position:"MID", price:10},
  {name:"JAMES NKWUMAH", position:"DEF", price:5},
  {name:"OKONKWO GERARD", position:"DEF", price:5},
  {name:"NNAJI MICHAEL", position:"MID", price:8},
  {name:"IHEANACHO PRAISE", position:"FWD", price:5},
  {name:"CHIAMAEZE OWN", position:"FWD", price:10},
  {name:"EZUEGO ENU", position:"MID", price:10},
  {name:"MAC DONALD", position:"MID", price:10},
  {name:"OKWUDIRI SOLOMON", position:"DEF", price:10},
  {name:"EKE EMMANUEL", position:"MID", price:7.5},
  {name:"EMOLE JULES", position:"MID", price:7},
  {name:"NNONA KELVIN", position:"DEF", price:15},
  {name:"EGEMOLE HENRY", position:"MID", price:10},
  {name:"UZOMA PERFECT", position:"MID", price:8},
  {name:"IBEZUE CHINEDU", position:"DEF", price:8},
  {name:"ONUOHA OSCAR", position:"DEF", price:8.5},
  {name:"NNADOZIE DIVINE", position:"GK", price:10},
  {name:"OKOYE VICTOR", position:"GK", price:11},
  {name:"ILLONA PRINCEWILL", position:"MID", price:11},
  {name:"OPARA JOHNSON", position:"DEF", price:12},
  {name:"CHIBUIKE FAITHFUL", position:"MID", price:8},
  {name:"IFEJIAGWA IKECHUKWU", position:"MID", price:20},
  {name:"ENUKA RAMSEY", position:"MID", price:4},
  {name:"UDOH KENNETH", position:"MID", price:10},
  {name:"UWANDU DELIGHT", position:"MID", price:4.5},
  {name:"KINGSLEY IBEZUE", position:"DEF", price:10},
  {name:"NDUISI SUCCESS", position:"MID", price:10},
  {name:"EGBE BETHEL", position:"DEF", price:12},
  {name:"IGBONACHO SIXTUS", position:"MID", price:14},
  {name:"JOSEPH PROSPER", position:"MID", price:10},
  {name:"AUGUSTIN OKECHUKWU", position:"DEF", price:10},
  {name:"OKEZIE DAVID", position:"DEF", price:10},
  {name:"ONYEMA VICTOR", position:"MID", price:10},
  {name:"NWANKWO CHUKWUEMEKA", position:"MID", price:13},
  {name:"MICHAEL ANUDU", position:"MID", price:10},
  {name:"GOODLUCK AMAEFULE", position:"MID", price:6},
  {name:"CHUKWUMA JUSTIN", position:"DEF", price:13},
  {name:"ONUOHA ISAAC", position:"DEF", price:7},
  {name:"NWACHUKWU MARTINS", position:"MID", price:11},
  {name:"OFOMA RAPHAEL", position:"MID", price:11},
  {name:"ONUOHA SAMUEL", position:"DEF", price:13},
  {name:"ERNEST KELVIN", position:"MID", price:9},
  {name:"UCHECHRIS PROSPER", position:"MID", price:12},
  {name:"IHEJI JOSEPH", position:"MID", price:9},
  {name:"ALABOGU ERNEST", position:"DEF", price:6},
  {name:"MOSES PATRIC", position:"MID", price:5},
  {name:"DIKE OGBOGU", position:"MID", price:18},
  {name:"EJIKE NOBLE", position:"MID", price:3},
  {name:"DIM OBINNA", position:"MID", price:3},
  {name:"MIRACLE C", position:"MID", price:3},
  {name:"OKOYE RICHARD", position:"GK", price:22},
  {name:"UKA EMMANUEL", position:"MID", price:8},
  {name:"KALU EKE", position:"MID", price:21},
  {name:"NNAJI TEMPLE", position:"MID", price:18},
  {name:"OGUERI HENRY", position:"MID", price:9},
  {name:"KALU JULES", position:"MID", price:8},
  {name:"ABAYOMI AYOMIDE", position:"MID", price:25},
  {name:"OKORONKWO AKACHUKWU", position:"MID", price:25}
];

// Wait for Firebase auth
onAuthStateChanged(auth, async user=>{
  if(!user) return
