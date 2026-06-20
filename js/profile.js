// ============================
// PROFILE.JS v10.6
// ============================

// -------- CREATE PROFILE --------
function createProfile(name, gender, age, height, weight){

  let profiles = getProfiles()

  const newProfile = {
    id: Date.now().toString(),
    name,
    gender,
    age,
    height,
    weight,
    createdAt: new Date().toISOString()
  }

  profiles.push(newProfile)
  saveProfiles(profiles)
  setActiveProfile(newProfile)

  return newProfile
}

// -------- DELETE PROFILE --------
function deleteProfile(id){

  let profiles = getProfiles()

  profiles = profiles.filter(p => p.id !== id)

  saveProfiles(profiles)

  let active = getActiveProfile()

  if(active && active.id === id){

    if(profiles.length > 0){
      setActiveProfile(profiles[0])
    }else{
      setActiveProfile(null)
    }
  }
}

// -------- SWITCH PROFILE --------
function switchProfile(id){

  let profiles = getProfiles()
  let profile = profiles.find(p => p.id === id)

  if(profile){
    setActiveProfile(profile)
  }
}

// -------- CALCULATE BMI --------
function calculateBMI(height, weight){

  height = Number(height) / 100
  weight = Number(weight)

  if(!height || !weight) return 0

  return (weight / (height * height)).toFixed(1)
}
