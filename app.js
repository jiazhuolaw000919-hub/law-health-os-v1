/* =========================
GLOBAL PROFILE ENGINE v10.7
Backward Compatible Version
========================= */

const STORAGE_KEYS = {
profiles: “profiles”,
activeProfile: “activeProfile”
}

/* ––––– GET ––––– */
function getProfiles(){

try{
return JSON.parse(
localStorage.getItem(STORAGE_KEYS.profiles)
) || []
}catch(e){
return []
}

}

function getActiveProfile(){

try{
return JSON.parse(
localStorage.getItem(STORAGE_KEYS.activeProfile)
) || null
}catch(e){
return null
}

}

/* ––––– SET ––––– */
function setProfiles(profiles){

localStorage.setItem(
STORAGE_KEYS.profiles,
JSON.stringify(profiles)
)

}

function setActiveProfile(profile){

localStorage.setItem(
STORAGE_KEYS.activeProfile,
JSON.stringify(profile)
)

/* realtime update */
window.dispatchEvent(
new Event(“profileSyncUpdate”)
)

}

/* ––––– INIT ––––– */
function ensureProfileSystem(){

let profiles = getProfiles()

if(profiles.length === 0){

const defaultProfile = {
id:“guest”,
name:“Guest”,
height:170,
weight:70
}

profiles.push(defaultProfile)

setProfiles(profiles)
setActiveProfile(defaultProfile)

}

if(!getActiveProfile()){

setActiveProfile(profiles[0])

}

}

/* ––––– CREATE ––––– */
function createProfile(profile){

let profiles = getProfiles()

const newProfile = {
id: Date.now().toString(),
height:170,
weight:70,
…profile
}

profiles.push(newProfile)

setProfiles(profiles)

return newProfile

}

/* ––––– DELETE ––––– */
function deleteProfile(id){

let profiles =
getProfiles().filter(
p => p.id !== id
)

setProfiles(profiles)

let active = getActiveProfile()

if(active && active.id === id){

setActiveProfile(
profiles[0] || {
id:“guest”,
name:“Guest”,
height:170,
weight:70
}
)

}

}

/* ––––– SWITCH ––––– */
function switchProfile(id){

let profile =
getProfiles().find(
p => p.id === id
)

if(profile){
setActiveProfile(profile)
}

}

/* =========================
NEW PROFILE ENGINE
v12 Compatible
========================= */

const ProfileEngine = {

render(targetId){

const el =
document.getElementById(targetId)

if(!el) return

const p =
getActiveProfile()

if(!p){
el.innerText = “Guest”
return
}

if(targetId === “activeProfile”){

el.innerText =
“👤 Active: “ +
(p.name || “Guest”)

}else{

el.innerText =
p.name || “Guest”

}

},

getActiveProfile,
getProfiles,
switchProfile,
deleteProfile,
createProfile

}

/* =========================
GLOBAL EXPORT
========================= */

window.ProfileEngine =
ProfileEngine

window.getProfiles =
getProfiles

window.getActiveProfile =
getActiveProfile

window.setProfiles =
setProfiles

window.setActiveProfile =
setActiveProfile

window.switchProfile =
switchProfile

window.createProfile =
createProfile

window.deleteProfile =
deleteProfile

/* =========================
AUTO INIT
========================= */

ensureProfileSystem()
