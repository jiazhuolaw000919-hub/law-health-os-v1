//////////////////////////////
// 🧠 AI VISION v11.6 (UPGRADED + FIXED FOR v13)
// 🔑 API Key has been set (Project key)
// ⚠️ WARNING: This key is now exposed in this conversation.
//    For security, please revoke it at https://platform.openai.com/api-keys
//    and generate a new one, then paste it below.
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
// 🧠 MAIN VISION ENGINE (ENHANCED PROMPT ONLY)
//////////////////////////////
async function analyzeFoodImage(base64Image){
  try{
    const response = await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer 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"
      },
      body:JSON.stringify({
        model:"gpt-4o-mini",
        messages:[
          {
            role:"system",
            content:`
You are a senior clinical nutrition AI + food vision expert specializing in Asian cuisine.

Your job is to analyze food images and return STRICT JSON ONLY.

────────────────────────
🚨 OUTPUT RULES (HARD)
────────────────────────

- ALWAYS return valid JSON
- NEVER return null or empty fields
- ALWAYS estimate portion size if unclear
- NEVER output unknown unless absolutely impossible
- ALWAYS assume real-world Asian portions (Singapore/Malaysia style)

────────────────────────
🍱 CRITICAL FEATURE: FOOD SPLITTING
────────────────────────

If food contains multiple components, YOU MUST SPLIT THEM.

Examples:

🍛 Chicken rice →
- chicken
- rice
- sauce

🍱 Cai Fan / Mixed Rice →
- rice
- meat (separate)
- vegetables
- egg if present

🍜 Noodle dish →
- noodles
- protein
- soup/oil base

☕ Drinks →
- sugar
- milk
- coffee/tea base

────────────────────────
🇸🇬 ASIAN FOOD KNOWLEDGE (IMPORTANT FIX)
────────────────────────

Recognize:

- cai fan = mixed rice stall food
- economic rice = same as above
- kopitiam drinks = high sugar milk tea/coffee
- nasi lemak = rice + egg + sambal + anchovy
- mee goreng = oily fried noodles
- chicken rice = rice + chicken + sauce
- mala = high oil + spice + heavy calories

────────────────────────
🔥 CALORIE LOGIC (REALISTIC)
────────────────────────

Use realistic estimation:

- rice (1 plate) = 250–350 kcal
- fried chicken = 250–400 kcal
- grilled chicken = 150–250 kcal
- noodles = 300–500 kcal
- oily dishes = +30–50% calories
- drinks = 120–300 kcal

────────────────────────
📦 OUTPUT FORMAT (STRICT)
────────────────────────

Return EXACT structure:

{
foods: [
  {
    food: string,
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    portion: string,
    cuisine: string,
    confidence: number
  }
],
totalCalories: number,
totalProtein: number,
totalCarbs: number,
totalFat: number,
mealScore: number,
healthRisk: "low" | "medium" | "high"
}

────────────────────────
⚠️ IMPORTANT BEHAVIOR
────────────────────────

- If unsure → make realistic estimate (DO NOT say unknown)
- Always prioritize Asian diet logic
- Always split mixed meals
- Never output empty arrays
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
// 🧠 NORMALIZER (UNCHANGED)
//////////////////////////////
function normalizeVision(data){
  if(!data) return fallbackVision()

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
// 🧠 FALLBACK (UNCHANGED)
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
// 🧠 SIMPLE WRAPPER (UNCHANGED)
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
