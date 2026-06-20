export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({
error:"Method not allowed"
})
}

try{

return res.status(200).json({
result:{
food:"Chicken Rice",
calories:650,
protein:35,
carbs:70,
fat:15
}
})

}catch(err){

return res.status(500).json({
error:String(err)
})

}

}
