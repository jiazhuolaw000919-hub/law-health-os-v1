const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"
const SUPABASE_KEY = "YOUR_ANON_KEY"

async function getFood(date){
const res = await fetch(
SUPABASE_URL + "/rest/v1/food_logs?date=eq." + date,
{
headers:{
apikey:SUPABASE_KEY,
Authorization:"Bearer " + SUPABASE_KEY
}
}
)
return res.json()
}
