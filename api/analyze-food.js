// api/analyze-food.js
export default async function handler(req, res) {
  // 只允许 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image } = req.body;  // 前端会发送 { image: "base64..." }
    if (!image) throw new Error('No image provided');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`  // 从 Vercel 环境变量读取
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Analyze food images. Return only JSON: {"foods":[{"food":"...","calories":...,"protein":...,"carbs":...,"fat":...}],"totalCalories":...}'
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'What food is this? Return nutrition JSON.' },
              { type: 'image_url', image_url: { url: image } }
            ]
          }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'OpenAI error');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
