let atlis = require('../closed/atlis'),
    sleep = require('../closed/sleep.js'),
    handleSocket = require('../handlers/handleSocket.js');
module.exports = {
    requestSleep(socket){
        if(socket.sleep==100){
            let msg = `System: ${socket.nickname} You can not sleep right now.`;
            handleSocket.msgAlert(msg,socket);
        }else sleep.handleSleep(socket);
    }
}