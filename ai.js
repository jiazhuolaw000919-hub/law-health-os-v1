//////////////////////////////
// 🧠 AI ANALYSIS LAYER v2 (UPGRADED + CLEAN)
//////////////////////////////

/* =========================
📊 BMI CALCULATOR
========================= */
function getBMI(weight, height){

if(!weight || !height) return 0

return Number((weight / ((height / 100) ** 2)).toFixed(1))
}

/* =========================
⚠️ RISK ENGINE (IMPROVED SCALE)
========================= */
function riskLevel(cal, bmi){

if(cal > 3200 && bmi > 28) return "🔴 VERY HIGH"
if(cal > 3000 || bmi > 30) return "🔴 HIGH"
if(cal > 2600 || bmi > 27) return "🟡 MEDIUM"
return "🟢 LOW"
}

/* =========================
📈 WEIGHT PREDICTION (IMPROVED MODEL)
========================= */
function predictWeight(currentWeight, avgCal){

if(!currentWeight || !avgCal) return currentWeight

// baseline 2200 kcal maintenance
let diff = avgCal - 2200

// smoother metabolic conversion
let change = diff * 0.008

return Number((currentWeight + change).toFixed(1))
}

/* =========================
🍽 AI HEALTH SUGGESTION (SMARTER LOGIC)
========================= */
function aiSuggestion(cal, bmi){

if(cal > 3200){
return "🚨 Extremely high intake: cut sugar, fried food, and late-night meals"
}

if(cal > 2800 && bmi > 27){
return "⚠️ High risk combo: reduce carbs + add 30 min cardio"
}

if(cal > 2800){
return "🍽 High calorie day: reduce portion size for next meal"
}

if(bmi > 30){
return "⚠️ BMI critical: focus on daily movement + calorie control"
}

if(bmi > 27){
return "⚠️ Slight overweight: improve consistency in diet + exercise"
}

if(cal > 2400){
return "🍽 Slightly high intake: keep dinner lighter"
}

return "✅ Balanced intake: maintain current routine"
}

/* =========================
🧠 DAILY HEALTH SCORE (NEW)
========================= */
function dailyHealthScore(cal, bmi){

let score = 100

// calorie penalty
if(cal > 3200) score -= 40
else if(cal > 2800) score -= 25
else if(cal > 2400) score -= 15

// BMI penalty
if(bmi > 30) score -= 30
else if(bmi > 27) score -= 20
else if(bmi > 25) score -= 10

return Math.max(0, Math.min(100, Math.round(score)))
}

/* =========================
📊 DAILY INSIGHT SUMMARY (NEW)
========================= */
function generateDailyInsight(cal, bmi, weight){

let risk = riskLevel(cal, bmi)

return {
bmi: getBMI(weight, 170), // fallback height if not provided
risk: risk,
score: dailyHealthScore(cal, bmi),
suggestion: aiSuggestion(cal, bmi),
weightPrediction: predictWeight(weight, cal)
}
}
