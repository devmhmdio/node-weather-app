const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// setting up express
const app = express()
const port = process.env.PORT || 3000

//setting up directory or defining paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setting up the views folder and handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


//setting up the pages we need to display on the browser
app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Mohammed',
        position: 'Developer',
        copy: '&copy; BYI'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        imageInfo: 'This is my BNI image',
        copy: '&copy; BYI'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        surname: 'From BYI',
        copy: '&copy; BYI'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter address field'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
             return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, Forecastdata) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: Forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must enter a search query'
        })
    } 
    console.log(req.query.rating)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        message: 'Help article not found',
        copy: '&copy; BYI'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        message: 'Page not found',
        copy: '&copy; BYI'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})