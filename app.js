function setActive(page){

const map = {
home:"nav-home",
calendar:"nav-calendar",
food:"nav-food",
workout:"nav-workout",
shopping:"nav-shopping",
report:"nav-report"
}

Object.values(map).forEach(id=>{
const el = document.getElementById(id)
if(el) el.classList.remove("active")
})

const active = document.getElementById(map[page])
if(active) active.classList.add("active")
}
