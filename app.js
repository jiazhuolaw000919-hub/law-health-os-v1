function setActive(page){

const pages = {
home:"nav-home",
calendar:"nav-calendar",
food:"nav-food",
workout:"nav-workout",
shopping:"nav-shopping",
report:"nav-report"
}

Object.values(pages).forEach(id=>{
const el=document.getElementById(id)
if(el) el.classList.remove("active")
})

const current=document.getElementById(pages[page])

if(current){
current.classList.add("active")
}
}

function todayString(){
return new Date().toISOString().split("T")[0]
}

function safeNumber(v){
const n=Number(v)
return isNaN(n)?0:n
}
