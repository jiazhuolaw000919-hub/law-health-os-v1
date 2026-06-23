 
/* =========================
   PROFILE SYSTEM v11.0 UPGRADE
   (SAFE + DASHBOARD COMPATIBLE)
========================= */

/* ================= SAFE CORE ================= */
function getProfiles(){
try{
return JSON.parse(localStorage.getItem("profiles")) || []
}catch(e){
return []
}
}

function getActiveProfile(){
try{
const raw = localStorage.getItem("activeProfile")

if(!raw || raw === "undefined" || raw === "null"){
return fallbackProfile()
}

const p = JSON.parse(raw)

if(!p || !p.id){
return fallbackProfile()
}

return normalizeProfile(p)

}catch(e){
return fallbackProfile()
}
}

/* ================= FALLBACK ================= */
function fallbackProfile(){
return {
id:"guest",
name:"Guest",
height:170,
weight:70,
learning:{
proteinUser:0,
carbUser:0,
junkUser:0,
totalFoods:0
}
}
}

/* ================= NORMALIZER (NEW v11) ================= */
function normalizeProfile(p){

return {
id: p.id || "guest",
name: p.name || "Guest",
height: Number(p.height || 170),
weight: Number(p.weight || 70),
bmi: p.bmi || null,

learning: {
proteinUser: p.learning?.proteinUser || 0,
carbUser: p.learning?.carbUser || 0,
junkUser: p.learning?.junkUser || 0,
totalFoods: p.learning?.totalFoods || 0
}
}
}

/* ================= SAVE ================= */
function saveProfiles(list){
try{
localStorage.setItem("profiles", JSON.stringify(list))
}catch(e){
console.log("saveProfiles error:", e)
}
}

/* ================= CREATE ================= */
function createProfile(data){

let profiles = getProfiles()

const newProfile = normalizeProfile({
id: Date.now().toString(),
name: data.name || "NoName",
height: data.height || 170,
weight: data.weight || 70,
bmi: data.bmi || null,
learning:{
proteinUser:0,
carbUser:0,
junkUser:0,
totalFoods:0
}
})

profiles.push(newProfile)

saveProfiles(profiles)

localStorage.setItem("activeProfile", JSON.stringify(newProfile))

broadcastProfileUpdate()
}

/* ================= SWITCH ================= */
function switchProfile(id){

const profile = getProfiles().find(p => p.id === id)

if(profile){
localStorage.setItem("activeProfile", JSON.stringify(normalizeProfile(profile)))
broadcastProfileUpdate()
}
}

/* ================= DELETE ================= */
function deleteProfile(id){

let profiles = getProfiles().filter(p => p.id !== id)

saveProfiles(profiles)

let active = getActiveProfile()

if(!profiles.length){

const fallback = fallbackProfile()
localStorage.setItem("activeProfile", JSON.stringify(fallback))

}else if(active.id === id){

localStorage.setItem(
"activeProfile",
JSON.stringify(normalizeProfile(profiles[0]))
)

}

broadcastProfileUpdate()
}

/* ================= BROADCAST (NEW v11) ================= */
function broadcastProfileUpdate(){

try{
window.dispatchEvent(new Event("profileSyncUpdate"))
}catch(e){}
}

/* ================= UI RENDER ================= */
function renderProfiles(){

const list = document.getElementById("profileList")
if(!list) return

list.innerHTML = ""

getProfiles().forEach(p => {

const div = document.createElement("div")
div.className = "card"

div.innerHTML = `
<b>${p.name}</b>
<p>ID: ${p.id}</p>
<p>📊 BMI: ${p.bmi || "-"}</p>

<button onclick="setActiveProfileById('${p.id}')">Select</button>
<button onclick="removeProfile('${p.id}')" style="background:red;color:white">Delete</button>
`

list.appendChild(div)

})
}

/* ================= UI ACTIONS ================= */
function setActiveProfileById(id){
switchProfile(id)
renderProfiles()
}

function removeProfile(id){
deleteProfile(id)
renderProfiles()
}

/* ================= CREATE UI ================= */
function createNewProfile(){

const name = document.getElementById("name")?.value?.trim()

if(!name){
alert("Enter name")
return
}

createProfile({ name })

renderProfiles()
}

/* ================= ENGINE COMPATIBILITY (IMPORTANT) ================= */

/* ⭐ THIS IS WHAT YOUR DASHBOARD NEEDS */
window.ProfileEngine = {
get(){
return getActiveProfile()
},

render(id){
const el = document.getElementById(id)
if(!el) return

const p = getActiveProfile()
el.innerText = "👤 Active: " + (p.name || "Guest")
},

subscribe(callback){
window.addEventListener("profileSyncUpdate", callback)
window.addEventListener("focus", callback)
}
}

/* ================= INIT ================= */
renderProfiles()
