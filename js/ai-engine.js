//////////////////////////////
// 🧠 AI ENGINE v11.6 (PHASE D - MEMORY UPGRADE)
//////////////////////////////

/* =========================
📡 SUPABASE MEMORY LAYER (NEW)
========================= */
async function getUserFoodHistory(userId, limit = 30){

try{

if(typeof SUPABASE_URL === "undefined") return []

const res = await fetch(
`${SUPABASE_URL}/rest/v1/food_logs?userId=eq.${userId}&order=createdAt.desc&limit=${limit}`,
{
method:"GET",
headers:{
apikey: SUPABASE_KEY,
Authorization:"Bearer " + SUPABASE_KEY
}
}
)

if(!res.ok) return []

return await res.json()

}catch(e){
console.log("history fetch error:", e)
return []
}
}

/* =========================
🍜 FOOD NORMALIZATION LAYER
========================= */
function normalizeFoodAI(foodText){

if(!foodText) return "unknown food"

foodText = String(foodText).toLowerCase()

const map = [
  {key:"tomyam", value:"tom yum soup"},
  {key:"tom yam", value:"tom yum soup"},
  {key:"friedrice", value:"fried rice"},
  {key:"nasilemak", value:"nasi lemak"},
  {key:"chickenrice", value:"chicken rice"},
  {key:"milktea", value:"milk tea"},
  {key:"milo", value:"milo drink"},
  {key:"char kway teow", value:"char kway teow"}
]

for(let m of map){
if(foodText.includes(m.key)){
return m.value
}
}

return foodText
}

/* =========================
🍜 PARSER
========================= */
function parseFoodAI(text){

if(!text) return []

text = String(text).toLowerCase()

let parts = text.split(/,|\+| and | with /)

return parts
.map(p => normalizeFoodAI(p.trim()))
.filter(p => p && p !== "unknown food")
}

/* =========================
🌍 CUISINE DETECTION
========================= */
function detectCuisine(food){

if(!food) return "unknown"

if(/chicken rice|nasi lemak|fried rice/.test(food)) return "Asian"
if(/tom yum/.test(food)) return "Thai"
if(/pasta|burger|steak/.test(food)) return "Western"
if(/char kway teow|noodle/.test(food)) return "Chinese"
if(/milk tea|milo/.test(food)) return "Drink"

return "Mixed"
}

/* =========================
⚖️ BASE HEALTH SCORE
========================= */
function calculateHealthScore(calories, bmi = 22){

let score = 100

if(calories < 1500) score -= 8
else if(calories < 2000) score -= 12
else if(calories < 2400) score -= 20
else if(calories < 2800) score -= 35
else if(calories < 3200) score -= 55
else score -= 80

if(bmi >= 30) score -= 20
else if(bmi >= 27) score -= 12
else if(bmi >= 25) score -= 6

return Math.max(0, Math.min(100, score))
}

/* =========================
⚠️ RISK ENGINE
========================= */
function getRiskLevel(calories, bmi){

let score = calculateHealthScore(calories, bmi)

let level =
score >= 80 ? "LOW"
: score >= 55 ? "MEDIUM"
: "HIGH"

return {
level,
text:
level === "LOW" ? "Low Risk"
: level === "MEDIUM" ? "Medium Risk"
: "High Risk",

color:
level === "LOW" ? "green"
: level === "MEDIUM" ? "orange"
: "red",

score
}
}

/* =========================
🍽 MEAL SCORE
========================= */
function calculateMealScore(items){

if(!items || items.length === 0) return 0

let score = 100
let protein = 0, carbs = 0, fat = 0

items.forEach(i=>{

if(i.calories > 800) score -= 10
if(i.cuisine === "Western") score -= 5
if(i.cuisine === "Asian") score += 3

if(i.food.includes("chicken") || i.food.includes("egg")) protein++
if(i.food.includes("rice") || i.food.includes("bread")) carbs++
if(i.food.includes("fried") || i.food.includes("oil")) fat++

})

if(protein === 0) score -= 10
if(carbs > protein * 2) score -= 12
if(fat > protein) score -= 15

return Math.max(0, Math.min(100, score))
}

/* =========================
📊 MACROS
========================= */
function calculateMacroScores(items){

let protein = 0
let carbs = 0
let fat = 0

items.forEach(i=>{

if(i.food.includes("chicken") || i.food.includes("egg") || i.food.includes("fish")){
protein += 20
}

if(i.food.includes("rice") || i.food.includes("bread") || i.food.includes("noodle")){
carbs += 20
}

if(i.food.includes("fried") || i.food.includes("oil") || i.food.includes("burger")){
fat += 20
}

})

return {
proteinScore: Math.min(100, protein),
carbScore: Math.min(100, carbs),
fatScore: Math.min(100, fat)
}
}

/* =========================
🍜 SPLIT CALORIES
========================= */
function splitCalories(foods, totalCalories){

if(!foods.length) return []

let avg = totalCalories / foods.length

return foods.map(f => ({
food: f,
calories: Math.round(avg)
}))
}

/* =========================
⚠️ ANOMALY DETECTION
========================= */
function detectAnomaly(calories, history = []){

if(!history || history.length < 3) return "insufficient data"

let avg = history.reduce((a,b)=>a+b,0)/history.length

if(calories > avg * 1.8) return "possible overeating detected"
if(calories < avg * 0.5) return "unusually low intake detected"

return "normal"
}

/* =========================
🧠 ADVICE ENGINE
========================= */
function getAdvice(calories, bmi = 22, history = []){

let risk = getRiskLevel(calories, bmi)
let anomaly = detectAnomaly(calories, history)

if(risk.level === "HIGH"){
return "High risk detected. Reduce carbs/sugar, increase protein, walk 30–45 min."
}

if(risk.level === "MEDIUM"){
if(anomaly.includes("overeating")){
return "Above normal trend detected. Reduce portion tomorrow."
}
return "Moderate intake. Maintain balance."
}

return "Healthy pattern. Keep routine."
}

/* =========================
🧠 MAIN AI ENGINE v11.6 (MEMORY UPGRADE)
========================= */
async function getAIInsight(calories, bmi, history = [], foodText = "", userId = null){

let foods = parseFoodAI(foodText)
let split = splitCalories(foods, calories)

let items = split.map(s => ({
food: s.food,
calories: s.calories,
cuisine: detectCuisine(s.food),
risk: getRiskLevel(s.calories, bmi).level
}))

let macro = calculateMacroScores(items)

let baseScore = calculateHealthScore(calories, bmi)
let mealScore = calculateMealScore(items)

/* =========================
🧠 MEMORY INJECTION (NEW)
========================= */
let memoryTrend = 0

if(userId && typeof getUserFoodHistory !== "undefined"){

let historyData = await getUserFoodHistory(userId)

if(historyData && historyData.length > 3){

let last7 = historyData.slice(0,7).map(x=>x.calories)

let avg = last7.reduce((a,b)=>a+b,0)/last7.length

if(calories > avg * 1.2) memoryTrend = -5
else if(calories < avg * 0.8) memoryTrend = +5
else memoryTrend = +2
}
}

/* =========================
FINAL SCORE (WITH MEMORY)
========================= */
let finalScore =
(baseScore * 0.4) +
(mealScore * 0.4) +
((macro.proteinScore + macro.carbScore + macro.fatScore)/3 * 0.2)

finalScore += memoryTrend
finalScore = Math.max(0, Math.min(100, finalScore))

return {
score: Math.round(finalScore),

baseScore,
mealScore,

macro,

risk: getRiskLevel(calories, bmi),

advice: getAdvice(calories, bmi, history),

foods: items,

memoryTrend
}
}
