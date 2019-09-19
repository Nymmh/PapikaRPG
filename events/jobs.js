let atlis = require('../closed/atlis'),
    work = require('../closed/work.js');
module.exports = {
    requestJobsList(socket,SOCKET_LIST){
        atlis.getJobListing(socket,SOCKET_LIST);
    },
    acceptedjob(data,socket,SOCKET_LIST){
        if(socket.jobID == 0){
            let jobAccept = ~~(Math.random()*100),
                reject = 0,
                rate = 0;
            if(socket.happiness < 5)reject = ~~(Math.random()*100);
            rate = jobAccept+reject;
            if(rate > 90)socket.emit('alert', "You did not get the job");
            else atlis.acceptJob(data,socket,SOCKET_LIST);
        }
        else socket.emit('alert',"You currenty have a job");
    },
    requestWork(socket,SOCKET_LIST){
        if(socket.jobID == 0) socket.emit('alert',"You do not have a job");
        else{
            let currentTime = new Date().getTime();
            let checkedTime = 60;
            let remainTime = 20;
            if(socket.jobLastWork != 0){
                checkedTime = ~~((currentTime - socket.jobLastWork)/1000);
                remainTime = 20 - checkedTime;
                if(checkedTime<20)socket.emit('alert',`You can not work for another ${remainTime} seconds`)
                else{
                    socket.jobLastWork = currentTime;
                    work.workHandler(currentTime,socket,SOCKET_LIST);
                }
            }else{
                socket.jobLastWork = currentTime;
                work.workHandler(currentTime,socket,SOCKET_LIST);
            }
        }
    }
}