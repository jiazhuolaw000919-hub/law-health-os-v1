/* =========================
   PROFILE PAGE v10.6
========================= */

function renderProfiles(){

  const list = document.getElementById("profileList")
  if(!list) return

  list.innerHTML = ""

  getProfiles().forEach(p => {

    const div = document.createElement("div")
    div.className = "card"

    div.innerHTML = `
      <b>${p.name}</b>
      <p>ID: ${p.id}</p>

      <button onclick="setActiveProfileById('${p.id}')">Select</button>
      <button onclick="removeProfile('${p.id}')">Delete</button>
    `

    list.appendChild(div)
  })
}

/* ---------- SELECT ---------- */
function setActiveProfileById(id){
  switchProfile(id)
  renderProfiles()
  alert("Switched profile")
}

/* ---------- DELETE ---------- */
function removeProfile(id){
  deleteProfile(id)
  renderProfiles()
}

/* ---------- CREATE ---------- */
function createNewProfile(){

  const name = document.getElementById("name").value

  if(!name) return alert("Enter name")

  createProfile({
    name
  })

  renderProfiles()
}

/* ---------- INIT ---------- */
renderProfiles()
