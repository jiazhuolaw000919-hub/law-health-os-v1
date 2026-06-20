const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZXZjZnlobmx0dHpkaXlsZnJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjgzNTIsImV4cCI6MjA5NzQwNDM1Mn0.RNWddp1TuYwVAHZlWfdq4iGdgiqNU9DKgAi8pnC6ULs"

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
