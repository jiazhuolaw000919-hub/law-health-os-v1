/* =========================
 SUPABASE CONFIG (ULTRA-FALLBACK)
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

async function getFoodLogs(date) {
  try {
    const profile = getActiveProfile()
    if (!profile?.id || profile.id === "guest") return []
    const { data, error } = await supabaseClient
      .from("food_logs")
      .select("*")
      .eq("date", date)
      .eq("userId", profile.id)
    if (error) return []
    return Array.isArray(data) ? data : []
  } catch (e) {
    return []
  }
}

async function saveFood(food) {
  try {
    const profile = getActiveProfile()
    if (!profile?.id || profile.id === "guest") {
      console.warn("⚠️ Guest user, skipping sync")
      return null
    }

    // 三级 payload
    const fullPayload = {
      userId: profile.id,
      food: food.food || "unknown",
      calories: Number(food.calories || 0),
      protein: Number(food.protein || 0),
      carbs: Number(food.carbs || 0),
      fat: Number(food.fat || 0),
      meal_type: food.mealType || "snack",
      components: food.components || [],
      image_url: food.image || null,
      date: food.date || new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString()
    }

    const basePayload = {
      userId: profile.id,
      food: food.food || "unknown",
      calories: Number(food.calories || 0),
      date: food.date || new Date().toISOString().split("T")[0],
      created_at: new Date().toISOString()
    }

    const minimalPayload = {
      food: food.food || "unknown",
      calories: Number(food.calories || 0),
      date: food.date || new Date().toISOString().split("T")[0]
    }

    // 尝试完整插入
    let result = await supabaseClient.from("food_logs").insert([fullPayload]).select()
    if (!result.error) {
      console.log("✅ Synced to Supabase (full):", result.data)
      return result.data
    }
    console.warn("Full insert failed:", result.error.message)

    // 尝试基础插入（带 userId）
    result = await supabaseClient.from("food_logs").insert([basePayload]).select()
    if (!result.error) {
      console.log("✅ Synced to Supabase (base):", result.data)
      return result.data
    }
    console.warn("Base insert failed:", result.error.message)

    // 最后尝试最小插入（连 userId 都不要了，表结构一定缺这些列）
    result = await supabaseClient.from("food_logs").insert([minimalPayload]).select()
    if (!result.error) {
      console.warn("⚠️ Synced with minimal columns (no userId). Run SQL to fix table.")
      return result.data
    }

    // 彻底失败，说明表都不存在或结构完全不兼容
    console.error("❌ All inserts failed. Please create the food_logs table in Supabase.")
    return null
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
