const apliecibas_nr = document.querySelector("#apliecibas_nr")
const registracijas_nr = document.querySelector("#registracijas_nr")
const marka = document.querySelector("#marka")
const modelis = document.querySelector("#modelis")
const vin = document.querySelector("#vin")
const pilseta = document.querySelector("#pilseta")
const adrese = document.querySelector("#address")
const apstiprinajuma_nr = document.querySelector("#type_accept")
const tilpums = document.querySelector("#tilpums")
const degviela = document.querySelector("#degviela")
const krasa = document.querySelector("#krasa")
const sedvietas = document.querySelector("#seats")
const tips = document.querySelector("#type")
const piezimes = document.querySelector("#piezimes")
const btn = document.querySelector(".btn")
const form = document.querySelector("#form")
const letter_input = document.querySelectorAll(".letter_input")
const tabula = document.querySelector("#table")

const fetchMark = async () =>{
    const fetchData = await fetch(`http://127.0.0.1:8000/api/markas`)
    const parseData = await fetchData.json()
    console.log(parseData)
    for(let i=0; i<parseData.length; i++){
        marka.insertAdjacentHTML("beforeend", `<option value="${parseData[i].id}">${parseData[i].marka}</option>`)
    }
    const fetchCity = await fetch("http://127.0.0.1:8000/api/pilsetas")
    const parseCity = await fetchCity.json()
    for(let i=0; i<parseCity.length; i++){
      pilseta.insertAdjacentHTML("beforeend", `<option value=${parseCity[i].id}>${parseCity[i].pilseta}</option>`)
    }
    const fetchColor = await fetch(`http://127.0.0.1:8000/api/krasas`)
    const parseColor = await fetchColor.json()
    for(let i=0; i<parseColor.length;i++){
      krasa.insertAdjacentHTML("beforeend", `<option value=${parseColor[i].id}>${parseColor[i].krasa}</option>`)
    }
    const fetchType = await fetch(`http://127.0.0.1:8000/api/tipi`)
    const parseType = await fetchType.json()
    for(let i=0; i<parseType.length; i++){
      tips.insertAdjacentHTML("beforeend", `<option value=${parseType[i].id}>${parseType[i].tips}</option>`)
    }
}

fetchMark()
const fetchModel = async (model) =>{
    modelis.innerHTML = `<option disabled selected value></option>`
    console.log(model)
    const fetchData = await fetch(`http://127.0.0.1:8000/api/models/${model}`)
    const parseData = await fetchData.json()
    for(let i=0; i<parseData.length; i++){
        modelis.insertAdjacentHTML("beforeend", `<option value="${parseData[i].id}">${parseData[i].model}</option>`)
    }
}

marka.addEventListener("change", (e)=>{
    modelis.disabled=false
    fetchModel(e.target.value)
})

function inpNum(e) {
  if(e.target.value.length>=4){
    e.preventDefault()
  }
  e = e || window.event;
  var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
  var charStr = String.fromCharCode(charCode);
  if (!charStr.match(/^[0-9]+$/)) e.preventDefault();
}

form.addEventListener("submit", async (e)=>{
  e.preventDefault()
  const data = ({
    "Apliecibas_nr": apliecibas_nr.value,
    "Registracijas_nr": registracijas_nr.value,
    "Marka": marka.value,
    "Modelis": modelis.value,
    "VIN": vin.value,
    "Pilseta": pilseta.value,
    "Adrese": adrese.value,
    "Apstirpinajuma_nr": apliecibas_nr.value,
    "Tilpums": tilpums.value,
    "Degviela": degviela.value,
    "Krasa": krasa.value,
    "Sedvietas": sedvietas.value,
    "Veids": veids.value,
    "Piezīmes": piezimes.value
  })
  console.log(data)

  await fetch("http://127.0.0.1:8000/api/iela", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "iela": adrese.value,
        "pilseta_id": pilseta.value
      }
    )
  })
  await fetch("http://127.0.0.1:8000/api/turetajs", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "Apliecibas_nr": apliecibas_nr.value,
        "Registracijas_nr": registracijas_nr.value,
      }
    )
  })
  await fetch("http://127.0.0.1:8000/api/motors", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "motora_tilpums": tilpums.value,
        "degviela": degviela.value,
      }
    )
  })
  await fetch("http://127.0.0.1:8000/api/auto", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "VIN": vin.value,
        "modelis_id": modelis.value,
        "apstirpinajuma_nr": apliecibas_nr.value,
        "krasa": krasa.value,
        "sedvietas": sedvietas.value,
        "tips_id": tips.value,
        "piezimes": piezimes.value
      }
    )
  })


})
const checkVIN = (e)=>{
  if(e.key.toUpperCase()==="I" || e.key.toUpperCase()==="O" || e.key.toUpperCase()==="Q"){
    console.log("good")
    e.preventDefault()
  }
}


const getAllCars = async () =>{
  const fetchCars = await fetch(`http://127.0.0.1:8000/api/auto`)
  const parseCars = await fetchCars.json()
  parseCars.forEach(el=>{
    table.insertAdjacentHTML("beforeend",
    `<tr>
      <td>${el.VIN}</td>
      <td>${el.apstiprinajuma_nr}</td>
      <td>${el.registracijas_nr}</td>
      <td>${el.apliecibas_nr}</td>
      <td>${el.krasa}</td>
      <td>${el.sedvietas}</td>
      <td>${el.tips}</td>
      <td>${el.motora_tilpums}</td>
      <td>${el.degviela}</td>
      <td>${el.iela}</td>
      <td>${el.pilseta}</td>
      <td>${el.piezimes}</td>
      <td>${el.marka}</td>
      <td>${el.model}</td>
    </tr>`
    )
  })
}
getAllCars()