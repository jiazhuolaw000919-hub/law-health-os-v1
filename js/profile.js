function getActiveProfile(){
return JSON.parse(localStorage.getItem("activeProfile")) || {
id:"guest",
name:"Guest"
}
}

function getProfiles(){
return JSON.parse(localStorage.getItem("profiles") || "[]")
}

function setActiveProfile(p){
localStorage.setItem("activeProfile", JSON.stringify(p))
}
