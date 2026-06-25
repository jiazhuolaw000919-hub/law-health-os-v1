/* =========================
 SUPABASE CONFIG (FIXED + UNIFIED TABLE)
 ========================= */

const SUPABASE_URL = "https://jqevcfyhnlttzdiylfrh.supabase.co"
const SUPABASE_KEY = "sb_publishable_GMM5PgeRzudbeh4aHK-1pw_lQ6TQnVe"

if (typeof window.supabase === "undefined") {
  console.error("❌ Supabase CDN not loaded.")
}

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

function fallbackProfile() {
  return {
    id: "guest",
    name: "Guest",
    height: 170,
    weight: 70,
    weightHistory: []
  }
}

function getActiveProfile() {
  try {
    const raw = localStorage.getItem("activeProfile")
    if (!raw) return fallbackProfile()
    const p = JSON.parse(raw)
    return p?.id ? p : fallbackProfile()
  } catch (e) {
    return fallbackProfile()
  }
}

// 保持原有读取逻辑（从 food_logs 查）
async function getFoodLogs(date) {
  try {
    const profile = getActiveProfile()
    if (!profile?.id || profile.id === "guest") return []
    const { data, error } = await supabaseClient
      .from("food_logs")
      .select("*")
      .eq("date", date)
      .eq("userId", profile.id)
    if (error) {
      console.error("getFoodLogs error:", error)
      return []
    }
    return Array.isArray(data) ? data : []
  } catch (e) {
    return []
  }
}

// 修改 saveFood，也写入 food_logs 表，字段名对齐
async function saveFood(food) {
  try {
    const profile = getActiveProfile()
    if (!profile?.id || profile.id === "guest") return null

    const payload = {
      userId: profile.id,
      food: food.food || "unknown",           // 注意字段名是 food，不是 food_name
      calories: Number(food.calories || 0),
      protein: Number(food.protein || 0),
      carbs: Number(food.carbs || 0),
      fat: Number(food.fat || 0),
      date: food.date || new Date().toISOString().split("T")[0],
      // 下面几个字段如果表里有列就可以存，没有的话会自动忽略（Supabase 会报错提示不存在列，我们先不加）
      // 如果你的 food_logs 表有 meal_type、components、image_url 列，可以取消注释
      // meal_type: food.mealType || "snack",
      // components: food.components || [],
      // image_url: food.image || null,
      created_at: new Date().toISOString()
    }

    const { data, error } = await supabaseClient
      .from("food_logs")          // 🔁 改为写入 food_logs 表
      .insert([payload])

    if (error) {
      // 详细打印错误，方便定位
      console.error("saveFood error:", JSON.stringify(error, null, 2))
      return null
    }
    console.log("✅ Synced to Supabase:", data)
    return data
  } catch (e) {
    console.error("saveFood crash:", e)
    return null
  }
}

async function fetchProfiles() {
  try {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("*")
    if (error) return []
    return Array.isArray(data) ? data : []
  } catch (e) {
    return []
  }
}

async function upsertProfile(profile) {
  try {
    const { data, error } = await supabaseClient
      .from("profiles")
      .upsert(profile)
      .select()
    if (error) return null
    return data
  } catch (e) {
    return null
  }
}

function initRealtime() {
  try {
    supabaseClient
      .channel("health")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "food_logs" },
        () => window.dispatchEvent(new Event("foodSyncUpdate"))
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => window.dispatchEvent(new Event("profileSyncUpdate"))
      )
      .subscribe()
  } catch (e) {
    console.log("realtime init failed:", e)
  }
}

initRealtime()

window.supabaseClient = supabaseClient
window.getFoodLogs = getFoodLogs
window.saveFood = saveFood
window.fetchProfiles = fetchProfiles
window.upsertProfile = upsertProfile
window.getActiveProfile = getActiveProfile
