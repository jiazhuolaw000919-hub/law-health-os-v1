//////////////////////////////
// 🧠 AI VISION v11.6 (UPGRADED + FIXED FOR v13)
// 🔑 IMPORTANT: Replace the key below with a fresh one from https://platform.openai.com/api-keys
//    This key is already exposed, revoke it immediately!
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
// 🧠 GLOBAL WRAPPER
//////////////////////////////
window.analyzeFoodImage = async function(base64){
  try{
    const result = await callOpenAIVision(base64)
    return normalizeVision(result)
  }catch(e){
    console.error("❌ analyzeFoodImage global wrapper error:", e)
    return fallbackVision()
  }
}

//////////////////////////////
// 🧠 MAIN VISION ENGINE (call OpenAI API)
//////////////////////////////
async function callOpenAIVision(base64Image){
  // ===== REPLACE WITH YOUR NEW KEY HERE =====
  const OPENAI_API_KEY = "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";
  // ==========================================

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 seconds timeout

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a senior clinical nutrition AI + food vision expert specializing in Asian cuisine. Your job is to analyze food images and return STRICT JSON ONLY.

🚨 OUTPUT RULES (HARD):
- ALWAYS return valid JSON
- NEVER return null or empty fields
- ALWAYS estimate portion size if unclear
- NEVER output "unknown" unless absolutely impossible
- ALWAYS assume real-world Asian portions (Singapore/Malaysia style)

🍱 CRITICAL: FOOD SPLITTING
If food contains multiple components, YOU MUST SPLIT THEM.
Examples:
- Chicken rice → chicken, rice, sauce
- Cai Fan / Mixed Rice → rice, meat, vegetables, egg if present
- Noodle dish → noodles, protein, soup/oil base
- Drinks → sugar, milk, coffee/tea base

🇸🇬 ASIAN FOOD KNOWLEDGE:
- cai fan = mixed rice stall food
- economic rice = same as above
- kopitiam drinks = high sugar milk tea/coffee
- nasi lemak = rice + egg + sambal + anchovy
- mee goreng = oily fried noodles
- chicken rice = rice + chicken + sauce
- mala = high oil + spice + heavy calories

🔥 CALORIE LOGIC (REALISTIC):
- rice (1 plate) = 250–350 kcal
- fried chicken = 250–400 kcal
- grilled chicken = 150–250 kcal
- noodles = 300–500 kcal
- oily dishes = +30–50% calories
- drinks = 120–300 kcal

📦 OUTPUT FORMAT (STRICT JSON ONLY, NO MARKDOWN):
{
  "foods": [
    {
      "food": "string",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fat": number,
      "portion": "string",
      "cuisine": "string",
      "confidence": number
    }
  ],
  "totalCalories": number,
  "totalProtein": number,
  "totalCarbs": number,
  "totalFat": number,
  "mealScore": number,
  "healthRisk": "low" | "medium" | "high"
}
`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this food image and return nutrition JSON."
              },
              {
                type: "image_url",
                image_url: { url: base64Image }
              }
            ]
          }
        ],
        temperature: 0.2
      })
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    let raw = data?.choices?.[0]?.message?.content;

    if (!raw) {
      console.warn("⚠️ No content returned from OpenAI");
      return fallbackVision();
    }

    // Try to parse JSON, removing possible markdown fences
    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      const cleaned = raw.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    }

    return parsed;

  } catch (e) {
    clearTimeout(timeoutId);
    console.error("❌ Vision API call failed:", e);
    throw e; // re-throw to be caught by global wrapper
  }
}

//////////////////////////////
// 🧠 NORMALIZER (ensure data structure)
//////////////////////////////
function normalizeVision(data){
  if (!data) {
    console.warn("⚠️ normalizeVision: data is null/undefined");
    return fallbackVision();
  }

  let foods = [];

  if (Array.isArray(data.foods)) {
    foods = data.foods;
  } else if (data.food) {
    foods = [data];
  } else {
    console.warn("⚠️ normalizeVision: no foods array or food field");
    return fallbackVision();
  }

  const normalized = {
    foods: foods.map(f => ({
      food: f.food || "Unknown Food",
      calories: Number(f.calories) || 0,
      protein: Number(f.protein) || 0,
      carbs: Number(f.carbs) || 0,
      fat: Number(f.fat) || 0,
      portion: f.portion || "unknown",
      cuisine: f.cuisine || "unknown",
      confidence: Number(f.confidence) || 0.5
    })),
    totalCalories: Number(data.totalCalories) || foods.reduce((a,b) => a + Number(b.calories||0), 0),
    totalProtein: Number(data.totalProtein) || foods.reduce((a,b) => a + Number(b.protein||0), 0),
    totalCarbs: Number(data.totalCarbs) || foods.reduce((a,b) => a + Number(b.carbs||0), 0),
    totalFat: Number(data.totalFat) || foods.reduce((a,b) => a + Number(b.fat||0), 0),
    mealScore: Number(data.mealScore) || 70,
    healthRisk: data.healthRisk || "medium"
  };

  console.log("✅ Normalized vision data:", normalized);
  return normalized;
}

//////////////////////////////
// 🧠 FALLBACK
//////////////////////////////
function fallbackVision(){
  console.warn("⚠️ Using fallback vision data");
  return {
    foods: [
      {
        food: "Unknown Food",
        calories: 450,
        protein: 18,
        carbs: 55,
        fat: 15,
        portion: "estimated",
        cuisine: "unknown",
        confidence: 0.4
      }
    ],
    totalCalories: 450,
    totalProtein: 18,
    totalCarbs: 55,
    totalFat: 15,
    mealScore: 60,
    healthRisk: "medium"
  };
}

//////////////////////////////
// 🧠 SIMPLE WRAPPER (for manual use)
//////////////////////////////
async function scanFoodAI(file){
  return new Promise((resolve) => {
    if (!file) {
      resolve(fallbackVision());
      return;
    }
    const reader = new FileReader();
    reader.onload = async function(){
      try {
        const base64 = reader.result;
        const result = await callOpenAIVision(base64);
        resolve(normalizeVision(result));
      } catch (e) {
        console.error("scanFoodAI error:", e);
        resolve(fallbackVision());
      }
    };
    reader.readAsDataURL(file);
  });
}
