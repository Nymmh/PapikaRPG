module.exports = {
    addToGlobal(data,socket,SOCKET_LIST){
        if(!socket.nickname || socket.nickname == null)socket.emit('alert', "You must enter a username before you can chat");
        else{
            for(var i in SOCKET_LIST){
                SOCKET_LIST[i].emit('addToChatGlobal',`${socket.nickname}: ${data}`);
              }
        }
    }
}