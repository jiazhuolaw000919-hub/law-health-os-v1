const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

// 🔥 DELETE GUARD
const DELETE_GUARD_KEY = "deleted_items_v2"

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
function fallbackProfile(){
return {
id:"guest",
name:"Guest",
height:170,
weight:70,
weightHistory:[],
updatedAt: new Date().toISOString()
}
}

function getActiveProfile(){
try{
return JSON.parse(localStorage.getItem("activeProfile")) || fallbackProfile()
}catch(e){
return fallbackProfile()
}
}

//////////////////////////////
// DELETE SYSTEM
//////////////////////////////
function getDeletedSet(){
return new Set(JSON.parse(localStorage.getItem(DELETE_GUARD_KEY)) || [])
}

function saveDeletedSet(set){
localStorage.setItem(DELETE_GUARD_KEY, JSON.stringify(Array.from(set)))
}

function markDeleted(id){
if(!id) return
let set = getDeletedSet()
set.add(id)
saveDeletedSet(set)
}

function isDeleted(id){
if(!id) return false
return getDeletedSet().has(id)
}

function filterDeleted(list){
if(!Array.isArray(list)) return []
return list.filter(i => i && i.id && !isDeleted(i.id))
}

//////////////////////////////
// 🍽 FOOD LOG READ
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

return filterDeleted(data)
}

//////////////////////////////
// 🍽 FOOD LOG WRITE
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
// 📊 7 DAY STATS
//////////////////////////////
async function getFoodStats7Days(){

let arr = []

for(let i=6;i>=0;i--){
let d = new Date()
d.setDate(d.getDate()-i)

let date = d.toISOString().split("T")[0]
let logs = await getFoodLogs(date)

let total = 0
logs.forEach(l=> total += Number(l.calories || 0))

arr.push(total)
}

let avg = arr.reduce((a,b)=>a+b,0) / arr.length
let max = Math.max(...arr)
let min = Math.min(...arr)

return {
days: arr,
avg: Math.round(avg),
max,
min
}
}

//////////////////////////////
// ❌ DELETE FOOD
//////////////////////////////
async function deleteFood(foodId){

const profile = getActiveProfile()
if(!foodId) return null

markDeleted(foodId)

const url =
`${SUPABASE_URL}/rest/v1/food_logs?id=eq.${foodId}&userId=eq.${profile.id}`

return await safeFetch(url,{
method:"DELETE",
headers:{
apikey: SUPABASE_KEY,
Authorization: "Bearer " + SUPABASE_KEY
}
})
}

//////////////////////////////
// =========================
// 🧠 PROFILE CLOUD FUNCTIONS (NEW - PHASE B)
// =========================
//////////////////////////////

// 1️⃣ UPSERT PROFILE (FIXED - REAL UPSERT)
async function upsertProfile(profile){

const payload = {
id: profile.id,
name: profile.name,
height: Number(profile.height || 170),
weight: Number(profile.weight || 70),
goal: profile.goal || "maintain",
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

// 2️⃣ FETCH ALL PROFILES
async function fetchProfiles(){

const data = await safeFetch(`${SUPABASE_URL}/rest/v1/profiles`,{
method:"GET",
headers:{
apikey: SUPABASE_KEY,
Authorization: "Bearer " + SUPABASE_KEY
}
})

return filterDeleted(data)
}

// 3️⃣ FETCH SINGLE PROFILE
async function fetchProfile(id){

const data = await safeFetch(
`${SUPABASE_URL}/rest/v1/profiles?id=eq.${id}`,
{
method:"GET",
headers:{
apikey: SUPABASE_KEY,
Authorization: "Bearer " + SUPABASE_KEY
}
}
)

return data?.[0] || null
}

// 4️⃣ DELETE PROFILE CLOUD
async function deleteProfileCloud(id){

if(!id) return null

markDeleted(id)

return await safeFetch(
`${SUPABASE_URL}/rest/v1/profiles?id=eq.${id}`,
{
method:"DELETE",
headers:{
apikey: SUPABASE_KEY,
Authorization: "Bearer " + SUPABASE_KEY
}
}
)
}

//////////////////////////////
// 🔄 SYNC ENGINE (FIXED)
//////////////////////////////
async function syncProfiles(){

try{

let cloud = await fetchProfiles()
let local = JSON.parse(localStorage.getItem("profiles")) || []

cloud = filterDeleted(cloud)
local = filterDeleted(local)

let map = new Map()

// merge strategy (cloud + local)
;[...local, ...cloud].forEach(p=>{
if(!p || !p.id || isDeleted(p.id)) return

map.set(p.id,{
...(map.get(p.id) || {}),
...p
})
})

let merged = Array.from(map.values())

localStorage.setItem("profiles", JSON.stringify(merged))

let active = getActiveProfile()

if(active?.id){

let server = merged.find(p => p.id === active.id)

if(server?.updatedAt && active?.updatedAt){

if(new Date(server.updatedAt) > new Date(active.updatedAt)){
localStorage.setItem("activeProfile", JSON.stringify(server))
}

}else if(server){
localStorage.setItem("activeProfile", JSON.stringify(server))
}
}

}catch(e){
console.log("sync error:", e)
}
}

//////////////////////////////
// REALTIME ENGINE (FIXED)
//////////////////////////////
let realtimeChannel = null
let realtimeCooldown = false

function initRealtime(){

if(typeof supabase === "undefined"){
console.log("Supabase missing")
return
}

realtimeChannel = supabase
.channel('health-realtime')

.on('postgres_changes',{
event:'*',
schema:'public',
table:'food_logs'
},()=>{

if(realtimeCooldown) return
realtimeCooldown = true

setTimeout(()=> realtimeCooldown=false, 800)

syncProfiles()
window.dispatchEvent(new Event("foodSyncUpdate"))

})

.on('postgres_changes',{
event:'*',
schema:'public',
table:'profiles'
},()=>{

syncProfiles()
window.dispatchEvent(new Event("profileSyncUpdate"))

})

.subscribe()
}

initRealtime()

//////////////////////////////
// AUTO SYNC LOOP
//////////////////////////////
let syncLock = false

async function safeSync(){
if(syncLock) return
syncLock = true

await syncProfiles()

syncLock = false
}

setInterval(safeSync, 10000)

window.addEventListener("online", safeSync)
window.addEventListener("focus", safeSync)

syncProfiles()
