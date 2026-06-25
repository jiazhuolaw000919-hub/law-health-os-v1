/* =========================
 SUPABASE CONFIG (FIXED + EXTENDED)
 ========================= */

const SUPABASE_URL = "https://jqevcfyhnlttzdiylfrh.supabase.co"
const SUPABASE_KEY = "sb_publishable_GMM5PgeRzudbeh4aHK-1pw_lQ6TQnVe"

/* =========================
 SAFE CDN CHECK
 ========================= */
if (typeof window.supabase === "undefined") {
  console.error("❌ Supabase CDN not loaded. Please add <script src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'></script> in your HTML.")
}

/* =========================
 CLIENT INIT
 ========================= */
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

/* =========================
 FALLBACK PROFILE
 ========================= */
function fallbackProfile() {
  return {
    id: "guest",
    name: "Guest",
    height: 170,
    weight: 70,
    weightHistory: []
  }
}

/* =========================
 GET ACTIVE PROFILE (SAFE)
 ========================= */
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

/* =========================
 FOOD LOGS (READ)
 ========================= */
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
    console.error("getFoodLogs crash:", e)
    return []
  }
}

/* =========================
 SAVE FOOD (SAFE + ADAPTED TO food.html)
 ========================= */
async function saveFood(food) {
  try {
    const profile = getActiveProfile()
    // 只上传真实用户的数据（非guest）
    if (!profile?.id || profile.id === "guest") {
      console.warn("⚠️ No valid user profile, skipping Supabase upload.")
      return null
    }

    // 构建要上传的 payload，字段对齐你在 Supabase 中创建的 foods 表
    const payload = {
      userId: profile.id,
      food_name: food.food || "unknown",
      meal_type: food.mealType || "snack",      // 早餐/午餐等
      calories: Number(food.calories || 0),
      protein: Number(food.protein || 0),
      carbs: Number(food.carbs || 0),
      fat: Number(food.fat || 0),
      components: food.components || [],
      image_url: food.image || null,
      date: food.date || new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString()
    }

    const { data, error } = await supabaseClient
      .from("foods")          // 建议你在 Supabase 中创建名为 foods 的表
      .insert([payload])

    if (error) {
      console.error("saveFood error:", error)
      return null
    }
    console.log("✅ Synced to Supabase:", data)
    return data
  } catch (e) {
    console.error("saveFood crash:", e)
    return null
  }
}

/* =========================
 PROFILES (existing, keep)
 ========================= */
async function fetchProfiles() {
  try {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("*")

    if (error) {
      console.error("fetchProfiles error:", error)
      return []
    }
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

    if (error) {
      console.error("upsertProfile error:", error)
      return null
    }
    return data
  } catch (e) {
    return null
  }
}

/* =========================
 REALTIME (existing)
 ========================= */
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

/* =========================
 EXPORTS
 ========================= */
window.supabaseClient = supabaseClient
window.getFoodLogs = getFoodLogs
window.saveFood = saveFood
window.fetchProfiles = fetchProfiles
window.upsertProfile = upsertProfile
window.getActiveProfile = getActiveProfile
