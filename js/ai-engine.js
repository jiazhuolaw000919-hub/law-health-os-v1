//////////////////////////////
// 🧠 AI ENGINE v11 CORE (UPGRADED)
//////////////////////////////

/* =========================
CALORIES → HEALTH SCORE (SMART CURVE)
========================= */
function calculateHealthScore(calories, bmi = 22){

let score = 100

// 🔥 calorie curve (non-linear improvement)
if(calories < 1600) score -= 5
else if(calories < 2000) score -= 10
else if(calories < 2400) score -= 20
else if(calories < 2800) score -= 40
else if(calories < 3200) score -= 60
else score -= 75

// ⚖ BMI penalty (smarter weighting)
if(bmi >= 32) score -= 25
else if(bmi >= 28) score -= 15
else if(bmi >= 25) score -= 8

return Math.max(0, Math.min(100, Math.round(score)))
}

/* =========================
RISK ENGINE (CLEAN CLASSIFICATION)
========================= */
function getRiskLevel(calories, bmi){

let score = calculateHealthScore(calories, bmi)

if(score >= 80){
return {level:"🟢", text:"Low Risk", color:"green"}
}

if(score >= 50){
return {level:"🟡", text:"Medium Risk", color:"yellow"}
}

return {level:"🔴", text:"High Risk", color:"red"}
}

/* =========================
SMART ADVICE ENGINE (GPT STYLE)
========================= */
function getAdvice(calories, bmi = 22){

let risk = getRiskLevel(calories, bmi)

if(risk.level === "🔴"){
return "High risk day detected. Reduce carbs & sugar, increase protein, and add 30–45 min walking."
}

if(risk.level === "🟡"){
return "Moderate intake. Keep balanced meals, avoid late-night snacks, and stay active."
}

return "Healthy balance. Maintain current diet and hydration."
}

/* =========================
FOOD PATTERN LEARNING (IMPROVED AI MEMORY)
========================= */
function analyzeFoodPreference(foods){

if(!foods || foods.length === 0){
return "No food data available"
}

let map = {}

foods.forEach(f=>{
let name = (f.food || "").toLowerCase()

if(!name) return

// normalized classification
if(/rice|fried rice/.test(name)) map.rice = (map.rice||0)+1
if(/chicken|beef|fish/.test(name)) map.protein = (map.protein||0)+1
if(/milo|tea|coffee/.test(name)) map.drink = (map.drink||0)+1
if(/snack|chips|cookie/.test(name)) map.snack = (map.snack||0)+1
if(/noodle|pasta/.test(name)) map.carb = (map.carb||0)+1
})

let sorted = Object.entries(map).sort((a,b)=>b[1]-a[1])

if(sorted.length === 0){
return "No clear pattern yet"
}

return `Top preference: ${sorted[0][0]}`
}

/* =========================
WEEKLY AI SUMMARY (v11 ENHANCED)
========================= */
function generateWeeklyAI(dailyCaloriesArray, bmi){

if(!dailyCaloriesArray || dailyCaloriesArray.length === 0){
return {
avg:0,
trend:"no data",
riskDays:0,
summary:"No data available"
}
}

let avg = dailyCaloriesArray.reduce((a,b)=>a+b,0) / dailyCaloriesArray.length

let trend = "stable"

if(avg >= 2800) trend = "very high intake trend"
else if(avg >= 2400) trend = "high intake trend"
else if(avg <= 1800) trend = "low intake trend"

let riskDays = dailyCaloriesArray.filter(c => c > 2500).length

return {
avg: Math.round(avg),
trend,
riskDays,
summary: `Avg ${Math.round(avg)} kcal | ${trend} | Risk days: ${riskDays}`
}
}

/* =========================
GLOBAL AI INSIGHT ENGINE (MAIN API)
========================= */
function getAIInsight(calories, bmi){

let risk = getRiskLevel(calories, bmi)

return {
score: calculateHealthScore(calories, bmi),
risk: risk,
advice: getAdvice(calories, bmi)
}
}
