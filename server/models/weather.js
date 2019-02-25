const request = require('request-promise');

const API_KEY = `ce790b016f5598ec530d9e20cb8f09f6`;

class weather {
    static retireveByCity (city, callback) {
        request({
            uri: `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`,
            json: true,
        }).then((res) => {
            callback(res)
        }).catch((err) => {
            console.log(err);
            callback({ error: `Could not reach API` }) 
        })
    }
}


module.exports = weather;