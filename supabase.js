const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZXZjZnlobmx0dHpkaXlsZnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjgzNTIsImV4cCI6MjA5NzQwNDM1Mn0.RNWddp1TuYwVAHZlWfdq4iGdgiqNU9DKgAi8pnC6ULs"

//////////////////////////////
// SAFE FETCH CORE
//////////////////////////////
async function safeFetch(url, options){
try{
const res = await fetch(url, options)
if(!res.ok) throw new Error("Network error")
return await res.json()
}catch(e){
console.log("Supabase error:", e)
return null
}
}

//////////////////////////////
// PROFILE CORE
//////////////////////////////
function getActiveProfile(){
try{
return JSON.parse(localStorage.getItem("activeProfile")) || {
id:"guest",
name:"Guest",
height:170,
weight:70,
weightHistory:[],
updatedAt: new Date().toISOString()
}
}catch(e){
return {
id:"guest",
name:"Guest",
height:170,
weight:70,
weightHistory:[],
updatedAt: new Date().toISOString()
}
}
}

//////////////////////////////
// FOOD LOG READ
//////////////////////////////
async function getFoodLogs(date){

const profile = getActiveProfile()

const url =
`${SUPABASE_URL}/rest/v1/food_logs?date=eq.${date}&userId=eq.${profile.id}`

const data = await safeFetch(url,{
method:"GET",
headers:{
apikey: SUPABASE_KEY,
Authorization: "Bearer " + SUPABASE_KEY
}
})

return Array.isArray(data) ? data : []
}

//////////////////////////////
// FOOD LOG WRITE
//////////////////////////////
async function saveFood(data){

const profile = getActiveProfile()

const payload = {
userId: profile.id,
food: data.food || "unknown",
calories: Number(data.calories || 0),
protein: Number(data.protein || 0),
carbs: Number(data.carbs || 0),
fat: Number(data.fat || 0),
date: data.date,
createdAt: new Date().toISOString()
}

return await safeFetch(`${SUPABASE_URL}/rest/v1/food_logs`,{
method:"POST",
headers:{
apikey: SUPABASE_KEY,
Authorization: "Bearer " + SUPABASE_KEY,
"Content-Type":"application/json",
Prefer:"return=representation"
},
body: JSON.stringify(payload)
})
}

//////////////////////////////
// CLOUD PROFILES
//////////////////////////////
async function getProfilesCloud(){

const data = await safeFetch(`${SUPABASE_URL}/rest/v1/profiles`,{
method:"GET",
headers:{
apikey: SUPABASE_KEY,
Authorization: "Bearer " + SUPABASE_KEY
}
})

return Array.isArray(data) ? data : []
}

//////////////////////////////
// PROFILE UPSERT
//////////////////////////////
async function saveProfile(profile){

const payload = {
id: profile.id,
name: profile.name,
height: Number(profile.height || 170),
weight: Number(profile.weight || 70),
bmi: Number(profile.bmi || 0),
weightHistory: profile.weightHistory || [],
updatedAt: new Date().toISOString()
}

return await safeFetch(`${SUPABASE_URL}/rest/v1/profiles`,{
method:"POST",
headers:{
apikey: SUPABASE_KEY,
Authorization: "Bearer " + SUPABASE_KEY,
"Content-Type":"application/json",
Prefer:"resolution=merge-duplicates"
},
body: JSON.stringify(payload)
})
}

//////////////////////////////
// SMART SYNC ENGINE (MERGE SAFE)
//////////////////////////////
async function syncProfiles(){

try{

let cloud = await getProfilesCloud()
let local = JSON.parse(localStorage.getItem("profiles")) || []

// MERGE (dedupe by id)
let map = new Map()

;[...local, ...cloud].forEach(p=>{
if(p && p.id){
map.set(p.id,{
...map.get(p.id),
...p
})
}
})

let merged = Array.from(map.values())

localStorage.setItem("profiles", JSON.stringify(merged))

// ACTIVE PROFILE CONFLICT RESOLUTION
let active = getActiveProfile()

if(active && cloud.length){

let server = cloud.find(p => p.id === active.id)

if(server){

if(server.updatedAt && active.updatedAt){

if(new Date(server.updatedAt) > new Date(active.updatedAt)){
localStorage.setItem("activeProfile", JSON.stringify(server))
}

}else{
localStorage.setItem("activeProfile", JSON.stringify(server))
}

}

}

}catch(e){
console.log("sync error:", e)
}
}

//////////////////////////////
// REALTIME ENGINE (🔥 NEW CORE)
//////////////////////////////

let realtimeChannel = null

function initRealtime(){

if(typeof supabase === "undefined"){
console.log("Supabase client not loaded")
return
}

realtimeChannel = supabase
  .channel('health-realtime')

  .on('postgres_changes',{
    event:'*',
    schema:'public',
    table:'food_logs'
  },(payload)=>{

    console.log("🔥 FOOD REALTIME UPDATE:", payload)

    syncProfiles()

    window.dispatchEvent(new Event("foodSyncUpdate"))
  })

  .on('postgres_changes',{
    event:'*',
    schema:'public',
    table:'profiles'
  },(payload)=>{

    console.log("🔥 PROFILE REALTIME UPDATE:", payload)

    syncProfiles()

    window.dispatchEvent(new Event("profileSyncUpdate"))
  })

  .subscribe()

}

initRealtime()

//////////////////////////////
// SAFE SYNC WRAPPER (DEBOUNCE READY)
//////////////////////////////
let syncLock = false

async function safeSync(){
if(syncLock) return
syncLock = true

await syncProfiles()

syncLock = false
}

//////////////////////////////
// AUTO SYNC LOOP (fallback)
//////////////////////////////
setInterval(safeSync, 10000)

//////////////////////////////
// OFFLINE-FIRST SUPPORT
//////////////////////////////
window.addEventListener("online", ()=>{
safeSync()
})

window.addEventListener("focus", ()=>{
safeSync()
})

//////////////////////////////
// INIT
//////////////////////////////
syncProfiles()
