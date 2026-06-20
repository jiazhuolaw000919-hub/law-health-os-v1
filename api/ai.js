export const config = {
  runtime: "nodejs"
}

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {

    const { image } = req.body

    if (!image) {
      return res.status(400).json({ error: "No image provided" })
    }

    // 🧠 MOCK AI (之后可以接 GPT / Vision API)
    const result = {
      food: "Chicken Rice",
      calories: 650,
      protein: 35,
      carbs: 70,
      fat: 15,
      confidence: 0.92
    }

    return res.status(200).json({ result })

  } catch (err) {
    return res.status(500).json({
      error: String(err),
      result: {
        food: "unknown",
        calories: 0
      }
    })
  }
}
