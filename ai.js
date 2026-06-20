function getBMI(weight,height){
return weight / ((height/100) ** 2)
}

function riskLevel(cal, bmi){
if(cal > 3000 && bmi > 27) return "VERY HIGH"
if(cal > 2800) return "HIGH"
if(cal > 2400) return "MEDIUM"
return "LOW"
}

// 📈 weight prediction (simple trend model)
function predictWeight(currentWeight, avgCal){

let change = (avgCal - 2200) * 0.01

return (currentWeight + change).toFixed(1)
}

function aiSuggestion(cal, bmi){

if(cal > 3000){
return "🚨 High intake: cut sugar + carbs immediately"
}

if(bmi > 27){
return "⚠️ BMI high: add 20–30 min cardio daily"
}

if(cal > 2500){
return "🍽 Reduce dinner portion slightly"
}

return "✅ Good balance, maintain routine"
}
