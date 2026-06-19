export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" })
  }

  try {
    const { food, calories } = req.body

    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/food_logs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: "Bearer " + SUPABASE_KEY,
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          food,
          calories
        })
      }
    )

    const data = await response.text()

    if (!response.ok) {
      return res.status(400).json({ error: data })
    }

    return res.status(200).json({ success: true })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
