//////////////////////////////
// 🧠 AI ENGINE v11.1 PRO (UPGRADED)
//////////////////////////////

/* =========================
CALORIES → HEALTH SCORE (IMPROVED CURVE)
========================= */
function calculateHealthScore(calories, bmi = 22){

let score = 100

// 🔥 calorie curve (more realistic metabolic model)
if(calories < 1500) score -= 8
else if(calories < 2000) score -= 12
else if(calories < 2400) score -= 20
else if(calories < 2800) score -= 35
else if(calories < 3200) score -= 55
else score -= 80

// ⚖ BMI penalty (smarter weighted risk)
if(bmi >= 35) score -= 30
else if(bmi >= 30) score -= 20
else if(bmi >= 27) score -= 12
else if(bmi >= 25) score -= 6

return Math.max(0, Math.min(100, Math.round(score)))
}

/* =========================
RISK ENGINE (v11 IMPROVED)
========================= */
function getRiskLevel(calories, bmi){

let score = calculateHealthScore(calories, bmi)

if(score >= 80){
return {level:"🟢", text:"Low Risk", color:"green"}
}

if(score >= 55){
return {level:"🟡", text:"Medium Risk", color:"orange"}
}

return {level:"🔴", text:"High Risk", color:"red"}
}

/* =========================
FOOD ANOMALY DETECTION (NEW)
========================= */
function detectAnomaly(calories, history = []){

if(!history || history.length < 3){
return "insufficient data"
}

let avg = history.reduce((a,b)=>a+b,0) / history.length

if(calories > avg * 1.8){
return "⚠️ Possible overeating detected"
}

if(calories < avg * 0.5){
return "⚠️ Unusually low intake detected"
}

return "normal"
}

/* =========================
SMART ADVICE ENGINE (CONTEXT-AWARE)
========================= */
function getAdvice(calories, bmi = 22, history = []){

let risk = getRiskLevel(calories, bmi)
let anomaly = detectAnomaly(calories, history)

// 🔴 HIGH RISK
if(risk.level === "🔴"){
return "High risk detected. Reduce carbs/sugar, prioritize protein, and add 30–45 min walking."
}

// 🟡 MEDIUM RISK
if(risk.level === "🟡"){

if(anomaly.includes("overeating")){
return "You are above your normal intake trend. Consider lighter meals tomorrow."
}

return "Moderate intake. Maintain balance and avoid late-night eating."
}

// 🟢 LOW RISK
return "Healthy balance. Maintain current routine and hydration."
}

/* =========================
FOOD PATTERN LEARNING (v11 IMPROVED AI MEMORY)
========================= */
function analyzeFoodPreference(foods){

if(!foods || foods.length === 0){
return "No food data available"
}

let map = {}

foods.forEach(f=>{
let name = (f.food || "").toLowerCase()

if(!name) return

if(/rice|fried rice/.test(name)) map.rice = (map.rice||0)+1
if(/chicken|beef|fish|egg/.test(name)) map.protein = (map.protein||0)+1
if(/milo|tea|coffee|coke/.test(name)) map.drink = (map.drink||0)+1
if(/snack|chips|cookie|cake/.test(name)) map.snack = (map.snack||0)+1
if(/noodle|pasta|bread/.test(name)) map.carb = (map.carb||0)+1
})

// sort strongest pattern
let sorted = Object.entries(map).sort((a,b)=>b[1]-a[1])

if(sorted.length === 0){
return "No clear pattern yet"
}

return {
top: sorted[0][0],
raw: map
}
}

/* =========================
WEEKLY AI SUMMARY (SMART INSIGHT ENGINE)
========================= */
function generateWeeklyAI(dailyCaloriesArray, bmi){

if(!dailyCaloriesArray || dailyCaloriesArray.length === 0){
return {
avg:0,
trend:"no data",
riskDays:0,
insight:"No data available"
}
}

let avg = dailyCaloriesArray.reduce((a,b)=>a+b,0) / dailyCaloriesArray.length

let max = Math.max(...dailyCaloriesArray)
let min = Math.min(...dailyCaloriesArray)

let trend = "stable"

if(avg >= 2800) trend = "very high intake trend"
else if(avg >= 2400) trend = "high intake trend"
else if(avg <= 1800) trend = "low intake trend"

let riskDays = dailyCaloriesArray.filter(c => c > 2500).length

let anomaly = (max - min > 1200) ? "high fluctuation detected" : "stable intake pattern"

return {
avg: Math.round(avg),
trend,
riskDays,
anomaly,
insight: `Avg ${Math.round(avg)} kcal | ${trend} | ${anomaly} | Risk days: ${riskDays}`
}
}

/* =========================
GLOBAL AI INSIGHT ENGINE (FINAL API)
========================= */
function getAIInsight(calories, bmi, history = []){

let risk = getRiskLevel(calories, bmi)

return {
score: calculateHealthScore(calories, bmi),
risk: risk,
advice: getAdvice(calories, bmi, history)
}
}
