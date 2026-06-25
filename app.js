/* =========================
GLOBAL PROFILE ENGINE v10.6 (FIXED + COMPAT LAYER)
========================= */

const STORAGE_KEYS = {
  profiles: "profiles",
  activeProfile: "activeProfile"
}

/* =========================
SAFE GET
========================= */

function getProfiles(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.profiles)) || []
  }catch(e){
    return []
  }
}

function getActiveProfile(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.activeProfile)) || null
  }catch(e){
    return null
  }
}

/* =========================
SAFE SET
========================= */

function setProfiles(profiles){
  localStorage.setItem(
    STORAGE_KEYS.profiles,
    JSON.stringify(profiles)
  )
}

function setActiveProfile(profile){
  localStorage.setItem(
    STORAGE_KEYS.activeProfile,
    JSON.stringify(profile)
  )

  /* 🔥 FIX: notify all pages */
  window.dispatchEvent(
    new Event("profileSyncUpdate")
  )
}

/* =========================
INIT SYSTEM
========================= */

function ensureProfileSystem(){
  let profiles = getProfiles()

  if(!profiles || profiles.length === 0){
    const defaultProfile = {
      id: "guest",
      name: "Guest",
      height: 170,
      weight: 70
    }
    profiles = [defaultProfile]
    setProfiles(profiles)
    setActiveProfile(defaultProfile)
  }

  if(!getActiveProfile()){
    setActiveProfile(profiles[0])
  }
}

/* =========================
CREATE PROFILE
========================= */

function createProfile(profile){
  let profiles = getProfiles()

  const newProfile = {
    id: Date.now().toString(),
    height: 170,
    weight: 70,
    ...profile
  }

  profiles.push(newProfile)
  setProfiles(profiles)
  setActiveProfile(newProfile)

  return newProfile
}

/* =========================
DELETE PROFILE
========================= */

function deleteProfile(id){
  let profiles = getProfiles().filter(p => p.id !== id)
  setProfiles(profiles)

  let active = getActiveProfile()
  if(active && active.id === id){
    setActiveProfile(
      profiles[0] || {
        id: "guest",
        name: "Guest",
        height: 170,
        weight: 70
      }
    )
  }
}

/* =========================
SWITCH PROFILE
========================= */

function switchProfile(id){
  let profile = getProfiles().find(p => p.id === id)
  if(profile){
    setActiveProfile(profile)
  }
}

/* =========================
UI COMPAT LAYER (CRITICAL FIX)
========================= */

/* 🔥 FIX 1: app.js now supports setActive() used in food.html */
function setActive(page){
  try{
    localStorage.setItem("activePage", page)
    window.dispatchEvent(
      new Event("pageChange")
    )
  }catch(e){
    console.log(e)
  }
}

/* 🔥 FIX 2: ProfileEngine compatibility (dashboard + food pages) */
const ProfileEngine = {
  render(targetId){
    const el = document.getElementById(targetId)
    if(!el) return

    const p = getActiveProfile()
    if(!p){
      el.innerText = "Guest"
      return
    }

    if(targetId === "activeProfile"){
      el.innerText = "👤 Active: " + (p.name || "Guest")
    }else{
      el.innerText = p.name || "Guest"
    }
  },

  getActiveProfile,
  getProfiles,
  switchProfile,
  deleteProfile,
  createProfile
}

/* =========================
GLOBAL EXPORTS (IMPORTANT)
========================= */

window.getProfiles = getProfiles
window.getActiveProfile = getActiveProfile
window.setProfiles = setProfiles
window.setActiveProfile = setActiveProfile

window.createProfile = createProfile
window.deleteProfile = deleteProfile
window.switchProfile = switchProfile

window.ProfileEngine = ProfileEngine
window.setActive = setActive

/* =========================
AUTO INIT
========================= */

ensureProfileSystem()
