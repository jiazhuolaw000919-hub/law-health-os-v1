const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZXZjZnlobmx0dHpkaXlsZnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjgzNTIsImV4cCI6MjA5NzQwNDM1Mn0.RNWddp1TuYwVAHZlWfdq4iGdgiqNU9DKgAi8pnC6ULs"


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
SAFE PROFILE ACCESS
========================= */
function getActiveProfile(){
try{
return JSON.parse(localStorage.getItem("activeProfile")) || {
id:"guest",
name:"Guest",
height:170,
weight:70
}
}catch(e){
return {id:"guest",name:"Guest",height:170,weight:70}
}
}

/* =========================
FOOD LOGS (SAFE READ v11.5)
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

if(!Array.isArray(data)) return []
return data
}

/* =========================
SAVE FOOD (SAFE WRITE v11.5)
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

if(!Array.isArray(data)) return []
return data
}

/* =========================
SAVE PROFILE (UPSERT SAFE)
========================= */
async function saveProfile(profile){

const payload = {
id: profile.id,
name: profile.name || "User",
height: Number(profile.height || 170),
weight: Number(profile.weight || 70),
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
SMART SYNC ENGINE v11.5
========================= */
async function syncProfiles(){

try{

let cloud = await getProfilesCloud()
let local = JSON.parse(localStorage.getItem("profiles")) || []

/* merge safely (no overwrite loss) */
if(cloud.length){

let merged = [...local]

cloud.forEach(c=>{
if(!merged.find(p=>p.id === c.id)){
merged.push(c)
}
})

localStorage.setItem("profiles", JSON.stringify(merged))
}

/* active profile sync */
let active = getActiveProfile()

if(active && cloud.length){
let match = cloud.find(p => p.id === active.id)

if(match){
localStorage.setItem("activeProfile", JSON.stringify(match))
}
}

}catch(e){
console.log("sync error:", e)
}
}

/* =========================
FUTURE EXTENSION HOOK
========================= */
async function syncFood(date){
return await getFoodLogs(date)
}

/* =========================
AUTO SYNC LOOP (SAFE)
========================= */
setInterval(()=>{
syncProfiles()
}, 10000)

/* =========================
INIT SYNC
========================= */
syncProfiles()
