const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//use and define paths to use with express
app.use(express.static(path.join(__dirname, '../public')))
//setup static directory to be used for the web page
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//handlebars engine setup and change the views location to templates folder
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Rodrigo Peralta'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Page',
        name: 'Rodrigo Peralta'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help',
        message: 'This is a help page to know more about the site.',
        name: 'Rodrigo Peralta'
    })
})
app.get('/help/*',(req,res) =>{
    res.render('help404', {
        title: '404 Error',
        name: 'Rodrigo Peralta',
        error: "Help article not found."
    })
})

app.get('/weather',(req, res) => {
    if (!req.query.address) {//si no se ingresa address=" " en el query
        return res.send({ //solo se puede usar send una vez por llamada al servidor
            //con return sales del bloque app.get y nomas se ejecuta send una vez
            error: 'You must provide an address.'
        })
    }
        const address = req.query.address //obtener la ubicacion ingresada en el buscador
        geocode(address,(error,{latitude, longitude, location} = {}) =>{ //llamar la funcion
            if (error) { //del codigo que busca la ubicacion
               return res.send({error: error}) //regresa un objeto error con los datos especificados en el programa geocode
            }
            forecast(latitude,longitude, (error, forecastData) => {
                if (error){
                    return res.send({error: error})
                }
                 res.send({ //se envia al localhost los siguientes datos obtenidos de la funcion
                    location:location, //location se obtiene del callback de geocode
                    forecast: forecastData, //forecastData se obtiene del callback, tiene las temperaturas
                    address: req.query.address }) //address se obtiene del query que le ingresaste
                    //añade al objeto el address que se impuso en
                    //busqueda del navegador
            })
        })
})



app.get('*', (req,res) => { //  '*' significa todas las demas ubicaciones no especificadas
    res.render('404page', { //por lo que este bloque debe ir al ultimo, si no no leerá
        title: '404 Error',// futuras paginas puesto que este es primero y se queda con este mensaje el servidor
        name: 'Rodrigo Peralta',
        error: 'The requested page was not found.'
    })
})



app.listen(port, () => { //designar el puerto a usar
    console.log('Server is up on port '+port)
})

// app.get('/help',(req, res) => {
//     res.send('Help page!')
// })

// app.get('/about',(req, res) => {
//     res.send('<h1>About</h1>')
// })