function calculateHealthScore(calories, burn){

let score = 100

score -= Math.abs(calories - 1800) * 0.03

if(calories > 2200) score -= 15
if(calories > 2600) score -= 25
if(calories < 1200) score -= 20 // 🧠 too low = unhealthy

score += burn * 0.05

if(score > 100) score = 100
if(score < 0) score = 0

return Math.round(score)
}

// 🧠 暴饮暴食检测
function bingeDetect(calories){

if(calories > 2800) return "🔴 Binge Risk"
if(calories > 2400) return "🟡 High Intake"
return "🟢 Normal"
}

// 📊 Weekly Score
function weeklyScore(data){

let total = 0

data.forEach(d=>{
total += calculateHealthScore(d.calories, d.burn || 0)
})

return Math.round(total / data.length)
}

// 📊 Monthly Score
function monthlyScore(data){
return weeklyScore(data)
}

// 🛒 AI Shopping List
function generateShoppingList(calories){

if(calories < 1500){
return ["Chicken Breast", "Eggs", "Oats"]
}

if(calories > 2500){
return ["Vegetables", "Low sugar drinks", "Lean protein"]
}

return ["Balanced groceries", "Fruits", "Rice"]
}
