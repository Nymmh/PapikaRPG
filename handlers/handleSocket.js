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
            sleep:socket.sleep});
    },
    globalNewJob(socket,SOCKET_LIST){
        for(let i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChatGlobal',`System: ${socket.nickname} is now a ${socket.job}`);
        }
    },
    msgToClient(data,socket){
        socket.emit('addToChatGlobal',data);
    }
}