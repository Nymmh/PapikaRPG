let express = require('express');
let http = require('http');
let path = require('path');
let socketIO = require('socket.io');
let cookieParser = require('cookie-parser');
let request = require('request');
let app = express();
let server = http.Server(app);
let io = socketIO(server);
let fs = require('fs');
let rateLimit = require("express-rate-limit");
let mongoose = require('mongoose');
let socketCookieParser = require('socket.io-cookie-parser');

let {db} = require('./closed/config.js');
let connect = require('./events/connect.js');
let chat = require('./events/chat.js');
let jobs = require('./events/jobs.js');

try{
    mongoose.connect(db, {useNewUrlParser:true});
}catch(err){
    return err;
}
mongoose.set('useFindAndModify', false);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20
});
app.use(cookieParser());
app.get('/', (request, response) => {
    const discord_token = response.req.cookies.discord_token;
    response.status(200).sendFile(path.join(__dirname, 'static/index.html'));
});
app.use('/api/discord',require('./api/discord'));
app.set('port', 5000);
app.use(express.static("static"), limiter);

let SOCKET_LIST = {};
let clients = [];

io.use(socketCookieParser());
io.on('connection',function (socket){
    socket.join("Lobby",()=>{
        let rooms = Object.keys(socket.rooms);
    });
    for (socketID in io.nsps['/'].adapter.rooms['Lobby'].sockets) {
        let nickname = io.nsps['/'].connected[socketID].nickname;
        if(nickname != null){
            if(clients.includes(nickname)){
                continue;
            }else{
                clients.push(nickname);
            }
        }
    }
    socket.emit('joinPlayerList',clients);
    SOCKET_LIST[socket.id] = socket;
    connect.signin(socket,SOCKET_LIST);
    socket.on('disconnect', ()=>{
        connect.disconnect(socket,SOCKET_LIST,clients);
    });
    socket.on('sendMsgToServer',data=>{
        chat.addToGlobal(data,socket,SOCKET_LIST);
    });
    socket.on('requestJobListing',()=>{
        jobs.requestJobsList(socket,SOCKET_LIST);
    });
});

let port = process.env.PORT || 5000;

server.listen({port:port}, () => {
  console.log(`Starting server on port ${port}`);
});