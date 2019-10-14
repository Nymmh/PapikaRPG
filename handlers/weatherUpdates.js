let weather = require('../closed/weather.js');
module.exports = {
    sendWeatherUpdate(SOCKET_LIST,weatherType,roundTemp,randClouds,roundedWind,roundHumidity){
        for(let i in SOCKET_LIST){
            SOCKET_LIST[i].emit('updateWeather',{type:weatherType,temp:roundTemp,clouds:randClouds,wind:roundedWind,humidity:roundHumidity});
        }
    },
    requestWeather(socket){
        weather.getCurrentWeather(socket);
    }
}