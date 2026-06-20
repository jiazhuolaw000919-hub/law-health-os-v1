const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

// 🔥 DELETE GUARD（防复活核心）
const DELETE_GUARD_KEY = "deleted_items_v1"

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
// 🧠 DELETE GUARD (防“删除复活”核心机制)
//////////////////////////////
function markDeleted(id){
let list = JSON.parse(localStorage.getItem(DELETE_GUARD_KEY)) || []
if(!list.includes(id)){
list.push(id)
localStorage.setItem(DELETE_GUARD_KEY, JSON.stringify(list))
}
}

function isDeleted(id){
let list = JSON.parse(localStorage.getItem(DELETE_GUARD_KEY)) || []
return list.includes(id)
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

let safe = Array.isArray(data) ? data : []

// 🔥 FILTER deleted items (防复活关键)
safe = safe.filter(d => !isDeleted(d.id))

return safe
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
// ❌ SAFE DELETE FOOD (ANTI-REVIVE CORE)
//////////////////////////////
async function deleteFood(foodId){

const profile = getActiveProfile()

if(!foodId){
console.log("deleteFood blocked: missing id")
return null
}

/* 🔒 STEP 1: mark as deleted locally (CRITICAL) */
markDeleted(foodId)

/* 🔒 STEP 2: server delete */
const url =
`${SUPABASE_URL}/rest/v1/food_logs?id=eq.${foodId}&userId=eq.${profile.id}`

const res = await safeFetch(url,{
method:"DELETE",
headers:{
apikey: SUPABASE_KEY,
Authorization: "Bearer " + SUPABASE_KEY
}
})

/* 🔒 STEP 3: force sync clean */
setTimeout(syncProfiles, 300)

return res
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
// SMART SYNC ENGINE
//////////////////////////////
async function syncProfiles(){

try{

let cloud = await getProfilesCloud()
let local = JSON.parse(localStorage.getItem("profiles")) || []

// 🔥 REMOVE deleted items before merge
cloud = cloud.filter(p => !isDeleted(p.id))
local = local.filter(p => !isDeleted(p.id))

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
// REALTIME ENGINE v11.6
//////////////////////////////

let realtimeChannel = null

function initRealtime(){

if(typeof supabase === "undefined"){
console.log("Supabase client missing")
return
}

realtimeChannel = supabase
  .channel('health-realtime')

  .on('postgres_changes',{
    event:'*',
    schema:'public',
    table:'food_logs'
  },(payload)=>{

    console.log("🔥 FOOD UPDATE:", payload)

    syncProfiles()
    window.dispatchEvent(new Event("foodSyncUpdate"))
  })

  .on('postgres_changes',{
    event:'*',
    schema:'public',
    table:'profiles'
  },(payload)=>{

    console.log("🔥 PROFILE UPDATE:", payload)

    syncProfiles()
    window.dispatchEvent(new Event("profileSyncUpdate"))
  })

  .subscribe()

}

initRealtime()

//////////////////////////////
// SAFE SYNC WRAPPER
//////////////////////////////
let syncLock = false

async function safeSync(){
if(syncLock) return
syncLock = true

await syncProfiles()

syncLock = false
}

//////////////////////////////
// AUTO SYNC LOOP
//////////////////////////////
setInterval(safeSync, 10000)

//////////////////////////////
// ONLINE / FOCUS SYNC
//////////////////////////////
window.addEventListener("online", safeSync)
window.addEventListener("focus", safeSync)

//////////////////////////////
// INIT
//////////////////////////////
syncProfiles()
