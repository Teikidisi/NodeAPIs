const request = require('request')

const forecast=(latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=e6d01e5f2745d43e268f956454c9c113&query='+latitude+','+longitude+'&units=m'
    request({url,json:true}, (error,response) => {
        const {temperature, feelslike, humidity} = response.body.current
        if (error) {
            callback('Unable to connect to weather services.', undefined)
        } else if (response.body.error){
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,{Humidity: humidity,Temperature: temperature, 'Real feel': feelslike, Sky: response.body.current.weather_descriptions[0]})
            
        }
    })

}

module.exports = forecast