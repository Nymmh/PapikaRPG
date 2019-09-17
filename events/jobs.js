let atlis = require('../closed/atlis');
module.exports = {
    requestJobsList(socket,SOCKET_LIST){
        atlis.getJobListing(socket,SOCKET_LIST);
    }
}