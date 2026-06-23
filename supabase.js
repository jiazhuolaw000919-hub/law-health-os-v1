const SUPABASE_URL = “https://jqevcfyhnlttzdiylfrh.supabase.co”
const SUPABASE_KEY = “sb_publishable_GMM5PgeRzudbeh4aHK-1pw_lQ6TQnVe”

/* =========================
LOAD SUPABASE CDN
========================= */

if(typeof window.supabase === “undefined”){
console.error(“Supabase CDN not loaded”)
}

/* =========================
CREATE CLIENT
========================= */

const supabaseClient =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
)

/* =========================
SAFE PROFILE
========================= */

function fallbackProfile(){
return {
id:“guest”,
name:“Guest”,
height:170,
weight:70,
weightHistory:[]
}
}

function getActiveProfile(){

try{

const raw =
localStorage.getItem(“activeProfile”)

if(!raw){
return fallbackProfile()
}

const p = JSON.parse(raw)

return p?.id
? p
: fallbackProfile()

}catch(e){

return fallbackProfile()

}
}

/* =========================
FOOD LOGS
========================= */

async function getFoodLogs(date){

const profile = getActiveProfile()

const { data,error } =
await supabaseClient
.from(“food_logs”)
.select(”*”)
.eq(“date”,date)
.eq(“userId”,profile.id)

if(error){
console.log(error)
return []
}

return data || []
}

async function saveFood(food){

const profile = getActiveProfile()

const { data,error } =
await supabaseClient
.from(“food_logs”)
.insert([{
userId: profile.id,
food: food.food,
calories:Number(food.calories||0),
protein:Number(food.protein||0),
carbs:Number(food.carbs||0),
fat:Number(food.fat||0),
date: food.date
}])

if(error){
console.log(error)
return null
}

return data
}

/* =========================
PROFILES
========================= */

async function fetchProfiles(){

const { data,error } =
await supabaseClient
.from(“profiles”)
.select(”*”)

if(error){
console.log(error)
return []
}

return data || []
}

async function upsertProfile(profile){

const { data,error } =
await supabaseClient
.from(“profiles”)
.upsert(profile)
.select()

if(error){
console.log(error)
return null
}

return data
}

/* =========================
REALTIME
========================= */

function initRealtime(){

supabaseClient
.channel(“health”)

.on(
“postgres_changes”,
{
event:”*”,
schema:“public”,
table:“food_logs”
},
()=>{
window.dispatchEvent(
new Event(“foodSyncUpdate”)
)
}
)

.on(
“postgres_changes”,
{
event:”*”,
schema:“public”,
table:“profiles”
},
()=>{
window.dispatchEvent(
new Event(“profileSyncUpdate”)
)
}
)

.subscribe()

}

initRealtime()

/* =========================
GLOBAL EXPORT
========================= */

window.supabaseClient = supabaseClient
window.getFoodLogs = getFoodLogs
window.saveFood = saveFood
window.fetchProfiles = fetchProfiles
window.upsertProfile = upsertProfile
window.getActiveProfile = getActiveProfile
