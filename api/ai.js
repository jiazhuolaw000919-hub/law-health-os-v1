export default async function handler(req, res) {

const { image } = req.body

try{

const response = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + process.env.OPENAI_API_KEY
},
body:JSON.stringify({
model:"gpt-4o-mini",
messages:[
{
role:"user",
content:[
{
type:"text",
text:"Analyze this food image. Return calories, protein, carbs, fat in JSON."
},
{
type:"image_url",
image_url:{url:image}
}
]
}
],
temperature:0.2
})
})

const data = await response.json()

res.status(200).json({
result: data.choices[0].message.content
})

}catch(e){

res.status(500).json({
error:"AI request failed"
})

}

}
