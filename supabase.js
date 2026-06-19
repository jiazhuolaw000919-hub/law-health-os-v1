const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"
const SUPABASE_KEY = "PASTE_YOUR_ANON_KEY"

async function insertFood(data){

return await fetch(SUPABASE_URL + "/rest/v1/food_logs",{
method:"POST",
headers:{
"Content-Type":"application/json",
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY,
Prefer:"return=minimal"
},
body:JSON.stringify(data)
})

}

async function getFoodsByDate(date){

const res = await fetch(
SUPABASE_URL + "/rest/v1/food_logs?date=eq."+date,
{
headers:{
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY
}
}
)

return await res.json()
}

async function getExerciseByDate(date){

const res = await fetch(
SUPABASE_URL + "/rest/v1/exercise_logs?date=eq."+date,
{
headers:{
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY
}
}
)

return await res.json()
}
