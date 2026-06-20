async function analyzeFoodImage(base64Image){

const response = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer YOUR_OPENAI_API_KEY"
},
body:JSON.stringify({
model:"gpt-4o-mini",
messages:[
{
role:"user",
content:[
{type:"text", text:"Analyze this food image. Estimate calories, protein, carbs, fat. Return JSON."},
{type:"image_url", image_url:{url:base64Image}}
]
}
],
temperature:0.2
})
})

const data = await response.json()

return data.choices[0].message.content
}
