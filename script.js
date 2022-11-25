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
btn.addEventListener("click", ()=>{
  console.log(pilseta)
})