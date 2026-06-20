function getAllFoods(){
return JSON.parse(localStorage.getItem("foods") || "[]")
}

function saveFood(data){
let all = getAllFoods()
all.push(data)
localStorage.setItem("foods", JSON.stringify(all))
}

function getFoodLogs(date, userId){
return getAllFoods().filter(f =>
f.date === date &&
(!userId || f.userId === userId)
)
}
