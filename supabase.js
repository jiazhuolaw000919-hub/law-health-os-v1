const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZXZjZnlobmx0dHpkaXlsZnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjgzNTIsImV4cCI6MjA5NzQwNDM1Mn0.RNWddp1TuYwVAHZlWfdq4iGdgiqNU9DKgAi8pnC6ULs"

/* =========================
SAFE FETCH WRAPPER
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
FOOD LOGS (READ)
========================= */
async function getFoodLogs(date){

const profile = JSON.parse(localStorage.getItem("activeProfile")) || {id:"guest"}

const url = `${SUPABASE_URL}/rest/v1/food_logs?date=eq.${date}&userId=eq.${profile.id}`

return safeFetch(url,{
method:"GET",
headers:{
apikey: SUPABASE_KEY,
Authorization: "Bearer " + SUPABASE_KEY
}
}) || []

}

/* =========================
SAVE FOOD LOG (NEW v10.8)
========================= */
async function saveFood(data){

const profile = JSON.parse(localStorage.getItem("activeProfile")) || {id:"guest"}

const payload = {
userId: profile.id,
food: data.food,
calories: data.calories,
protein: data.protein || 0,
carbs: data.carbs || 0,
fat: data.fat || 0,
date: data.date
}

return safeFetch(`${SUPABASE_URL}/rest/v1/food_logs`,{
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
PROFILE SYNC (READ)
========================= */
async function getProfilesCloud(){

return safeFetch(`${SUPABASE_URL}/rest/v1/profiles`,{
method:"GET",
headers:{
apikey: SUPABASE_KEY,
Authorization: "Bearer " + SUPABASE_KEY
}
}) || []

}

/* =========================
SAVE / UPDATE PROFILE (UPSERT)
========================= */
async function saveProfile(profile){

const payload = {
id: profile.id,
name: profile.name,
height: profile.height,
weight: profile.weight,
weightHistory: profile.weightHistory || [],
bmi: profile.bmi
}

return safeFetch(`${SUPABASE_URL}/rest/v1/profiles`,{
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
SYNC LOCAL ↔ CLOUD (CORE)
========================= */
async function syncProfiles(){

try{

let cloud = await getProfilesCloud()
let local = JSON.parse(localStorage.getItem("profiles")) || []

if(cloud && cloud.length){

localStorage.setItem("profiles", JSON.stringify(cloud))

let active = JSON.parse(localStorage.getItem("activeProfile"))

if(active){
let match = cloud.find(p => p.id === active.id)
if(match){
localStorage.setItem("activeProfile", JSON.stringify(match))
}
}

}

}catch(e){
console.log("sync error", e)
}

}

/* =========================
AUTO SYNC LOOP (multi-device)
========================= */
setInterval(()=>{

syncProfiles()

}, 10000) // every 10 sec

/* =========================
INIT SYNC ON LOAD
========================= */
syncProfiles()
