const SUPABASE_URL = "https://jwcgamxkwzrjnepxrvzr.supabase.co"

// ⚠️ 改成你的 anon key
const SUPABASE_KEY = "PASTE_YOUR_ANON_KEY_HERE"

async function insertFood(food, calories){

  try{

    const res = await fetch(
      SUPABASE_URL + "/rest/v1/food_logs",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "apikey": SUPABASE_KEY,
          "Authorization":"Bearer " + SUPABASE_KEY,
          "Prefer":"return=minimal"
        },
        body: JSON.stringify({
          food: food,
          calories: calories,
          created_at: new Date().toISOString()
        })
      }
    )

    return res.ok

  }catch(e){
    console.log("DB error:", e)
    return false
  }
}

async function fetchFoods(){

  const res = await fetch(
    SUPABASE_URL + "/rest/v1/food_logs?select=*",
    {
      headers:{
        "apikey": SUPABASE_KEY,
        "Authorization":"Bearer " + SUPABASE_KEY
      }
    }
  )

  return await res.json()
}
