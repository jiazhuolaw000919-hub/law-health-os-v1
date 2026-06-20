function calculateHealthScore(calories, burn){

let score = 100

score -= Math.abs(calories - 1800) * 0.03

if(calories > 2200) score -= 15
if(calories > 2600) score -= 25
if(calories < 1200) score -= 20

score += burn * 0.05

if(score > 100) score = 100
if(score < 0) score = 0

return Math.round(score)
}

function bingeDetect(calories){

if(calories > 2800) return "🔴 Binge Risk"
if(calories > 2400) return "🟡 High Intake"
return "🟢 Normal"
}

function weeklyScore(data){

let total = 0

data.forEach(d=>{
total += calculateHealthScore(d.calories,d.burn||0)
})

return Math.round(total / data.length)
}

function monthlyScore(data){
return weeklyScore(data)
}

function generateShoppingList(calories){

if(calories < 1600){
return ["Eggs","Chicken","Oats","Vegetables"]
}

if(calories > 2400){
return ["Salad","Lean Protein","Low sugar drinks"]
}

return ["Balanced diet","Fruit","Rice"]
}

function aiCoach(calories, burn, score){

if(score >= 80){
return "🟢 Good job! Keep your routine."
}

if(score >= 50){
return "🟡 Try more protein + light exercise today."
}

return "🔴 High risk day. Reduce carbs + go for a walk."
}
