// ============================
// DB.JS v2.0 STABLE FIXED
// ============================

/* 🔥 SAFE PARSE */
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

if(!data.date){
console.warn("❌ missing date in food record")
return
}

let all = getAllFoods()
all.push(data)

localStorage.setItem("foods", JSON.stringify(all))
}

/* ================= NORMALIZE DATE (CRITICAL FIX) ================= */
function normalizeDate(date){

if(!date) return null

// Date object
if(date instanceof Date){
return date.toISOString().split("T")[0]
}

// string cleanup
if(typeof date === "string"){

// remove time part
date = date.split("T")[0]

// replace slashes
date = date.replaceAll("/","-")

// fix single digit month/day
let parts = date.split("-")
if(parts.length === 3){
let y = parts[0]
let m = parts[1].padStart(2,"0")
let d = parts[2].padStart(2,"0")
return `${y}-${m}-${d}`
}
}

return date
}

/* ================= GET FOOD LOGS (FIXED CORE) ================= */
function getFoodLogs(date, userId){

let all = getAllFoods()

let targetDate = normalizeDate(date)

if(!targetDate){
console.warn("❌ invalid date:", date)
return []
}

return all.filter(f => {

let fd = normalizeDate(f.date)

let matchDate = fd === targetDate

let matchUser =
!userId ||
!f.userId ||
f.userId === userId

return matchDate && matchUser
})
}

/* ================= OPTIONAL DEBUG TOOL ================= */
function debugFoods(){
console.log("ALL FOODS:", getAllFoods())
}

window.debugFoods = debugFoods
