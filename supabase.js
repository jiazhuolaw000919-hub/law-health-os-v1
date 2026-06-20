const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"
const SUPABASE_KEY = "YOUR_ANON_KEY"

/* =========================
SAFE FETCH CORE
========================= */
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

/* =========================
PROFILE CORE
========================= */
function getActiveProfile(){
try{
return JSON.parse(localStorage.getItem("activeProfile")) || {
id:"guest",
name:"Guest",
height:170,
weight:70,
weightHistory:[]
}
}catch(e){
return {id:"guest",name:"Guest",height:170,weight:70,weightHistory:[]}
}
}

/* =========================
FOOD LOG READ (SAFE)
========================= */
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

/* =========================
FOOD LOG WRITE (DEDUP READY)
========================= */
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
createdAt: new Date().toISOString() // 🔥 IMPORTANT for sync ordering
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

/* =========================
GET CLOUD PROFILES
========================= */
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

/* =========================
SAFE PROFILE UPSERT
========================= */
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

/* =========================
SMART SYNC ENGINE v11.5 (FIXED)
========================= */
async function syncProfiles(){

try{

let cloud = await getProfilesCloud()
let local = JSON.parse(localStorage.getItem("profiles")) || []

/* 1️⃣ MERGE (NO DUPLICATE IDS) */
let map = new Map()

;[...local, ...cloud].forEach(p=>{
if(p && p.id){
map.set(p.id, {
...map.get(p.id),
...p
})
}
})

let merged = Array.from(map.values())

localStorage.setItem("profiles", JSON.stringify(merged))

/* 2️⃣ ACTIVE PROFILE CONFLICT RESOLUTION */
let active = getActiveProfile()

if(active && cloud.length){

let server = cloud.find(p => p.id === active.id)

if(server){

/* choose latest update */
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

/* =========================
FOOD SYNC HOOK (future AI expansion)
========================= */
async function syncFood(date){
return await getFoodLogs(date)
}

/* =========================
AUTO SYNC LOOP
========================= */
setInterval(syncProfiles, 10000)

/* =========================
INIT SYNC
========================= */
syncProfiles()
