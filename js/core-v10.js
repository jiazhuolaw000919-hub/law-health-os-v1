// ===============================
// v10.5 GLOBAL ENGINE (FINAL)
// ===============================

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

// ================= QUERY ENGINE =================

function getLogsByDate(date, type, userId){

return getLogs().filter(l=>{
return (!date || l.date === date) &&
(!type || l.type === type) &&
(!userId || l.userId === userId)
})

}

// ================= AI ENGINE =================

function getTodayCalories(userId){

const today = new Date().toISOString().split("T")[0]

return getLogsByDate(today, "food", userId)
.reduce((sum,f)=>sum + (f.calories||0),0)

}

function getWeeklyCalories(userId){

let total = 0

for(let i=0;i<7;i++){
let d = new Date()
d.setDate(d.getDate()-i)
let date = d.toISOString().split("T")[0]

total += getLogsByDate(date,"food",userId)
.reduce((s,f)=>s+(f.calories||0),0)
}

return total
}

function getHealthScore(cal){

if(cal < 1800) return 85
if(cal < 2500) return 70
if(cal < 3000) return 50
return 30
}

function getAdvice(cal){

if(cal < 1800) return "Eat more protein"
if(cal < 2500) return "Balanced diet"
if(cal < 3000) return "Reduce carbs"
return "High risk: reduce intake"
}

return {
getProfiles,
getActiveProfile,
setActiveProfile,
getLogs,
saveLog,
getLogsByDate,
getTodayCalories,
getWeeklyCalories,
getHealthScore,
getAdvice
}
}

window.V10 = V10()
