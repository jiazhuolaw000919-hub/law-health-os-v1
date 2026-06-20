// GLOBAL STATE
export function getActiveProfile(){
return JSON.parse(localStorage.getItem("activeProfile")) || {
id:"guest",
name:"Guest"
}
}

// unified fetch
export async function getLogs(date){
const p = getActiveProfile()

if(typeof getFoodLogs !== "undefined"){
return await getFoodLogs(date, p.id) || []
}

return []
}

// unified save
export async function saveLog(data){
const p = getActiveProfile()

if(typeof saveFood !== "undefined"){
return await saveFood({
...data,
userId:p.id
})
}
}
