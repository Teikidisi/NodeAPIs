const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieWVldHk2NjciLCJhIjoiY2t0cDhoYml3MGs5bjMycDN2ZTlyaGF6ayJ9.2jQoB01FYbV_9aefEgp3Vw&limit=1'
    request({url:url,json:true}, (error,response) => {
        const shortcut = response.body.features[0]
        if (error){
            callback('Unable to connect to location services.', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: shortcut.center[1],
                longitude: shortcut.center[0],
                location: shortcut.place_name
            })
        }
    })

}


module.exports = geocode