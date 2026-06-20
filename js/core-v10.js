// ===========================
// v10 GLOBAL ENGINE (CORE)
// ===========================

function V10(){

const KEY = {
profiles:"profiles",
active:"activeProfile",
logs:"globalLogs"
}

// ================= PROFILE =================

function getProfiles(){
return JSON.parse(localStorage.getItem(KEY.profiles)) || []
}

function getActiveProfile(){
return JSON.parse(localStorage.getItem(KEY.active)) || {id:"guest",name:"Guest"}
}

function setActiveProfile(profile){
localStorage.setItem(KEY.active, JSON.stringify(profile))
}

// ================= LOG SYSTEM =================

function getLogs(){
return JSON.parse(localStorage.getItem(KEY.logs)) || []
}

function saveLog(entry){

let logs = getLogs()

logs.push({
...entry,
timestamp: Date.now()
})

localStorage.setItem(KEY.logs, JSON.stringify(logs))
}

// ================= FILTER ENGINE =================

function getLogsByDate(date, type, userId){

return getLogs().filter(l=>{
return (!date || l.date === date) &&
(!type || l.type === type) &&
(!userId || l.userId === userId)
})

}

// ================= TODAY SUMMARY =================

function getTodayCalories(userId){

const today = new Date().toISOString().split("T")[0]

return getLogsByDate(today, "food", userId)
.reduce((sum,f)=>sum + (f.calories||0),0)

}

return {
getProfiles,
getActiveProfile,
setActiveProfile,
getLogs,
saveLog,
getLogsByDate,
getTodayCalories
}
}

window.V10 = V10()
