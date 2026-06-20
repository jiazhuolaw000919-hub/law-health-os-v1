export const config = {
  runtime: "nodejs"
}

let profileCache = {}

export default async function handler(req, res) {

  if (req.method === "POST") {
    try {

      const profile = req.body

      profileCache = {
        ...profile,
        bmi: calculateBMI(profile.height, profile.weight)
      }

      return res.status(200).json({
        success: true,
        profile: profileCache
      })

    } catch (err) {
      return res.status(500).json({ error: String(err) })
    }
  }

  if (req.method === "GET") {
    return res.status(200).json(profileCache)
  }

  return res.status(405).json({ error: "Method not allowed" })
}

// 🧠 BMI计算
function calculateBMI(h, w) {
  if (!h || !w) return 0
  const heightM = h / 100
  return +(w / (heightM * heightM)).toFixed(1)
}
