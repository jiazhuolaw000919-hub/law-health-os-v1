/* =========================
SUPABASE CONFIG (FIXED SAFE)
========================= */

const SUPABASE_URL = "https://jqevcfyhnlttzdiylfrh.supabase.co"
const SUPABASE_KEY = "sb_publishable_GMM5PgeRzudbeh4aHK-1pw_lQ6TQnVe"

/* =========================
SAFE CDN CHECK
========================= */

if (typeof window.supabase === "undefined") {
console.error("Supabase CDN not loaded")
}

/* =========================
CLIENT
========================= */

const supabaseClient =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
)

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

const raw =
localStorage.getItem("activeProfile")

if (!raw) return fallbackProfile()

const p = JSON.parse(raw)

return p?.id ? p : fallbackProfile()

} catch (e) {
return fallbackProfile()
}
}

/* =========================
FOOD LOGS (FIXED + SAFE + RESILIENT)
========================= */

async function getFoodLogs(date) {

try {

const profile = getActiveProfile()

if (!profile?.id) return []

const { data, error } =
await supabaseClient
.from("food_logs")
.select("*")
.eq("date", date)
.eq("userId", profile.id)

if (error) {
console.log("getFoodLogs error:", error)
return []
}

return Array.isArray(data) ? data : []

} catch (e) {
console.log("getFoodLogs crash:", e)
return []
}
}

/* =========================
SAVE FOOD (SAFE + AUTO CLEAN)
========================= */

async function saveFood(food) {

try {

const profile = getActiveProfile()

if (!profile?.id) return null

const payload = {
userId: profile.id,
food: food.food || "unknown",
calories: Number(food.calories || 0),
protein: Number(food.protein || 0),
carbs: Number(food.carbs || 0),
fat: Number(food.fat || 0),
date: food.date
}

const { data, error } =
await supabaseClient
.from("food_logs")
.insert([payload])

if (error) {
console.log("saveFood error:", error)
return null
}

return data

} catch (e) {
console.log("saveFood crash:", e)
return null
}
}

/* =========================
PROFILES
========================= */

async function fetchProfiles() {

try {

const { data, error } =
await supabaseClient
.from("profiles")
.select("*")

if (error) {
console.log(error)
return []
}

return Array.isArray(data) ? data : []

} catch (e) {
return []
}
}

/* =========================
UPSERT PROFILE
========================= */

async function upsertProfile(profile) {

try {

const { data, error } =
await supabaseClient
.from("profiles")
.upsert(profile)
.select()

if (error) {
console.log(error)
return null
}

return data

} catch (e) {
return null
}
}

/* =========================
REALTIME (SAFE FIXED)
========================= */

function initRealtime() {

try {

supabaseClient
.channel("health")

.on(
"postgres_changes",
{
event: "*",
schema: "public",
table: "food_logs"
},
() => {
window.dispatchEvent(
new Event("foodSyncUpdate")
)
}
)

.on(
"postgres_changes",
{
event: "*",
schema: "public",
table: "profiles"
},
() => {
window.dispatchEvent(
new Event("profileSyncUpdate")
)
}
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
