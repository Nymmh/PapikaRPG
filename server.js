let express = require('express'),
    http = require('http'),
    path = require('path'),
    socketIO = require('socket.io'),
    cookieParser = require('cookie-parser'),
    request = require('request'),
    app = express(),
    server = http.Server(app),
    io = socketIO(server),
    fs = require('fs'),
    rateLimit = require("express-rate-limit"),
    mongoose = require('mongoose'),
    socketCookieParser = require('socket.io-cookie-parser');

let {db} = require('./closed/config.js'),
    connect = require('./events/connect.js'),
    chat = require('./events/chat.js'),
    jobs = require('./events/jobs.js'),
    autocheck = require('./closed/workAutoChecker.js'),
    sleep = require('./events/player.js'),
    store = require('./events/store.js');

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
    autocheck.check(socket);
    socket.on('disconnect', ()=>{
        connect.disconnect(socket,SOCKET_LIST,clients);
    });
    socket.on('sendMsgToServer',data=>{
        chat.addToGlobal(data,socket,SOCKET_LIST);
    });
    socket.on('requestJobListing',()=>{
        jobs.requestJobsList(socket,SOCKET_LIST);
    });
    socket.on('acceptedJob',data=>{
        jobs.acceptedjob(data,socket,SOCKET_LIST);
    });
    socket.on('requestWork',()=>{
        jobs.requestWork(socket,SOCKET_LIST);
    });
    socket.on('requestSleep',()=>{
        sleep.requestSleep(socket);
    });
    socket.on('requestEntertainmentShop',()=>{
        store.requestEntertainmentShop(socket);
    });
    socket.on('requestDrugShop',()=>{
        store.requestDrugShop(socket);
    });
    socket.on('requestFoodShop',()=>{
        store.requestFoodShop(socket);
    });
    socket.on('butItem',data=>{
        store.buyItem(data,socket);
    });
});

let port = process.env.PORT || 5000;

server.listen({port:port}, () => {
  console.log(`Starting server on port ${port}`);
});