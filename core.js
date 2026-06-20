function safe(fn, fallback){
try{
return fn()
}catch(e){
console.log("safe error:",e)
return fallback
}
}

function safeAsync(fn, fallback){
return fn().catch(e=>{
console.log("safe async error:",e)
return fallback
})
}
