let search = document.querySelector('#search')
let place = document.querySelector('#city-name')
let currentTemp = document.querySelector('#current-temp')
let city = document.querySelector('#city-name')
let date = document.querySelector('#date')
let currentCondition = document.querySelector('#current-condition')
let highLow = document.querySelector('#high-low')
let feels_like = document.querySelector('#feels-like')
let wind = document.querySelector('#wind')
let humidity = document.querySelector('#humidity')
let pressure = document.querySelector('#pressure')
let visibility = document.querySelector('#visibility')
let countryId = document.querySelector('#countryId')
let description = document.querySelector('#description')
let icon = document.querySelector('#icon')
let body = document.querySelector('body')
let app = document.querySelector('.App')

let cityName = 'Baku'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2eb730b5a700d8bb00ab77eb961201d6`

window.addEventListener('DOMContentLoaded', () => {
  getData(url).then( parameter =>
    setParameters(parameter)
)
});


search.addEventListener('change', (e)=> {
    cityName = e.target.value
    e.target.value = ''
    url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2eb730b5a700d8bb00ab77eb961201d6`

    getData(url).then( parameter =>
      setParameters(parameter)
  )
  })

const getData =  async (url) => {
  let response = await fetch(url)
  let data = await response.json()
  let parameters = data
  let parameter = {} 
  const {country} = parameters.sys
  const {feels_like} = parameters.main
  const {humidity} = parameters.main
  const {pressure} = parameters.main
  const {temp} = parameters.main
  const {wind} = parameters
  const {visibility} = parameters
  const {description} = parameters.weather[0]
  const {name} = parameters

  
  parameter.feels_like = feels_like
  parameter.humidity = humidity
  parameter.pressure = pressure
  parameter.temp = temp
  parameter.wind = wind.speed
  parameter.visibility = visibility
  parameter.description = description
  parameter.country = country
  parameter.name = name
  
  return parameter
}




function setParameters(parameter) {
    currentTemp.textContent = (parameter.temp-273.15).toFixed(0)
    feels_like.textContent = (parameter.feels_like - 273.15).toFixed(0)
    wind.textContent = parameter.wind + ' m/s'
    humidity.textContent = parameter.humidity + ' %'
    pressure.textContent  = parameter.pressure
    visibility.textContent = (parameter.visibility / 1000) + 'km'
    description.textContent = parameter.description
    countryId.textContent = parameter.country
    place.textContent = parameter.name
    setDate()
    setIcon(parameter)
}

function setDate(weekDay,day,month) {
  let currentDate = new Date()
  // get day of the week
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  weekDay = days[currentDate.getDay()]
  // get day of the month
  day = currentDate.getDate()
  //get current month name
  let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"]
  month = monthNames[currentDate.getMonth()]
  
  date.textContent = `${weekDay},  ${month} ${day}`

}

function setIcon(parameter) {
  if(parameter.description.includes('rain')) {
  icon.classList.add('wi-rain')
  body.style.backgroundImage = 'url(./images/rainy.jpg)'
  app.setAttribute('class', 'App rain')
  }
  
  else if(parameter.description.includes('clouds')){
  icon.classList.add('wi-cloudy')
  body.style.backgroundImage = 'url(./images/cloudy.jpg)'
  app.setAttribute('class', 'App clouds')
  }
  
  else if(parameter.description.includes('clear')){
  icon.classList.add('wi-day-sunny')
  body.style.backgroundImage = 'url(./images/clear.jpg)'
  app.setAttribute('class', 'App clear')
  }
  
  else if(parameter.description.includes('hot')){
  icon.classList.add('wi-hot')
  body.style.backgroundImage = 'url(./images/windy.jpg)'
  
  }


}