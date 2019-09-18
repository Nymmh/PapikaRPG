let atlis = require('../closed/atlis');
module.exports = {
    requestJobsList(socket,SOCKET_LIST){
        atlis.getJobListing(socket,SOCKET_LIST);
    },
    acceptedjob(data,socket,SOCKET_LIST){
        if(socket.jobID == 0){
            let jobAccept = ~~(Math.random(0,100)*100),
                reject = 0,
                rate = 0;
            if(socket.happiness < 5)reject = ~~(Math.random(0,20)*100);
            rate = jobAccept+reject;
            if(rate > 90)socket.emit('alert', "You did not get the job");
            else atlis.acceptJob(data,socket,SOCKET_LIST);
        }
        else socket.emit('alert',"You currenty have a job");
    }
}