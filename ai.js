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

function bingeDetect(calories, streak){

let risk = 0

if(calories > 2500) risk += 40
if(calories > 3000) risk += 30
if(streak >= 2) risk += 20
if(streak >= 3) risk += 30

if(risk >= 70) return "🔴 HIGH BINGE RISK"
if(risk >= 40) return "🟡 MODERATE RISK"
return "🟢 LOW RISK"
}

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

function calorieInsight(calories){

if(calories < 1500){
return "⚠️ Too low intake"
}

if(calories < 2000){
return "🟢 Balanced intake"
}

if(calories < 2500){
return "🟡 Slightly high"
}

return "🔴 Overeating risk"
}
