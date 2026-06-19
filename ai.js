function calcScore(cal, burn){

let score = 100

score -= Math.abs(cal - 1800) * 0.03

if(cal > 2200) score -= 25
if(cal > 2600) score -= 40
if(cal < 1200) score -= 10

score += burn * 0.05

return Math.max(0, Math.min(100, score))
}

function status(score){
if(score >= 80) return "🟢 Healthy"
if(score >= 50) return "🟡 Normal"
return "🔴 Risk"
}

function workoutAdvice(cal){
if(cal > 2600) return "🔥 40min walk + HIIT"
if(cal > 2200) return "🚶 30min walk"
return "🧘 light workout"
}
