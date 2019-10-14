let weather = require('../closed/weather.js'),
    handleSocket = require('../handlers/handleSocket.js');
module.exports = {
    sendWeatherUpdate(SOCKET_LIST,weatherType,roundTemp,randClouds,roundedWind,roundHumidity){
        for(let i in SOCKET_LIST){
            SOCKET_LIST[i].emit('updateWeather',{type:weatherType,temp:roundTemp,clouds:randClouds,wind:roundedWind,humidity:roundHumidity});
            SOCKET_LIST[i].emit('addToChatGlobal',`System: A new weather report has come in.`);
        }
    },
    requestWeather(socket){
        weather.getCurrentWeather(socket);
    }
}