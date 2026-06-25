// api/analyze-food.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfiguration: OPENAI_API_KEY not set in environment' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
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
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI error ' + response.status);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
