const request = require("request");

const forecast = (lat, lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f9deed34136d433e900f2b00ef463206&units=metric`;
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback("Unable to connect Weather Service.", undefined);
        } else if (body.cod) {
            callback("Unable to Find Location", undefined);
        } else {
            callback(undefined, body.current.weather[0].description);
        }
    });
};

module.exports = forecast;