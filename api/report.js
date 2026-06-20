export const config = {
  runtime: "nodejs"
}

export default async function handler(req, res) {

  try {

    // mock data（之后接 Supabase）
    const calories = 2200
    const burn = 300

    const score = Math.max(0, 100 - (calories - burn) / 30)

    let status = "Healthy"
    if (score < 50) status = "Warning"
    if (score < 30) status = "Danger"

    return res.status(200).json({
      calories,
      burn,
      score: Math.round(score),
      status,
      insight: generateInsight(calories, burn)
    })

  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}

function generateInsight(cal, burn) {

  const net = cal - burn

  if (net > 2000) return "High intake detected, reduce carbs"
  if (net > 1500) return "Moderate surplus, light exercise recommended"
  return "Balanced routine, keep going"
}
