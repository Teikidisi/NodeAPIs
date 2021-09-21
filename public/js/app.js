console.log('Client side js is loaded.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input') //al input searchbar lo convierte en string para poder usarlo
const messageOne = document.querySelector('#message-1') //id = message-1
const messageTwo = document.querySelector('#message-2')
// cambiará la webpage con los strings que le digamos, los <p> especificos seran afectados
messageOne.textContent = 'Accessing location & weather data'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //evita que se refresque la pagina cada input

    const location = search.value
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => { //al response le hacemos parse a json y lo guardamos en data
        if (data.error){ //data es un callback por lo que usa los parametros de las demas funciones previas, tiene acceso a location, forecast, address y error
            console.log('Error accessing the data '+data.error)
            messageOne.textContent = 'Error accessing the data. '+data.error
        } else {
            console.log(data.forecast.Temperature+ ' degrees')
            console.log(data.location)
            messageTwo.textContent = data.forecast.Temperature+' degrees. Real feel: '+data.forecast['Real feel']+' degrees'
            messageOne.textContent = data.location
        }
    })
})
})
