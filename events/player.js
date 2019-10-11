let atlis = require('../closed/atlis'),
    sleep = require('../closed/sleep.js'),
    handleSocket = require('../handlers/handleSocket.js'),
    inventory = require('../closed/inventory.js'),
    playerRef = require('../closed/playerRef.js'),
    give = require('../closed/give.js');
module.exports = {
    requestSleep(socket){
        if(socket.sleep==100){
            let msg = `System: ${socket.nickname} You can not sleep right now.`;
            handleSocket.msgAlert(msg,socket);
        }else sleep.handleSleep(socket);
    },
    requestInvetoryFood(socket){
        inventory.findInventoryFood(socket);
    },
    eatItem(socket,data){
        inventory.eatItem(socket,data);
    },
    requestPeer(socket,data){
        playerRef.findPeer(socket,data);
    },
    storePeerid(socket,data){
        socket.lastGiveID = data;
    },
    giveMoney(socket,data,SOCKET_LIST){
        if(socket.lastGiveID)give.giveMoneyToPeer(socket,data,SOCKET_LIST);
    },
    requestGiveFood(socket,SOCKET_LIST){
        if(socket.lastGiveID)inventory.requestFoodInvForGive(socket,SOCKET_LIST);
    },
    requestGiveItem(socket,data,SOCKET_LIST){
        if(socket.lastGiveID)give.giveItemToPeer(socket,data,SOCKET_LIST);
    }
}