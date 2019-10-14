let requets = require('request'),
    base_url = `https://discordapp.com/api/users/@me`,
    atlis = require('../closed/atlis'),
    weather = require('../handlers/weatherUpdates');
module.exports = {
    signin(socket,SOCKET_LIST){
      if(socket.request.cookies.discord_token){
        socket.hasToken = true;
        const options = {
          url:base_url,
          headers:{
              Authorization:`Bearer ${socket.request.cookies.discord_token}`
          }
        }
      function requestcallback(error,response,body){
        if(error)throw new Error
        else{
            let bodyP = JSON.parse(body);
            let username = bodyP.username,
                avatar = bodyP.avatar,
                discriminator = bodyP.discriminator,
                Discordid = bodyP.id;
                socket.nickname = username;
                socket.discriminator = discriminator;
                socket.Discordid = Discordid;
                socket.avatar = avatar;
                socket.gang = 0;
                socket.police = null;
                atlis.testUser(socket,Discordid,username,avatar,discriminator);
                weather.requestWeather(socket);
            for(let i in SOCKET_LIST){
              SOCKET_LIST[i].emit('addToChatGlobal',`System: ${socket.nickname} connected`);
              SOCKET_LIST[i].emit('addToPlayerList',{nickname:socket.nickname,id:Discordid});
            }
        } 
      }
      requets(options,requestcallback)
      }else{
        socket.hasToken = false;
        socket.emit('changelogin',{token:false})
      }
    },

    disconnect(socket,SOCKET_LIST,clients){
      for(let i in SOCKET_LIST){
          if(socket.nickname != null){
            for(let i in clients){
              if(socket.nickname == clients[i].nickname){
                delete clients[i];
              }
            }
            SOCKET_LIST[i].emit('addToChatGlobal',`System: ${socket.nickname} left`);
            SOCKET_LIST[i].emit('updatePlayerList',clients);
          }
        }
      delete SOCKET_LIST[socket.id];
    }
}