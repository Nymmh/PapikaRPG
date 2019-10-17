module.exports = {
    dismissJobList(socket){
        socket.emit('dismissJobList');
    },
    updateClientShort(socket){
        socket.emit('updateClientShort',{
            money:socket.balance,
            job:socket.job,
            jobID:socket.jobID,
            sick:socket.sick,
            rebal_training:socket.rebal_training,
            happiness:socket.happiness,
            hunger:socket.hunger,
            sleep:socket.sleep,
            gang:socket.gang});
    },
    globalNewJob(socket,SOCKET_LIST){
        for(let i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChatGlobal',`System: ${socket.nickname} is now a ${socket.job}`);
        }
    },
    msgToGlobal(data,SOCKET_LIST){
        for(let i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChatGlobal',data);
        }
    },
    msgToClient(data,socket){
        socket.emit('addToChatGlobal',data);
    },
    msgAlert(data,socket){
        socket.emit('alert',data);
    },
    refreshEatMenu(socket){
        socket.emit('refreshEatMenu');
    },
}