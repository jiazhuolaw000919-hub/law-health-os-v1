const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"
const SUPABASE_KEY = "YOUR_ANON_KEY"

async function getFoodLogs(date){

try{
const res = await fetch(
`${SUPABASE_URL}/rest/v1/food_logs?date=eq.${date}`,
{
headers:{
apikey:SUPABASE_KEY,
Authorization:"Bearer " + SUPABASE_KEY
}
}
)

if(!res.ok) return []

return await res.json()

}catch(e){
return []
}
}

async function getDailySummary(date){

try{
const res = await fetch(
`${SUPABASE_URL}/rest/v1/food_logs?date=eq.${date}`,
{
headers:{
apikey:SUPABASE_KEY,
Authorization:"Bearer " + SUPABASE_KEY
}
}
)

const data = await res.json()

let calories = 0

data.forEach(item=>{
calories += Number(item.calories || 0)
})

return {
calories
}

}catch(e){
return {calories:0}
}
}
