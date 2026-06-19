const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"
const SUPABASE_KEY = "YOUR_ANON_KEY"

async function getFood(date){

try{

const res = await fetch(
SUPABASE_URL+"/rest/v1/food_logs?date=eq."+date,
{
headers:{
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY
}
}
)

if(!res.ok) return []

return await res.json()

}catch(e){
console.log("Supabase error",e)
return []
}
}
