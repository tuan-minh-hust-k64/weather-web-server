const request = require('request');
const geocode = function (address, callback) {
    const urlMap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?types=place&access_token=pk.eyJ1IjoibWluaHRvbjAwNyIsImEiOiJja3FjNHQ0MmMwNTQ4MnBudmIxZmJtc2ViIn0.s32Vdi1QHJQlv_bhHJ4zfA&limit=1';
    request({ url: urlMap, json: true}, (err, res) => {
        if(err) {
            callback({error: 'Unable to connect to location server!'}, undefined);
        }else  if(!res.body.features.length){
            callback({error: 'Not Found your address! Try again!'}, undefined);
        }else{
            callback(undefined,{
                longitude: res.body.features[0].center[0],
                latitude: res.body.features[0].center[1],
            });
        }
    })
}

module.exports = geocode;