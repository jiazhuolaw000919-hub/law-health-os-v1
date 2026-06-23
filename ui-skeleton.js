export function showSkeleton(id){
const el = document.getElementById(id)
if(!el) return
el.innerHTML = `<div class="skeleton" style="height:16px;width:120px;"></div>`
}

export function hideSkeleton(id){
const el = document.getElementById(id)
if(!el) return
el.innerHTML = ""
}
