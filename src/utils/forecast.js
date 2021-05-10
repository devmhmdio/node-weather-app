const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b697c0e2a7ad66b71025f3797af3e4ad&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.error) {
            callback('Unable to find the location. Please try again later', undefined)
        } else {
            callback(undefined, 'Current temperaature is ' + body.current.temperature + ' and latitude and longitude are ' + body.location.lat + ' and ' + body.location.lon + ' respectively. It is currently ' + body.current.weather_descriptions + ' outside. Wind speed is ' + body.current.wind_speed + '. There is ' + body.current.precip + '% chance of rain. It belongs to ' + body.location.region + ', ' + body.location.country)
        }
    })
}

module.exports = forecast