const request = require('request');

const forecast = function ({latitude, longitude},callback) {

        const urlWeather = 'http://api.weatherstack.com/current?access_key=24ab20a245d2ea6f6d469c66bd7b223f&query='+latitude+','+longitude+'&units=f';
        request({ url: urlWeather, json: true }, (err, res) => {
            if(err){
                callback({error: 'Unable to connect to weatherstack server!!!'},undefined);
            }else if(res.body.success===false){
                callback(res.body.error.info, undefined);
            }else{
                callback(undefined, res.body.current)
            }
        })
    
}
module.exports = forecast;