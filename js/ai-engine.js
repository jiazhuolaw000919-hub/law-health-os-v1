
//////////////////////////////
// 🧠 AI ENGINE v12.3 SAFE PRO UPGRADE (NO FEATURE REMOVED)
//////////////////////////////

/* =========================
📡 SUPABASE MEMORY LAYER (HARD SAFE)
========================= */
async function getUserFoodHistory(userId, limit = 30){

try{

if(typeof SUPABASE_URL === "undefined" || typeof SUPABASE_KEY === "undefined"){
return []
}

if(!userId) return []

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

if(!res || !res.ok) return []

const data = await res.json()

return Array.isArray(data) ? data : []

}catch(e){
console.log("history fetch error:", e)
return []
}
}

/* =========================
🍜 NORMALIZATION (UNCHANGED CORE + SAFE CAST)
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
🍜 PARSER (SAFE + STRICT CLEAN)
========================= */
function parseFoodAI(text){

if(!text || typeof text !== "string") return []

text = text.toLowerCase()

let parts = text.split(/,|\+| and | with /i)

return parts
.map(p => normalizeFoodAI(p.trim()))
.filter(p => p && p !== "unknown food" && p.length > 1)
}

/* =========================
🌍 CUISINE (UNCHANGED)
========================= */
function detectCuisine(food){

if(!food || typeof food !== "string") return "unknown"

if(/chicken rice|nasi lemak|fried rice/.test(food)) return "Asian"
if(/tom yum/.test(food)) return "Thai"
if(/pasta|burger|steak/.test(food)) return "Western"
if(/char kway teow|noodle/.test(food)) return "Chinese"
if(/milk tea|milo/.test(food)) return "Drink"

return "Mixed"
}

/* =========================
⚖️ HEALTH SCORE (ULTRA SAFE)
========================= */
function calculateHealthScore(calories, bmi = 22){

let score = 100

calories = Number(calories)
bmi = Number(bmi)

if(!isFinite(calories)) calories = 0
if(!isFinite(bmi)) bmi = 22

if(calories < 1500) score -= 8
else if(calories < 2000) score -= 12
else if(calories < 2400) score -= 20
else if(calories < 2800) score -= 35
else if(calories < 3200) score -= 55
else score -= 80

if(bmi >= 30) score -= 20
else if(bmi >= 27) score -= 12
else if(bmi >= 25) score -= 6

score = Number(score)

if(!isFinite(score)) score = 0

return Math.max(0, Math.min(100, score))
}

/* =========================
⚠️ RISK ENGINE (SAFE OUTPUT ALWAYS)
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

score: Number(score || 0)
}
}

/* =========================
🍽 MEAL SCORE (SAFE STABLE)
========================= */
function calculateMealScore(items){

if(!Array.isArray(items)) return 0
if(items.length === 0) return 0

let score = 100
let protein = 0, carbs = 0, fat = 0

items.forEach(i=>{

if(!i || !i.food) return

let cal = Number(i.calories || 0)

if(cal > 800) score -= 10
if(i.cuisine === "Western") score -= 5
if(i.cuisine === "Asian") score += 3

if(i.food.includes("chicken") || i.food.includes("egg")) protein++
if(i.food.includes("rice") || i.food.includes("bread")) carbs++
if(i.food.includes("fried") || i.food.includes("oil")) fat++

})

if(protein === 0) score -= 10
if(carbs > protein * 2) score -= 12
if(fat > protein) score -= 15

score = Number(score)
if(!isFinite(score)) score = 0

return Math.max(0, Math.min(100, score))
}

