function calculateHealthScore(calories){

if(calories < 1800) return 90
if(calories < 2200) return 80
if(calories < 2600) return 60
if(calories < 3000) return 40
return 20
}

function getAdvice(calories){

if(calories > 3000) return "Reduce carbs + walk 30min"
if(calories > 2500) return "Light dinner"
return "Good balance"
}
