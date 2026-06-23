import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const SUPABASE_URL = "https://jqevcfyhnlttzdiylfrh.supabase.co"
const SUPABASE_KEY = "sb_publishable_GMM5PgeRzudbeh4aHK-1pw_lQ6TQnVe"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// 🔥 DELETE GUARD
const DELETE_GUARD_KEY = "deleted_items_v2"

/* =========================
PROFILE CORE
========================= */
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

/* =========================
DELETE SYSTEM
========================= */
function getDeletedSet(){
return new Set(JSON.parse(localStorage.getItem(DELETE_GUARD_KEY)) || [])
}

function saveDeletedSet(set){
localStorage.setItem(DELETE_GUARD_KEY, JSON.stringify([...set]))
}

function markDeleted(id){
if(!id) return
let set = getDeletedSet()
set.add(id)
saveDeletedSet(set)
}

function isDeleted(id){
return getDeletedSet().has(id)
}

function filterDeleted(list){
if(!Array.isArray(list)) return []
return list.filter(i => i && i.id && !isDeleted(i.id))
}

/* =========================
🍽 FOOD LOG READ (NEW SUPABASE CLIENT)
========================= */
async function getFoodLogs(date){

const profile = getActiveProfile()

let { data, error } = await supabase
.from("food_logs")
.select("*")
.eq("date", date)
.eq("userId", profile.id)

if(error){
console.log("food log error:", error)
return []
}

return filterDeleted(data)
}

/* =========================
🍽 FOOD LOG WRITE
========================= */
async function saveFood(data){

const profile = getActiveProfile()

let { data: result, error } = await supabase
.from("food_logs")
.insert([{
userId: profile.id,
food: data.food || "unknown",
calories: Number(data.calories || 0),
protein: Number(data.protein || 0),
carbs: Number(data.carbs || 0),
fat: Number(data.fat || 0),
date: data.date,
createdAt: new Date().toISOString()
}])
.select()

if(error){
console.log("save error:", error)
return null
}

return result
}

/* =========================
📊 7 DAY STATS
========================= */
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

let avg = arr.reduce((a,b)=>a+b,0)/arr.length
let max = Math.max(...arr)
let min = Math.min(...arr)

return {
days: arr,
avg: Math.round(avg),
max,
min
}
}

/* =========================
❌ DELETE FOOD (NEW)
========================= */
async function deleteFood(foodId){

const profile = getActiveProfile()
if(!foodId) return

markDeleted(foodId)

let { error } = await supabase
.from("food_logs")
.delete()
.eq("id", foodId)
.eq("userId", profile.id)

if(error){
console.log("delete error:", error)
return null
}

return true
}

/* =========================
PROFILE CLOUD
========================= */
async function upsertProfile(profile){

let { data, error } = await supabase
.from("profiles")
.upsert({
id: profile.id,
name: profile.name,
height: Number(profile.height || 170),
weight: Number(profile.weight || 70),
goal: profile.goal || "maintain",
bmi: Number(profile.bmi || 0),
weightHistory: profile.weightHistory || [],
updatedAt: new Date().toISOString()
})
.select()

if(error){
console.log("profile upsert error:", error)
return null
}

return data
}

async function fetchProfiles(){

let { data, error } = await supabase
.from("profiles")
.select("*")

if(error){
console.log(error)
return []
}

return filterDeleted(data)
}

async function fetchProfile(id){

let { data, error } = await supabase
.from("profiles")
.select("*")
.eq("id", id)

if(error) return null
return data?.[0] || null
}

/* =========================
SYNC ENGINE (SIMPLIFIED)
========================= */
async function syncProfiles(){

try{

let cloud = await fetchProfiles()
let local = JSON.parse(localStorage.getItem("profiles")) || []

cloud = filterDeleted(cloud)
local = filterDeleted(local)

let map = new Map()

;[...local, ...cloud].forEach(p=>{
if(!p || !p.id || isDeleted(p.id)) return
map.set(p.id, {...(map.get(p.id)||{}), ...p})
})

let merged = [...map.values()]

localStorage.setItem("profiles", JSON.stringify(merged))

}catch(e){
console.log("sync error:", e)
}
}

/* =========================
REALTIME (OPTIONAL)
========================= */
function initRealtime(){

supabase
.channel("health-realtime")

.on("postgres_changes",{
event:"*",
schema:"public",
table:"food_logs"
},()=>{
syncProfiles()
window.dispatchEvent(new Event("foodSyncUpdate"))
})

.on("postgres_changes",{
event:"*",
schema:"public",
table:"profiles"
},()=>{
syncProfiles()
window.dispatchEvent(new Event("profileSyncUpdate"))
})

.subscribe()
}

initRealtime()

setInterval(syncProfiles, 10000)
window.addEventListener("online", syncProfiles)
window.addEventListener("focus", syncProfiles)

syncProfiles()
