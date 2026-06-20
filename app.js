function setActive(page){

const map={
home:"nav-home",
cal:"nav-cal",
food:"nav-food",
workout:"nav-workout",
shop:"nav-shop",
report:"nav-report"
}

Object.values(map).forEach(id=>{
document.getElementById(id)?.classList.remove("active")
})

document.getElementById(map[page])?.classList.add("active")
}
