let weather = require('../closed/weather.js');
module.exports = {
    generateWeather(SOCKET_LIST){
        let weatherType = [
            "Light Rain",
            "Heavy Rain",
            "Thunderstorm",
            "Monsoon",
            "Hurricanes",
            "Sunny",
            "Cloudy",
            "Hot",
            "Cold",
            "Dry",
            "Wet",
            "Windy",
            "Sand Storm",
            "Snow Storm",
            "Tornado",
            "Humid",
            "Foggy",
            "Snow",
            "Thundersnow",
            "Hail",
            "Sleet",
            "Blizzard",
            "Mist"
        ];
        let cloudType = [
            'Partially Cloudy',
            'Cloudy',
            'Overcast',
            'Clear'
        ];
        let randWeatherType = ~~(Math.random() * weatherType.length),
            randCloudType = ~~(Math.random() * cloudType.length),
            trueWeather = weatherType[randWeatherType];
        if(trueWeather == 'Light Rain'){
            var randTemp = ~~(Math.random()*(27 - 0)+0),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(80 - 50)+50),
                randWind = Math.random()*(11.66 - 1.60)+1.60;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Heavy Rain'){
            var randTemp = ~~(Math.random()*(27 - 0)+0),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(100 - 80)+80),
                randWind = Math.random()*(20.92 - 12.87)+12.87;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Thunderstorm'){
            var randTemp = ~~(Math.random()*(15 - 0)+0),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(100 - 90)+90),
                randWind = Math.random()*(38.62 - 30.57)+30.57;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Monsoon'){
            var randTemp = ~~(Math.random()*(27.05 - 3.6)+3.6),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(100 - 84.2)+84.2),
                randWind = Math.random()*(86.90 - 62.76)+62.76;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Hurricanes'){
            var randTemp = ~~(Math.random()*(36 - 26)+26),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(95 - 70)+70),
                randWind = Math.random()*(251 - 119)+119;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Sunny'){
            var randTemp = ~~(Math.random()*(40 - -25)+ -25),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(60 - 0)+0),
                randWind = Math.random()*(28.96 - 0)+0;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Cloudy'){
            var randTemp = ~~(Math.random()*(25 - -25)+ -25),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(70 - 0)+0),
                randWind = Math.random()*(28.96 - 0)+0;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Hot'){
            var randTemp = ~~(Math.random()*(48 - 20)+ 20),
                randClouds = "Clear",
                randHumidity = ~~(Math.random()*(40 - 0)+0),
                randWind = Math.random()*(4.82 - 0)+0;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Cold'){
            var randTemp = ~~(Math.random()*(10 - -40)+ -40),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(10 - 0)+0),
                randWind = Math.random()*(4.82 - 0)+0;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Dry'){
            var randTemp = ~~(Math.random()*(25 - 5)+ 5),
                randClouds = cloudType[randCloudType],
                randHumidity = null,
                randWind = Math.random()*(4.82 - 0)+0;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2);
        }else if(trueWeather == 'Wet'){
            var randTemp = ~~(Math.random()*(20 - 5)+ 5),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(80 - 40)+40),
                randWind = Math.random()*(28.96 - 0)+0;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Windy'){
            var randTemp = ~~(Math.random()*(30 - -15)+ -15),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(60 - 0)+0),
                randWind = Math.random()*(74.02 - 19.31)+19.31;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Sand Storm'){
            var randTemp = ~~(Math.random()*(32.22 - -27.22)+ -27.22),
                randClouds = null,
                randHumidity = 0,
                randWind = Math.random()*(95 - 75)+75;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2);
        }else if(trueWeather == 'Snow Storm'){
            var randTemp = ~~(Math.random()*(0 - -45)+ -45),
                randClouds = null,
                randHumidity = ~~(Math.random()*(15 - 0)+0),
                randWind = Math.random()*(56 - 40.23)+40.23;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Tornado'){
            var randTemp = ~~(Math.random()*(27 - 12)+ 12),
                randClouds = null,
                randHumidity = ~~(Math.random()*(80 - 40)+40),
                randWind = Math.random()*(511.77 - 64.37)+64.37;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2);
        }else if(trueWeather == 'Humid'){
            var randTemp = ~~(Math.random()*(40 - 28)+ 28),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(100 - 80)+80),
                randWind = Math.random()*(15 - 0)+0;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Foggy'){
            var randTemp = ~~(Math.random()*(2.5 - 0)+ 0),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(100 - 99)+99),
                randWind = Math.random()*(0.1 - 0)+0;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Snow'){
            var randTemp = ~~(Math.random()*(0 - -40)+ -40),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(30 - 5)+5),
                randWind = Math.random()*(19.31 - 0)+0;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Thundersnow'){
            var randTemp = ~~(Math.random()*(0 - -40)+ -40),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(30 - 5)+5),
                randWind = Math.random()*(38.62 - 12.87)+12.87;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Hail'){
            var randTemp = ~~(Math.random()*(10 - 0)+ 0),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(30 - 5)+5),
                randWind = Math.random()*(38.62 - 4.82)+4.82;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Sleet'){
            var randTemp = ~~(Math.random()*(0 - -3)+ -3),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(100 - 50)+50),
                randWind = Math.random()*(0.1 - 0)+0;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Blizzard'){
            var randTemp = ~~(Math.random()*(-12 - -40)+ -40),
                randClouds = null,
                randHumidity = ~~(Math.random()*(20 - 5)+5),
                randWind = Math.random()*(90 - 72)+72;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }else if(trueWeather == 'Mist'){
            var randTemp = ~~(Math.random()*(0 - -3)+ -3),
                randClouds = cloudType[randCloudType],
                randHumidity = ~~(Math.random()*(100 - 99)+9),
                randWind = Math.random()*(0.1 - 0)+0;
            var roundedWind = randWind.toFixed(2),
                roundTemp = randTemp.toFixed(2),
                roundHumidity = randHumidity.toFixed(2);
        }
        weather.recreateWeather(SOCKET_LIST,trueWeather,roundTemp,randClouds,roundedWind,roundHumidity);
    }
}