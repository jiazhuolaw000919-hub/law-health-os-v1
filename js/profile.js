/* =========================
   PROFILE SYSTEM v10.7 FIXED
========================= */

/* ================= SAFE CORE ================= */
function getProfiles(){
return JSON.parse(localStorage.getItem("profiles")) || []
}

function getActiveProfile(){
return JSON.parse(localStorage.getItem("activeProfile")) || {
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

function saveProfiles(list){
localStorage.setItem("profiles", JSON.stringify(list))
}

/* ================= CREATE ================= */
function createProfile(data){

let profiles = getProfiles()

const newProfile = {
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
}

profiles.push(newProfile)

saveProfiles(profiles)
localStorage.setItem("activeProfile", JSON.stringify(newProfile))
}

/* ================= SWITCH ================= */
function switchProfile(id){

const profile = getProfiles().find(p => p.id === id)

if(profile){
localStorage.setItem("activeProfile", JSON.stringify(profile))
}
}

/* ================= DELETE ================= */
function deleteProfile(id){

let profiles = getProfiles().filter(p => p.id !== id)

saveProfiles(profiles)

let active = getActiveProfile()

if(!profiles.length){

const fallback = {
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

localStorage.setItem("activeProfile", JSON.stringify(fallback))

}else if(active.id === id){

localStorage.setItem("activeProfile", JSON.stringify(profiles[0]))

}
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

/* ================= INIT ================= */
renderProfiles()
