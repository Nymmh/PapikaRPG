var socket = io.connect('http://localhost:5000');
var loadingimg = document.getElementById('loadingScreen');
var innerPlayerList = document.getElementById('innerPlayerList');
var globalchat = document.getElementById('global_chat_log');
var chatadd = document.getElementById('chatadd');
var playArea = document.getElementById('playArea');
window.onload = ()=>{loadingimg.style.display = "none"}
function loadingScreenOn(){
  loadingimg.style.display = "block";
}
function loadingScreenOff(){
  loadingimg.style.display = "none";
}
socket.on('joinPlayerList',(data)=>{
  for(var q in data){
    if(data[q] != null){
      innerPlayerList.innerHTML += `<div>${data[q]}</div>`;
    }
  }
});
socket.on('addToPlayerList',(data)=>{
  innerPlayerList.innerHTML += `<div>${data}</div>`;
});
socket.on('alert',(data)=>{
  alert(data);
});
socket.on('addToChatGlobal',(data)=>{
  globalchat.innerHTML += `<div><p>${data}</p></div>`;
});
socket.on('updatePlayerList',(data)=>{
  innerPlayerList.innerHTML = '';
  for(var q in data){
    if(data[q] != null){
      innerPlayerList.innerHTML += `<div>${data[q]}</div>`;
    }
  }
});
chatadd.onsubmit = (e)=>{
  e.preventDefault();
  socket.emit('sendMsgToServer', chattext.value);
  chattext.value = '';
}
socket.on('changelogin',(data)=>{
  if(data.token){
    let loginDiv = document.getElementById('login');
    let clientShort = document.getElementById('clientShort');
    loginDiv.parentNode.removeChild(loginDiv);
    clientShort.innerHTML = `<div><img src="https://cdn.discordapp.com/avatars/${data.discordid}/${data.avatar}" alt="avatar for ${data.username}" class="shortClientImg"><span class="shortClientName">${data.username}</span>
    <div><p>Money: ${data.money}<span></span></p></div>
    <div><p>Job: ${data.job}<span></span></p></div>
    </div>`;
    if(data.gang!=0){
      socket.emit('requestGang');
    }
    playArea.innerHTML = `<div id="jobListing" onclick="jobListing()">Job Listings</div>`;
  }else{
    let clientShort = document.getElementById('clientShort');
    clientShort.style.display = "none";
  }
});
