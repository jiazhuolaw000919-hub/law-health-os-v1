import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const SUPABASE_URL = "https://jqevcfyhnlttzdiylfrh.supabase.co"
const SUPABASE_KEY = "sb_publishable_GMM5PgeRzudbeh4aHK-1pw_lQ6TQnVe"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

/* =========================
🔥 SAFE PROFILE CORE
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

/* ⚠️ FIX: ONLY SINGLE SOURCE (NO MERGE LOGIC ANYMORE) */
export function getActiveProfile(){
try{
const raw = localStorage.getItem("activeProfile")

if(!raw || raw === "undefined" || raw === "null"){
return fallbackProfile()
}

const parsed = JSON.parse(raw)

if(!parsed || !parsed.id){
return fallbackProfile()
}

return parsed

}catch(e){
console.log("profile parse error:", e)
return fallbackProfile()
}
}

/* =========================
🧹 DELETE SYSTEM (LOCAL ONLY - KEPT SAFE)
========================= */
const DELETE_GUARD_KEY = "deleted_items_v2"

function getDeletedSet(){
return new Set(JSON.parse(localStorage.getItem(DELETE_GUARD_KEY)) || [])
}

function saveDeletedSet(set){
localStorage.setItem(DELETE_GUARD_KEY, JSON.stringify([...set]))
}

function markDeleted(id){
if(!id) return
const set = getDeletedSet()
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
🍽 FOOD READ (UNCHANGED)
========================= */
export async function getFoodLogs(date){

const profile = getActiveProfile()

const { data, error } = await supabase
.from("food_logs")
.select("*")
.eq("date", date)
.eq("userId", profile.id)

if(error){
console.log("food log error:", error)
return []
}

return filterDeleted(data || [])
}

/* =========================
🍽 FOOD WRITE (UNCHANGED)
========================= */
export async function saveFood(data){

const profile = getActiveProfile()

const { data: result, error } = await supabase
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
📊 7 DAY STATS (UNCHANGED)
========================= */
export async function getFoodStats7Days(){

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

return {
days: arr,
avg: Math.round(arr.reduce((a,b)=>a+b,0)/arr.length),
max: Math.max(...arr),
min: Math.min(...arr)
}
}

/* =========================
❌ DELETE FOOD (UNCHANGED)
========================= */
export async function deleteFood(foodId){

const profile = getActiveProfile()
if(!foodId) return false

markDeleted(foodId)

const { error } = await supabase
.from("food_logs")
.delete()
.eq("id", foodId)
.eq("userId", profile.id)

if(error){
console.log("delete error:", error)
return false
}

return true
}

/* =========================
👤 PROFILE SYSTEM (CLEANED ONLY)
========================= */
export async function upsertProfile(profile){

const { data, error } = await supabase
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

export async function fetchProfiles(){

const { data, error } = await supabase
.from("profiles")
.select("*")

if(error){
console.log("fetch profiles error:", error)
return []
}

return filterDeleted(data || [])
}

export async function fetchProfile(id){

const { data, error } = await supabase
.from("profiles")
.select("*")
.eq("id", id)

if(error) return null
return data?.[0] || null
}

/* =========================
⚡ REALTIME ENGINE (FIXED - NO SYNC LOOP)
========================= */
export function initRealtime(){

if(!supabase) return

supabase
.channel("health-realtime")

.on("postgres_changes",{
event:"*",
schema:"public",
table:"food_logs"
},()=>{
window.dispatchEvent(new Event("foodSyncUpdate"))
})

.on("postgres_changes",{
event:"*",
schema:"public",
table:"profiles"
},()=>{
window.dispatchEvent(new Event("profileSyncUpdate"))
})

.subscribe()
}

/* =========================
⛔ REMOVED:
- syncProfiles()
- localStorage merge system
- polling sync loop (setInterval)
========================= */

/* =========================
AUTO INIT REALTIME ONLY
========================= */
initRealtime()
