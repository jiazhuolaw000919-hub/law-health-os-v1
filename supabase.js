/* =========================
 SUPABASE CONFIG (MINIMAL GUARANTEE)
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

    // 🔥 仅使用绝对不会缺少的三个字段
    const payload = {
      food: food.food || "unknown",
      calories: Number(food.calories || 0),
      date: food.date || new Date().toISOString().split("T")[0]
    }

    const { data, error } = await supabaseClient
      .from("food_logs")
      .insert([payload])
      .select()

    if (error) {
      console.error("❌ Save failed. Please create the table in Supabase:", error)
      return null
    }

    console.log("✅ Synced to Supabase (minimal):", data)
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
