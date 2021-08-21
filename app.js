
//consts
const inputText = document.getElementById('input-text')
const countryName = document.getElementById('countryName')
const confirmedAll = document.getElementById('confirmed-all')
const deathsAll = document.getElementById('deathsAll')
const recoveredAll = document.getElementById('recoveredAll')
const activeAll = document.getElementById('activeAll')
const api = `https://api.covid19api.com/total/country/${inputText.value}`
const form = document.getElementById('form')
const flagImg = document.querySelector('.flag-img')


//form event
form.addEventListener('submit', function (e) {
  e.preventDefault()
  const country = inputText.value
  getCovidREsult(country)
  
})


//random country function
function randomCountry(){
  randomCountryApi = `https://restcountries.eu/rest/v2/all`

  fetch(randomCountryApi).then(function(data){
    return data.json()
  }).then(getRandom)
  
  function getRandom(newData){
    const randomNumber = Math.floor(Math.random()*250)
    const country = newData[randomNumber].name
    getCovidREsult(country)
  }

}


//har yangilanganda random davlatni chiqarib turish uchun
randomCountry()


//result function
function getCovidREsult(country){
  const api = `https://api.covid19api.com/live/country/${country}/status/confirmed`

  fetch(api)
    .then(function (data) {
      return data.json()
    })
    .then(getResult)
}

// get result function
function getResult(newData) {
  const info = newData[newData.length - 1]
  countryName.textContent = info.Country
  confirmedAll.textContent = info.Confirmed
  deathsAll.textContent = info.Deaths
  recoveredAll.textContent = info.Recovered
  activeAll.textContent = info.Active
  flagImg.src = `https://www.countryflags.io/${info.CountryCode}/shiny/64.png`
}
