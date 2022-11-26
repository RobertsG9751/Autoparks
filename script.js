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
const veids = document.querySelector("#type")
const piezimes = document.querySelector("#piezimes")
const btn = document.querySelector(".btn")
const form = document.querySelector("#form")
const letter_input = document.querySelectorAll(".letter_input")

const fetchMark = async () =>{
    const fetchData = await fetch("https://car-api2.p.rapidapi.com/api/makes", {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "a9d315108fmsh8891d70e3867b8ep111e50jsne953828c35eb",
          "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
        },
      })
    const parseData = await fetchData.json()
    for(let i=0; i<parseData.data.length; i++){
        marka.insertAdjacentHTML("beforeend", `<option value="${parseData.data[i].name}">${parseData.data[i].name}</option>`)
    }

}
fetchMark()
const fetchModel = async (model) =>{
    modelis.innerHTML = `<option disabled selected value></option>`
    const fetchData = await fetch(
        `https://car-api2.p.rapidapi.com/api/models?make=${model}&sort=id&direction=asc&year=2020&verbose=yes`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "a9d315108fmsh8891d70e3867b8ep111e50jsne953828c35eb",
            "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
          },
        }
      )
    const parseData = await fetchData.json()
    for(let i=0; i<parseData.data.length; i++){
        modelis.insertAdjacentHTML("beforeend", `<option value="${parseData.data[i].name}">${parseData.data[i].name}</option>`)
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

form.addEventListener("submit", (e)=>{
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
  alert(`Jūsu dati: \n ${JSON.stringify(data)} ! \n\nNosūtīt uz datubāzi - `)
})
const checkVIN = (e)=>{
  if(e.key.toUpperCase()==="I" || e.key.toUpperCase()==="O" || e.key.toUpperCase()==="Q"){
    console.log("good")
    e.preventDefault()
  }
}
