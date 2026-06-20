const SUPABASE_URL =
"https://jwcgamxkwzrjnepxrvzr.supabase.co"

const SUPABASE_KEY =
"REPLACE_WITH_YOUR_SB_PUBLISHABLE_KEY"

async function getFoodLogs(date){

try{

const res = await fetch(
`${SUPABASE_URL}/rest/v1/food_logs?date=eq.${date}`,
{
headers:{
apikey:SUPABASE_KEY,
Authorization:`Bearer ${SUPABASE_KEY}`
}
}
)

if(!res.ok){
return []
}

return await res.json()

}catch(err){

console.log(err)
return []

}
}

async function insertFoodLog(payload){

try{

return await fetch(
`${SUPABASE_URL}/rest/v1/food_logs`,
{
method:"POST",
headers:{
apikey:SUPABASE_KEY,
Authorization:`Bearer ${SUPABASE_KEY}`,
"Content-Type":"application/json",
Prefer:"return=minimal"
},
body:JSON.stringify(payload)
}
)

}catch(err){

console.log(err)

}
}

async function getWorkoutLogs(date){

try{

const res = await fetch(
`${SUPABASE_URL}/rest/v1/workout_logs?date=eq.${date}`,
{
headers:{
apikey:SUPABASE_KEY,
Authorization:`Bearer ${SUPABASE_KEY}`
}
}
)

if(!res.ok){
return []
}

return await res.json()

}catch(err){

console.log(err)
return []

}
}

async function insertWorkoutLog(payload){

try{

return await fetch(
`${SUPABASE_URL}/rest/v1/workout_logs`,
{
method:"POST",
headers:{
apikey:SUPABASE_KEY,
Authorization:`Bearer ${SUPABASE_KEY}`,
"Content-Type":"application/json",
Prefer:"return=minimal"
},
body:JSON.stringify(payload)
}
)

}catch(err){

console.log(err)

}
}
