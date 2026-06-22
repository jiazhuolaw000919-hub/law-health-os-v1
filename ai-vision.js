//////////////////////////////
// 🧠 AI VISION v11.5 (PHASE 4)
//////////////////////////////

/* =========================
IMAGE PREVIEW HELPER
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
// 🧠 MAIN VISION ENGINE
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

Detect ALL foods in the image.

Each food must include:
- food name
- calories estimate
- protein (g)
- carbs (g)
- fat (g)
- portion size estimate
- cuisine type
- confidence (0-1)

Also return:
- totalCalories
- totalProtein
- totalCarbs
- totalFat
- mealScore (0-100)
- healthRisk (low / medium / high)

Output format:
{
foods: [...],
totalCalories: number,
totalProtein: number,
totalCarbs: number,
totalFat: number,
mealScore: number,
healthRisk: "low|medium|high"
}
`
},
{
role:"user",
content:[
{
type:"text",
text:"Analyze this food image carefully and return structured nutrition JSON."
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

/* =========================
SAFE PARSE (IMPORTANT FIX)
========================= */
let parsed = null

try{
parsed = JSON.parse(raw)
}catch(e){

// fallback clean parsing
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

/* =========================
NORMALIZE OUTPUT
========================= */
return normalizeVision(parsed)

}catch(e){
console.log("vision error:", e)
return fallbackVision()
}
}

//////////////////////////////
// 🧠 NORMALIZER (CRITICAL FIX)
//////////////////////////////
function normalizeVision(data){

if(!data) return fallbackVision()

return {
foods: (data.foods || []).map(f=>({

food: f.food || "Unknown",
calories: Number(f.calories || 0),
protein: Number(f.protein || 0),
carbs: Number(f.carbs || 0),
fat: Number(f.fat || 0),
portion: f.portion || "",
cuisine: f.cuisine || "",
confidence: Number(f.confidence || 0)

})),

totalCalories: Number(data.totalCalories || 0),
totalProtein: Number(data.totalProtein || 0),
totalCarbs: Number(data.totalCarbs || 0),
totalFat: Number(data.totalFat || 0),

mealScore: Number(data.mealScore || 0),
healthRisk: data.healthRisk || "medium"
}
}

//////////////////////////////
// 🧠 FALLBACK (SAFE MODE)
//////////////////////////////
function fallbackVision(){

return {
foods:[
{
food:"Unknown Food",
calories:500,
protein:10,
carbs:60,
fat:15,
portion:"unknown",
cuisine:"unknown",
confidence:0.3
}
],
totalCalories:500,
totalProtein:10,
totalCarbs:60,
totalFat:15,
mealScore:50,
healthRisk:"medium"
}
}

//////////////////////////////
// 🧠 SIMPLE WRAPPER (FOR FOOD.HTML)
//////////////////////////////
async function scanFoodAI(file){

return new Promise((resolve)=>{

if(!file){
resolve(fallbackVision())
return
}

const reader = new FileReader()

reader.onload = async function(){

const result = await analyzeFoodImage(reader.result)
resolve(result)

}

reader.readAsDataURL(file)
})
}
