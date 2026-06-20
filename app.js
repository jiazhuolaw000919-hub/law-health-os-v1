// =====================
// v9 GLOBAL USER SYSTEM
// =====================

function getCurrentUser(){
  return JSON.parse(localStorage.getItem("currentUser")) || null
}

function setCurrentUser(user){
  localStorage.setItem("currentUser", JSON.stringify(user))
}

// 多用户列表
function getAllUsers(){
  return JSON.parse(localStorage.getItem("users")) || []
}

function saveAllUsers(users){
  localStorage.setItem("users", JSON.stringify(users))
}

// 创建/切换 profile
function saveProfile(profile){

  let users = getAllUsers()

  let existing = users.find(u => u.id === profile.id)

  if(existing){
    Object.assign(existing, profile)
  }else{
    users.push(profile)
  }

  saveAllUsers(users)
  setCurrentUser(profile)
}

// 获取当前 profile
function getProfile(){
  return getCurrentUser()
}

// 计算 BMI
function calculateBMI(height, weight){
  if(!height || !weight) return 0
  return (weight / ((height/100) ** 2)).toFixed(1)
}

function getActiveProfile(){
return JSON.parse(localStorage.getItem("activeProfile")) || {id:"guest", name:"Guest"}
}
