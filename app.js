let totalCalories = 0

function estimate(food){
  food = food.toLowerCase()

  if(food.includes("chicken")) return 600
  if(food.includes("milo")) return 180
  if(food.includes("teh tarik")) return 250
  if(food.includes("rice")) return 500
  if(food.includes("bread")) return 150

  return 300
}

function ipohAI(food){
  food = food.toLowerCase()

  if(food.includes("milo")) return "Reduce sugar (Ipoh style)"
  if(food.includes("teh tarik")) return "Less condensed milk"
  if(food.includes("chicken")) return "Steam instead of fried"
  if(food.includes("rice")) return "Reduce rice portion"

  return "Balanced Ipoh diet"
}
