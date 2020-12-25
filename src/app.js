const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));


app.get('', (req, res, next) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Muhammad',
    })
})

app.get('/about', (req, res, next) => {
    res.render('about', {
        title: 'About Me',
        source: '/img/robot.png',
        altText: 'Robot',
        name: 'Muhammad'
    })
})

app.get('/help', (req, res, next) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is a helpful Text',
        name: 'Muhammad'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You have to provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('/products', (req, res, next) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res, next) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help Article was not Found',
        name: 'Muhammad'
    })
});

app.get('*', (req, res, next) => {
    res.render('404', {
        title: '404',
        name: 'Muhammad',
        errorMessage: 'Page not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});