//////////////////////////////
// 🧠 AI ENGINE v11.3 GPT-STYLE FULL UPGRADE
//////////////////////////////

/* =========================
🔥 FOOD NLP LAYER (STEP 2 IMPROVED)
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
  {key:"chickrice", value:"chicken rice"},
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
🍜 STEP 3: MULTI FOOD PARSER
========================= */
function parseFoodAI(text){

if(!text) return []

text = text.toLowerCase()

let parts = text.split(/,|\+| and | with /)

let results = []

for(let p of parts){
let clean = normalizeFoodAI(p.trim())
if(clean && clean !== "unknown food"){
results.push(clean)
}
}

return results.length ? results : ["unknown food"]
}

/* =========================
🍜 NEW: CUISINE DETECTOR (STEP 4 CORE)
========================= */
function detectCuisine(food){

if(!food) return "unknown"

if(/rice|chicken rice|nasi lemak/.test(food)) return "Asian"
if(/tom yum|thai/.test(food)) return "Thai"
if(/pasta|bread|steak|burger/.test(food)) return "Western"
if(/noodle|char kway teow/.test(food)) return "Chinese"
if(/milo|milk tea/.test(food)) return "Drink"

return "Mixed"
}

/* =========================
🔥 CALORIE SPLITTER (AI ESTIMATION CORE)
========================= */
function splitCalories(food, totalCalories){

if(!Array.isArray(food)) return []

let avg = totalCalories / food.length

return food.map(f => ({
food: f,
calories: Math.round(avg)
}))
}

/* =========================
🧠 MEAL INTELLIGENCE SCORE
========================= */
function calculateMealScore(items){

if(!items || items.length === 0) return 0

let score = 100

items.forEach(i=>{
if(i.calories > 800) score -= 25
if(/fried|oil/.test(i.food)) score -= 10
if(/vegetable|salad/.test(i.food)) score += 10
})

return Math.max(0, Math.min(100, score))
}

/* =========================
CALORIES → HEALTH SCORE
========================= */
function calculateHealthScore(calories, bmi = 22){

let score = 100

if(calories < 1500) score -= 8
else if(calories < 2000) score -= 12
else if(calories < 2400) score -= 20
else if(calories < 2800) score -= 35
else if(calories < 3200) score -= 55
else score -= 80

if(bmi >= 35) score -= 30
else if(bmi >= 30) score -= 20
else if(bmi >= 27) score -= 12
else if(bmi >= 25) score -= 6

return Math.max(0, Math.min(100, Math.round(score)))
}

/* =========================
RISK ENGINE
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
FOOD ANOMALY DETECTION
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
SMART ADVICE ENGINE
========================= */
function getAdvice(calories, bmi = 22, history = []){

let risk = getRiskLevel(calories, bmi)
let anomaly = detectAnomaly(calories, history)

if(risk.level === "🔴"){
return "High risk detected. Reduce carbs/sugar, prioritize protein, and add 30–45 min walking."
}

if(risk.level === "🟡"){

if(anomaly.includes("overeating")){
return "You are above your normal intake trend. Consider lighter meals tomorrow."
}

return "Moderate intake. Maintain balance and avoid late-night eating."
}

return "Healthy balance. Maintain current routine and hydration."
}

/* =========================
📊 FOOD RISK PER ITEM (NEW)
========================= */
function getItemRisk(food, calories){

if(calories > 800) return "HIGH"
if(calories > 500) return "MEDIUM"
return "LOW"
}

/* =========================
🧠 FINAL GPT-STYLE AI ENGINE
========================= */
function getAIInsight(calories, bmi, history = [], foodText = ""){

let risk = getRiskLevel(calories, bmi)

// 🍜 STEP 3: multi-food parsing
let foods = parseFoodAI(foodText)

// 🔥 STEP 4: calorie split
let split = splitCalories(foods, calories)

// 🧠 cuisine detection
let cuisines = foods.map(f => detectCuisine(f))

// 📊 per item intelligence
let items = split.map(s => ({
food: s.food,
calories: s.calories,
risk: getItemRisk(s.food, s.calories),
cuisine: detectCuisine(s.food)
}))

return {
score: calculateHealthScore(calories, bmi),
mealScore: calculateMealScore(items),
risk: risk,
advice: getAdvice(calories, bmi, history),

// 🍜 NEW AI OUTPUT
foods: items,
cuisines: [...new Set(cuisines)]
}
}
