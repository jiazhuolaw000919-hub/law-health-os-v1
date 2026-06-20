/* =========================
   GLOBAL PROFILE ENGINE v10.6
========================= */

const STORAGE_KEYS = {
  profiles: "profiles",
  activeProfile: "activeProfile"
}

/* ---------- GET ---------- */
function getProfiles(){
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.profiles)) || []
}

function getActiveProfile(){
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.activeProfile)) || null
}

/* ---------- SET ---------- */
function setProfiles(profiles){
  localStorage.setItem(STORAGE_KEYS.profiles, JSON.stringify(profiles))
}

function setActiveProfile(profile){
  localStorage.setItem(STORAGE_KEYS.activeProfile, JSON.stringify(profile))
}

/* ---------- INIT ---------- */
function ensureProfileSystem(){

  let profiles = getProfiles()

  if(profiles.length === 0){
    const defaultProfile = {
      id: "guest",
      name: "Guest"
    }

    profiles.push(defaultProfile)
    setProfiles(profiles)
    setActiveProfile(defaultProfile)
  }

  if(!getActiveProfile()){
    setActiveProfile(profiles[0])
  }
}

/* ---------- CREATE ---------- */
function createProfile(profile){

  let profiles = getProfiles()

  profiles.push({
    id: Date.now().toString(),
    ...profile
  })

  setProfiles(profiles)
}

/* ---------- DELETE ---------- */
function deleteProfile(id){

  let profiles = getProfiles().filter(p => p.id !== id)
  setProfiles(profiles)

  let active = getActiveProfile()

  if(active && active.id === id){
    setActiveProfile(profiles[0] || null)
  }
}

/* ---------- SWITCH ---------- */
function switchProfile(id){

  let profile = getProfiles().find(p => p.id === id)
  if(profile){
    setActiveProfile(profile)
  }
}

/* ---------- AUTO INIT ---------- */
ensureProfileSystem()
