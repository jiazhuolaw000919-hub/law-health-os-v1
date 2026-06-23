import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

export const supabase = createClient(
"https://jqevcfyhnlttzdiylfrh.supabase.co",
"sb_publishable_GMM5PgeRzudbeh4aHK-1pw_lQ6TQnVe"
)

/* =========================
GLOBAL USER STATE
========================= */
let currentUser = null

export function setUser(user){
currentUser = user
localStorage.setItem("activeProfile", JSON.stringify(user))
}

export function getUser(){
return currentUser ||
JSON.parse(localStorage.getItem("activeProfile")) ||
{ id:"guest", name:"Guest" }
}

/* =========================
PROFILE SYNC (REAL CLOUD)
========================= */
export async function loadProfile(id){

let { data } = await supabase
.from("profiles")
.select("*")
.eq("id", id)
.single()

if(data){
setUser(data)
return data
}

return getUser()
}

export async function upsertProfile(profile){

let { data } = await supabase
.from("profiles")
.upsert(profile)
.select()

if(data?.[0]){
setUser(data[0])
}

return data
}

/* =========================
REALTIME ENGINE
========================= */
export function initRealtime(){

supabase.channel("global-sync")

.on("postgres_changes",{
event:"*",
schema:"public",
table:"profiles"
},(payload)=>{

setUser(payload.new)
window.dispatchEvent(new Event("profile-update"))
})

.on("postgres_changes",{
event:"*",
schema:"public",
table:"food_logs"
},()=>{

window.dispatchEvent(new Event("food-update"))
})

.subscribe()
}
