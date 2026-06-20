function calculateHealthScore(calories,burn){

let score = 100

score -= Math.abs(calories - 1800) * 0.03

if(calories > 2200) score -= 15
if(calories > 2600) score -= 25

score += burn * 0.05

if(score > 100) score = 100
if(score < 0) score = 0

return Math.round(score)
}

function healthLabel(score){

if(score >= 80) return "🟢 Healthy"
if(score >= 50) return "🟡 Moderate"
return "🔴 Risk"
}
