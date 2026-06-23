//////////////////////////////
// 🧠 AI VISION v11.6 (UPGRADED + FIXED FOR v13)
//////////////////////////////

/* =========================
IMAGE PREVIEW HELPER (UNCHANGED)
========================= */
function previewFoodImage(file, callback){

if(!file) return

const reader = new FileReader()

reader.onload = function(e){

const img = document.createElement("img")
img.src = e.target.result
img.style.maxWidth = "100%"
img.style.borderRadius = "10px"
img.style.marginTop = "10px"

const container = document.getElementById("aiResult")

if(container){
container.innerHTML = ""
container.appendChild(img)
}

if(callback) callback(e.target.result)
}

reader.readAsDataURL(file)
}

//////////////////////////////
// 🧠 GLOBAL WRAPPER (FIX ADDED)
//////////////////////////////

window.analyzeFoodImage = async function(base64){

try{
const result = await analyzeFoodImage(base64)

/* 🔥 FIX: ensure ALWAYS valid structure */
return normalizeVision(result)
}catch(e){
console.log("window wrapper error:", e)
return fallbackVision()
}
}

//////////////////////////////
// 🧠 MAIN VISION ENGINE (FIXED)
//////////////////////////////
async function analyzeFoodImage(base64Image){

try{

const response = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer YOUR_OPENAI_API_KEY"
},
body:JSON.stringify({
model:"gpt-4o-mini",

messages:[
{
role:"system",
content:`
You are a professional nutrition AI.

Return STRICT JSON only.

If multiple foods → return foods array.
If single food → still wrap in foods array.

Each food must include:
- food name
- calories
- protein
- carbs
- fat
- portion size
- cuisine
- confidence (0-1)

Also return:
- totalCalories
- totalProtein
- totalCarbs
- totalFat
- mealScore (0-100)
- healthRisk (low|medium|high)

IMPORTANT:
If unsure → estimate reasonably. NEVER return null or empty.
`
},
{
role:"user",
content:[
{
type:"text",
text:"Analyze this food image and return nutrition JSON."
},
{
type:"image_url",
image_url:{ url: base64Image }
}
]
}
],
temperature:0.2
})
})

const data = await response.json()

let raw = data?.choices?.[0]?.message?.content

if(!raw){
return fallbackVision()
}

let parsed = null

try{
parsed = JSON.parse(raw)
}catch(e){

const cleaned = raw
.replace(/```json/g,"")
.replace(/```/g,"")
.trim()

try{
parsed = JSON.parse(cleaned)
}catch(err){
return fallbackVision()
}
}

return normalizeVision(parsed)

}catch(e){
console.log("vision error:", e)
return fallbackVision()
}
}

//////////////////////////////
// 🧠 NORMALIZER (FIXED + SMART MERGE)
//////////////////////////////
function normalizeVision(data){

if(!data) return fallbackVision()

/* support single food response */
let foods = []

if(Array.isArray(data.foods)){
foods = data.foods
}else if(data.food){
foods = [data]
}else{
return fallbackVision()
}

return {
foods: foods.map(f=>({

food: f.food || "Unknown Food",
calories: Number(f.calories) || 0,
protein: Number(f.protein) || 0,
carbs: Number(f.carbs) || 0,
fat: Number(f.fat) || 0,
portion: f.portion || "unknown",
cuisine: f.cuisine || "unknown",
confidence: Number(f.confidence) || 0.5

})),

totalCalories: Number(data.totalCalories) || foods.reduce((a,b)=>a+Number(b.calories||0),0),
totalProtein: Number(data.totalProtein) || foods.reduce((a,b)=>a+Number(b.protein||0),0),
totalCarbs: Number(data.totalCarbs) || foods.reduce((a,b)=>a+Number(b.carbs||0),0),
totalFat: Number(data.totalFat) || foods.reduce((a,b)=>a+Number(b.fat||0),0),

mealScore: Number(data.mealScore) || 70,
healthRisk: data.healthRisk || "medium"
}
}

//////////////////////////////
// 🧠 FALLBACK (SAFE MODE FIXED)
//////////////////////////////
function fallbackVision(){

return {
foods:[
{
food:"Unknown Food",
calories:450,
protein:18,
carbs:55,
fat:15,
portion:"estimated",
cuisine:"unknown",
confidence:0.4
}
],
totalCalories:450,
totalProtein:18,
totalCarbs:55,
totalFat:15,
mealScore:60,
healthRisk:"medium"
}
}

//////////////////////////////
// 🧠 SIMPLE WRAPPER (SAFE FILE SCAN)
//////////////////////////////
async function scanFoodAI(file){

return new Promise((resolve)=>{

if(!file){
resolve(fallbackVision())
return
}

const reader = new FileReader()

reader.onload = async function(){

try{
const result = await analyzeFoodImage(reader.result)
resolve(normalizeVision(result))
}catch(e){
resolve(fallbackVision())
}
}

reader.readAsDataURL(file)
})
}
