var socket = io.connect('http://localhost:5000');
var loadingimg = document.getElementById('loadingScreen');
var innerPlayerList = document.getElementById('innerPlayerList');
var globalchat = document.getElementById('global_chat_log');
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
socket.on('changelogin',(data)=>{
  if(data.token){
    let loginDiv = document.getElementById('login');
    let clientShort = document.getElementById('clientShort');
    loginDiv.parentNode.removeChild(loginDiv);
    let addSick = '',
        addRebalTrain = '',
        addGang = '';
    if(data.sick)addSick = `<div><p>Sick</p></div>`;
    if(data.rebal_training)addRebalTrain = `<div><p>Rebal Training</p></div>`;
    if(data.gang)addGang = `<div><p>Gang: ${data.gang}</p></div>`;
    clientShort.innerHTML = `<div><img src="https://cdn.discordapp.com/avatars/${data.discordid}/${data.avatar}" alt="avatar for ${data.username}" class="shortClientImg"><span class="shortClientName">${data.username}</span>
    <div><p>Money: <span>${data.money}</span></p></div>
    <div><p>Job: <span>${data.job}</span></p></div>
    <div><p>Happiness: <span>${data.happiness}</span></p></div>
    <div><p>Hunger: <span>${data.hunger}</span></p></div>
    <div><p>Sleep: <span>${data.sleep}</span></p></div>
    ${addGang}
    ${addSick}
    ${addRebalTrain}
    </div>`;

    playArea.innerHTML = `<button id="jobListing" onclick="jobListing()">Job Listings</button>`;
  }else{
    let clientShort = document.getElementById('clientShort');
    clientShort.style.display = "none";
  }
});
socket.on('jobListResponse',(data)=>{
  playArea.innerHTML += `<div class="joblist" id="joblist">${data}</div>`;
});