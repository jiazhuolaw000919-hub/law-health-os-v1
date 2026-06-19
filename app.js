function showLoading(id){
document.getElementById(id).innerHTML =
"<div class='loading'>Loading...</div>"
}

function showError(id,msg){
document.getElementById(id).innerHTML =
"<div class='loading'>⚠️ " + msg + "</div>"
}

async function safeFetch(fn){

try{
return await fn()
}catch(e){
console.error("API Error:",e)
return null
}
}