/* =========================
📊 MACRO SCORE (SAFE)
========================= */
function calculateMacroScores(items){

if(!Array.isArray(items)) return {
proteinScore:0,
carbScore:0,
fatScore:0
}

let protein = 0
let carbs = 0
let fat = 0

items.forEach(i=>{

if(!i || !i.food) return

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
🍜 SPLIT CALORIES (HARD SAFE FIX)
========================= */
function splitCalories(foods, totalCalories){

if(!Array.isArray(foods)) return []
if(!foods.length) return []

totalCalories = Number(totalCalories)

if(!isFinite(totalCalories) || totalCalories <= 0){
totalCalories = 300
}

let avg = totalCalories / foods.length

if(!isFinite(avg) || avg <= 0){
avg = 300
}

return foods.map(f => ({
food: f,
calories: Math.round(avg)
}))
}

/* =========================
⚠️ ANOMALY DETECTION (SAFE FIX)
========================= */
function detectAnomaly(calories, history = []){

if(!Array.isArray(history) || history.length < 3){
return "insufficient data"
}

let valid = history
.map(h => Number(h?.calories ?? h))
.filter(n => isFinite(n))

if(valid.length < 3){
return "insufficient data"
}

let avg = valid.reduce((a,b)=>a+b,0)/valid.length

if(calories > avg * 1.8) return "possible overeating detected"
if(calories < avg * 0.5) return "unusually low intake detected"

return "normal"
}

/* =========================
🧠 ADVICE ENGINE (SAFE)
========================= */
function getAdvice(calories, bmi = 22, history = []){

let risk = getRiskLevel(calories, bmi)
let anomaly = detectAnomaly(calories, history)

if(risk.level === "HIGH"){
return "High risk detected. Reduce carbs/sugar, increase protein, walk 30–45 min."
}

if(risk.level === "MEDIUM"){
if(typeof anomaly === "string" && anomaly.includes("overeating")){
return "Above normal trend detected. Reduce portion tomorrow."
}
return "Moderate intake. Maintain balance."
}

return "Healthy pattern. Keep routine."
}

/* =========================
🧠 MAIN ENGINE v12.3 SAFE OUTPUT (NO FEATURE LOSS)
========================= */
async function getAIInsight(calories, bmi, history = [], foodText = "", userId = null){

calories = Number(calories)
bmi = Number(bmi)

if(!isFinite(calories)) calories = 0
if(!isFinite(bmi)) bmi = 22

let foods = parseFoodAI(foodText)
let split = splitCalories(foods, calories)

let items = split.map(s => ({
food: s.food || "unknown",
calories: Number(s.calories || 0),
cuisine: detectCuisine(s.food),
risk: "UNKNOWN"
}))

let macro = calculateMacroScores(items)

let baseScore = calculateHealthScore(calories, bmi)
let mealScore = calculateMealScore(items)

/* ================= MEMORY SAFE ================= */
let memoryTrend = 0

if(userId){

try{

let historyData = await getUserFoodHistory(userId)

if(Array.isArray(historyData) && historyData.length > 3){

let last7 = historyData
.slice(0,7)
.map(x=>Number(x?.calories || 0))
.filter(n => isFinite(n))

if(last7.length > 0){

let avg = last7.reduce((a,b)=>a+b,0)/last7.length

if(calories > avg * 1.2) memoryTrend = -5
else if(calories < avg * 0.8) memoryTrend = +5
else memoryTrend = +2
}
}

}catch(e){
memoryTrend = 0
}
}

/* ================= FINAL SCORE (SAFE + GUARANTEED NUMBER) ================= */
let finalScore =
(baseScore * 0.4) +
(mealScore * 0.4) +
((macro.proteinScore + macro.carbScore + macro.fatScore)/3 * 0.2)

finalScore += memoryTrend

finalScore = Number(finalScore)

if(!isFinite(finalScore)) finalScore = 0

finalScore = Math.max(0, Math.min(100, finalScore))

let risk = getRiskLevel(calories, bmi)

/* ================= RETURN SAFE ================= */
return {
score: Math.round(finalScore),
baseScore: Number(baseScore || 0),
mealScore: Number(mealScore || 0),
macro: macro,
risk: risk,
advice: getAdvice(calories, bmi, history),
foods: Array.isArray(items) ? items : [],
memoryTrend: Number(memoryTrend || 0)
}
}
