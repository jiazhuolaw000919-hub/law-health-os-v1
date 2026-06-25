//////////////////////////////
// 🧠 AI VISION v11.6 (FIXED)
// 🔑 必须把下面的 sk-YOUR_NEW_KEY_HERE 换成你全新的 OpenAI key
//////////////////////////////

function previewFoodImage(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.createElement("img");
    img.src = e.target.result;
    img.style.maxWidth = "100%";
    img.style.borderRadius = "10px";
    img.style.marginTop = "10px";
    const container = document.getElementById("aiResult");
    if (container) {
      container.innerHTML = "";
      container.appendChild(img);
    }
    if (callback) callback(e.target.result);
  };
  reader.readAsDataURL(file);
}

window.analyzeFoodImage = async function(base64) {
  try {
    if (!base64 || !base64.startsWith("data:image/")) throw new Error("Invalid image");
    const result = await callOpenAIVision(base64);
    return normalizeVision(result);
  } catch (e) {
    console.error("analyzeFoodImage error:", e);
    return fallbackVision();
  }
};

async function callOpenAIVision(base64Image) {
  // 🔥 在这里粘贴你的新 key
  const OPENAI_API_KEY = "sk-YOUR_NEW_KEY_HERE";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a nutrition AI. Analyze food images and return ONLY valid JSON. The JSON must contain an array 'foods' with objects having 'food','calories','protein','carbs','fat'. Include 'totalCalories', etc. Always estimate Asian portions."
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this food and return nutrition JSON." },
              { type: "image_url", image_url: { url: base64Image } }
            ]
          }
        ],
        temperature: 0.2
      })
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error("API error " + response.status + ": " + errText);
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (!raw) throw new Error("Empty response");
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch (e) {
    clearTimeout(timeoutId);
    throw e;
  }
}

function normalizeVision(data) {
  if (!data || !Array.isArray(data.foods) || data.foods.length === 0) {
    return fallbackVision();
  }
  return {
    foods: data.foods.map(f => ({
      food: f.food || "Unknown Food",
      calories: Number(f.calories) || 0,
      protein: Number(f.protein) || 0,
      carbs: Number(f.carbs) || 0,
      fat: Number(f.fat) || 0,
      portion: f.portion || "",
      cuisine: f.cuisine || "",
      confidence: Number(f.confidence) || 0.5
    })),
    totalCalories: data.totalCalories || data.foods.reduce((a,b) => a + Number(b.calories||0), 0),
    totalProtein: data.totalProtein || data.foods.reduce((a,b) => a + Number(b.protein||0), 0),
    totalCarbs: data.totalCarbs || data.foods.reduce((a,b) => a + Number(b.carbs||0), 0),
    totalFat: data.totalFat || data.foods.reduce((a,b) => a + Number(b.fat||0), 0),
    mealScore: data.mealScore || 70,
    healthRisk: data.healthRisk || "medium"
  };
}

function fallbackVision() {
  return {
    foods: [{ food: "Unknown Food", calories: 450, protein: 18, carbs: 55, fat: 15, portion: "estimated", cuisine: "unknown", confidence: 0.4 }],
    totalCalories: 450, totalProtein: 18, totalCarbs: 55, totalFat: 15,
    mealScore: 60, healthRisk: "medium"
  };
}

async function scanFoodAI(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve(fallbackVision());
      return;
    }
    const reader = new FileReader();
    reader.onload = async function() {
      try {
        const base64 = reader.result;
        const result = await callOpenAIVision(base64);
        resolve(normalizeVision(result));
      } catch (e) {
        resolve(fallbackVision());
      }
    };
    reader.readAsDataURL(file);
  });
}
