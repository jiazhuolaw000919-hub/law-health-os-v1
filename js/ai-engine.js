//////////////////////////////
// 🧠 AI ENGINE v11 CORE
//////////////////////////////

/* =========================
CALORIES → HEALTH SCORE (v11 UPGRADE)
========================= */
function calculateHealthScore(calories, bmi = 22){

let score = 100

// calorie logic
if(calories < 1800) score -= 5
else if(calories < 2200) score -= 10
else if(calories < 2600) score -= 25
else if(calories < 3000) score -= 40
else score -= 60

// BMI penalty
if(bmi > 30) score -= 20
else if(bmi > 25) score -= 10

return Math.max(0, Math.min(100, Math.round(score)))
}

/* =========================
RISK SCORE (RED / YELLOW / GREEN)
========================= */
function getRiskLevel(calories, bmi){

let score = calculateHealthScore(calories, bmi)

if(score >= 75) return {level:"🟢", text:"Low Risk"}
if(score >= 50) return {level:"🟡", text:"Medium Risk"}
return {level:"🔴", text:"High Risk"}
}

/* =========================
SMART ADVICE ENGINE v11
========================= */
function getAdvice(calories, bmi = 22){

let risk = getRiskLevel(calories, bmi)

if(risk.level === "🔴"){
return "High risk day: reduce carbs, sugar + walk 30min"
}

if(risk.level === "🟡"){
return "Moderate intake: balance meals + light activity"
}

return "Healthy balance: maintain routine"
}

/* =========================
FOOD PREFERENCE AI (LEARNING SYSTEM)
========================= */
function analyzeFoodPreference(foods){

let map = {}

foods.forEach(f=>{
let name = (f.food || "").toLowerCase()

if(!name) return

if(name.includes("rice")) map.rice = (map.rice||0)+1
if(name.includes("chicken")) map.chicken = (map.chicken||0)+1
if(name.includes("milo")) map.milo = (map.milo||0)+1
if(name.includes("snack")) map.snack = (map.snack||0)+1
})

let sorted = Object.entries(map).sort((a,b)=>b[1]-a[1])

if(sorted.length === 0) return "No pattern yet"

return `Prefers: ${sorted[0][0]}`
}

/* =========================
WEEKLY AI SUMMARY (v11 CORE)
========================= */
function generateWeeklyAI(dailyCaloriesArray, bmi){

if(!dailyCaloriesArray || dailyCaloriesArray.length === 0){
return "No data available"
}

let avg = dailyCaloriesArray.reduce((a,b)=>a+b,0) / dailyCaloriesArray.length

let trend = "stable"

if(avg > 2600) trend = "high intake trend"
else if(avg < 1800) trend = "low intake trend"

let riskDays = dailyCaloriesArray.filter(c => c > 2500).length

return {
avg: Math.round(avg),
trend,
riskDays,
summary: `Avg ${Math.round(avg)} kcal | ${trend} | Risk days: ${riskDays}`
}
}

/* =========================
GLOBAL HELPER (SAFE WRAPPER)
========================= */
function getAIInsight(calories, bmi){

return {
score: calculateHealthScore(calories, bmi),
risk: getRiskLevel(calories, bmi),
advice: getAdvice(calories, bmi)
}

}
