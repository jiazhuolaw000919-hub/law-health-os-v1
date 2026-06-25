/* =========================
 SUPABASE CONFIG v16 (AUTO ADAPT + userId WHEN POSSIBLE)
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

    // 1️⃣ 尝试带 userId 的完整字段（如果表已升级则使用这个）
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
      date: food.date || new Date().toISOString().split("T")[0]
    }

    let { data, error } = await supabaseClient
      .from("food_logs")
      .insert([fullPayload])
      .select()

    if (!error) {
      console.log("✅ Synced to Supabase (full):", data)
      return data
    }

    // 2️⃣ 完整失败，尝试基础字段（userId + 食物 + 热量 + 日期）
    console.warn("Full insert failed, trying base with userId:", error.message)
    const basePayload = {
      userId: profile.id,
      food: food.food || "unknown",
      calories: Number(food.calories || 0),
      date: food.date || new Date().toISOString().split("T")[0]
    }

    let result = await supabaseClient
      .from("food_logs")
      .insert([basePayload])
      .select()

    if (!result.error) {
      console.log("✅ Synced to Supabase (base with userId):", result.data)
      return result.data
    }

    // 3️⃣ 如果连基础字段都失败（说明表里连 userId 都没有），降级到极简字段
    console.warn("Base insert failed, trying minimal (no userId):", result.error.message)
    const minimalPayload = {
      food: food.food || "unknown",
      calories: Number(food.calories || 0),
      date: food.date || new Date().toISOString().split("T")[0]
    }

    result = await supabaseClient
      .from("food_logs")
      .insert([minimalPayload])
      .select()

    if (result.error) {
      console.error("❌ All inserts failed. Please create the food_logs table in Supabase:", result.error)
      return null
    }

    console.warn("⚠️ Synced to Supabase (minimal, no userId). Run SQL to add userId column.")
    return result.data
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
