 
// ============================
// DB.JS v2.1 STABLE FIXED + SAFE SYNC
// ============================

/* ================= SAFE PARSE ================= */
function safeJSON(key){
try{
return JSON.parse(localStorage.getItem(key) || "[]")
}catch(e){
return []
}
}

/* ================= GET ALL FOODS ================= */
function getAllFoods(){
return safeJSON("foods")
}

/* ================= SAVE FOOD ================= */
function saveFood(data){

if(!data){
console.warn("❌ empty food data")
return
}

if(!data.date){
console.warn("❌ missing date in food record")
return
}

let all = getAllFoods()

all.push({
food: data.food || "",
calories: Number(data.calories || 0),
protein: Number(data.protein || 0),
carbs: Number(data.carbs || 0),
fat: Number(data.fat || 0),
date: data.date,
userId: data.userId || null
})

localStorage.setItem("foods", JSON.stringify(all))
}

/* ================= NORMALIZE DATE (FIXED CORE) ================= */
function normalizeDate(date){

if(!date) return null

try{

// Date object
if(date instanceof Date){
return date.toISOString().split("T")[0]
}

// string cleanup
if(typeof date === "string"){

date = date.trim()

// remove time part
date = date.split("T")[0]

// replace slashes
date = date.replaceAll("/","-")

let parts = date.split("-")

if(parts.length === 3){

let y = parts[0]
let m = parts[1]
let d = parts[2]

// ensure numbers safe
m = String(m).padStart(2,"0")
d = String(d).padStart(2,"0")

return `${y}-${m}-${d}`
}
}

return date

}catch(e){
console.log("normalizeDate error:", e)
return null
}
}

/* ================= PROFILE SAFE FILTER ================= */
function getActiveProfileSafe(){

try{
const raw = localStorage.getItem("activeProfile")
if(!raw || raw==="undefined" || raw==="null"){
return {id:"guest"}
}
const p = JSON.parse(raw)
return p?.id ? p : {id:"guest"}
}catch(e){
return {id:"guest"}
}
}

/* ================= GET FOOD LOGS (CORE ENGINE) ================= */
function getFoodLogs(date, userId){

let all = getAllFoods()

let targetDate = normalizeDate(date)

if(!targetDate){
console.warn("❌ invalid date:", date)
return []
}

let activeUser = userId || getActiveProfileSafe().id

return all.filter(f => {

let fd = normalizeDate(f.date)

let matchDate = fd === targetDate

let matchUser =
!f.userId ||
f.userId === activeUser

return matchDate && matchUser
})
}

/* ================= SAFE ADD FOOD (COMPAT MODE) ================= */
function addFood(data){

// backward compatibility
return saveFood(data)
}

/* ================= OPTIONAL DEBUG TOOL ================= */
function debugFoods(){
console.log("ALL FOODS:", getAllFoods())
}

window.debugFoods = debugFoods
window.getFoodLogs = getFoodLogs
window.saveFood = saveFood
window.addFood = addFood
