const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const addressinput = process.argv[2]

geocode(addressinput,(error,{latitude, longitude, location} = {}) =>{
    if (!addressinput){
        return console.log('Please input a location.')
    }
    if (error) {
       return console.log(error)
    }

    // console.log('Error',  error)
    // console.log('Data', data)
    forecast(latitude,longitude, (error, forecastData) => {
        if (error){
            return console.log(error)
        }
        console.log(location)
        console.log(forecastData)

        // console.log('Error', error)
        // console.log('Data', data)
    })
})





// console.log('Starting')

// setTimeout(() => { //despues de cierto tiempo ocurre la funcion
//     console.log('2 second Timer')
// }, 2000)

// setTimeout(() =>{
//     console.log('0 second timer')
// }, 0)

// console.log('Stopping')
