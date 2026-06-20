// ============================
// APP.JS v10.6 CORE
// ============================

// ---------- PROFILE CORE ----------
function getProfiles(){
  return JSON.parse(localStorage.getItem("profiles")) || []
}

function getActiveProfile(){
  return JSON.parse(localStorage.getItem("activeProfile")) || null
}

function setActiveProfile(profile){
  localStorage.setItem("activeProfile", JSON.stringify(profile))
}

// ---------- SAFE SAVE ----------
function saveProfiles(profiles){
  localStorage.setItem("profiles", JSON.stringify(profiles))
}

// ---------- FOOD STORAGE WRAPPER ----------
async function saveFood(data){
  let foods = JSON.parse(localStorage.getItem("foods")) || []
  foods.push(data)
  localStorage.setItem("foods", JSON.stringify(foods))
}

// ---------- GET FOOD LOGS (MULTI PROFILE SAFE) ----------
async function getFoodLogs(date){

  let foods = JSON.parse(localStorage.getItem("foods")) || []

  const profile = getActiveProfile()

  return foods.filter(f =>
    f.date === date &&
    (!f.userId || !profile || f.userId === profile.id)
  )
}

// ---------- HEALTH SCORE ----------
function calculateHealthScore(calories, target=2000){
  let diff = target - calories
  return Math.max(0, Math.min(100, 50 + diff/20))
}

// ---------- NAV ACTIVE ----------
function setActive(page){
  localStorage.setItem("activePage", page)
}
