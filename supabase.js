const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZXZjZnlobmx0dHpkaXlsZnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjgzNTIsImV4cCI6MjA5NzQwNDM1Mn0.RNWddp1TuYwVAHZlWfdq4iGdgiqNU9DKgAi8pnC6ULs"

/* =========================
SAFE FETCH
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
GET PROFILE SAFE
========================= */
function getActiveProfile(){
return JSON.parse(localStorage.getItem("activeProfile")) || {
id:"guest",
name:"Guest"
}
}

/* =========================
FOOD LOGS (READ SAFE v11)
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
SAVE FOOD (v11 SAFE)
========================= */
async function saveFood(data){

const profile = getActiveProfile()

const payload = {
userId: profile.id,
food: data.food,
calories: data.calories,
protein: data.protein || 0,
carbs: data.carbs || 0,
fat: data.fat || 0,
date: data.date
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
PROFILE CLOUD SYNC (READ)
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
SAVE PROFILE (UPSERT SAFE v11)
========================= */
async function saveProfile(profile){

const payload = {
id: profile.id,
name: profile.name,
height: profile.height || 170,
weight: profile.weight || 70,
bmi: profile.bmi || 0,
weightHistory: profile.weightHistory || []
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
SMART SYNC ENGINE v11 (BIDIRECTIONAL SAFE)
========================= */
async function syncProfiles(){

try{

let cloud = await getProfilesCloud()
let local = JSON.parse(localStorage.getItem("profiles")) || []

// 1️⃣ merge strategy (avoid overwrite loss)
if(cloud.length && local.length){

let merged = [...local]

cloud.forEach(cp=>{
let exist = merged.find(p=>p.id === cp.id)

if(!exist){
merged.push(cp)
}
})

localStorage.setItem("profiles", JSON.stringify(merged))

}

/* 2️⃣ update active profile safely */
let active = getActiveProfile()

if(active && cloud.length){

let match = cloud.find(p => p.id === active.id)

if(match){
localStorage.setItem("activeProfile", JSON.stringify(match))
}

}

}catch(e){
console.log("sync error", e)
}

}

/* =========================
FOOD SYNC HELPERS (future AI)
========================= */
async function syncFood(date){

// placeholder for future bi-directional sync
return await getFoodLogs(date)

}

/* =========================
AUTO SYNC LOOP (v11)
========================= */
setInterval(()=>{
syncProfiles()
}, 10000)

/* =========================
INIT SYNC
========================= */
syncProfiles()
