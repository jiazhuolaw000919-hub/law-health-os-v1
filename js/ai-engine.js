//////////////////////////////
// 🧠 AI ENGINE v11.5 FULL SCORE SYSTEM
//////////////////////////////

/* =========================
🍜 FOOD NORMALIZATION LAYER
========================= */
function normalizeFoodAI(foodText){

if(!foodText){
return "unknown food"
}

foodText = foodText.toLowerCase()

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
🍜 MULTI FOOD PARSER
========================= */
function parseFoodAI(text){

if(!text) return []

text = text.toLowerCase()

let parts = text.split(/,|\+| and | with /)

let results = parts
.map(p => normalizeFoodAI(p.trim()))
.filter(p => p && p !== "unknown food")

return results.length ? results : ["unknown food"]
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

if(score >= 80){
return {level:"🟢", text:"Low Risk", color:"green"}
}

if(score >= 55){
return {level:"🟡", text:"Medium Risk", color:"orange"}
}

return {level:"🔴", text:"High Risk", color:"red"}
}

/* =========================
🍽 MEAL SCORE (OLD + NEW MIX)
========================= */
function calculateMealScore(items){

if(!items || items.length === 0) return 0

let score = 100

let protein = 0
let carbs = 0
let fat = 0

items.forEach(i=>{

// old logic
if(i.calories > 800) score -= 10
if(i.cuisine === "Western") score -= 5
if(i.cuisine === "Asian") score += 3

// NEW macro awareness
if(i.food.includes("chicken") || i.food.includes("egg")) protein += 1
if(i.food.includes("rice") || i.food.includes("bread")) carbs += 1
if(i.food.includes("fried") || i.food.includes("oil")) fat += 1

})

/* macro balance scoring */
if(protein === 0) score -= 10
if(carbs > protein * 2) score -= 12
if(fat > protein) score -= 15

return Math.max(0, Math.min(100, score))
}

/* =========================
📊 MACRO SCORING ENGINE (NEW)
========================= */
function calculateMacroScores(items){

let protein = 0
let carbs = 0
let fat = 0

items.forEach(i=>{

if(i.food.includes("chicken") || i.food.includes("egg") || i.food.includes("fish")){
protein += 25
}

if(i.food.includes("rice") || i.food.includes("bread") || i.food.includes("noodle")){
carbs += 25
}

if(i.food.includes("fried") || i.food.includes("oil") || i.food.includes("burger")){
fat += 25
}

})

return {
proteinScore: Math.min(100, protein),
carbScore: Math.min(100, carbs),
fatScore: Math.min(100, fat)
}
}

/* =========================
🍜 CALORIE SPLIT ENGINE
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

if(!history || history.length < 3){
return "insufficient data"
}

let avg = history.reduce((a,b)=>a+b,0) / history.length

if(calories > avg * 1.8){
return "possible overeating detected"
}

if(calories < avg * 0.5){
return "unusually low intake detected"
}

return "normal"
}

/* =========================
🧠 ADVICE ENGINE
========================= */
function getAdvice(calories, bmi = 22, history = []){

let risk = getRiskLevel(calories, bmi)
let anomaly = detectAnomaly(calories, history)

if(risk.level === "🔴"){
return "High risk detected. Reduce carbs/sugar, prioritize protein, and walk 30–45 min."
}

if(risk.level === "🟡"){
if(anomaly.includes("overeating")){
return "Above normal intake trend. Consider lighter meals tomorrow."
}
return "Moderate intake. Maintain balance and avoid late-night eating."
}

return "Healthy balance. Keep current routine and hydration."
}

/* =========================
🧠 FINAL AI ENGINE v11.5
========================= */
function getAIInsight(calories, bmi, history = [], foodText = ""){

let foods = parseFoodAI(foodText)

let split = splitCalories(foods, calories)

let items = split.map(s => ({
food: s.food,
calories: s.calories,
cuisine: detectCuisine(s.food),
risk: getRiskLevel(s.calories, bmi).level
}))

let macro = calculateMacroScores(items)

/* FINAL WEIGHTED SCORE */
let baseScore = calculateHealthScore(calories, bmi)
let mealScore = calculateMealScore(items)

let finalScore =
(baseScore * 0.4) +
(mealScore * 0.4) +
((macro.proteinScore + macro.carbScore + macro.fatScore)/3 * 0.2)

return {
score: Math.round(finalScore),
baseScore,
mealScore,
macro,

risk: getRiskLevel(calories, bmi),
advice: getAdvice(calories, bmi, history),

foods: items
}
}
