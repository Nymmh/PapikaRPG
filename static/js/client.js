let socket = io.connect('http://localhost:5000'),
    loadingimg = document.getElementById('loadingScreen'),
    innerPlayerList = document.getElementById('innerPlayerList'),
    globalchat = document.getElementById('global_chat_log'),
    playArea = document.getElementById('playArea');
window.onload = ()=>{loadingimg.style.display = "none"}
function loadingScreenOn(){
  loadingimg.style.display = "block";
}
function loadingScreenOff(){
  loadingimg.style.display = "none";
}
socket.on('joinPlayerList',data=>{
  for(let q in data){
    if(data[q] != null){
      innerPlayerList.innerHTML += `<div>${data[q]}</div>`;
    }
  }
});
socket.on('addToPlayerList',data=>{
  innerPlayerList.innerHTML += `<div>${data}</div>`;
});
socket.on('alert',(data)=>{
  alert(data);
});
socket.on('addToChatGlobal',data=>{
  globalchat.innerHTML += `<div><p>${data}</p></div>`;
});
socket.on('updatePlayerList',data=>{
  innerPlayerList.innerHTML = '';
  for(let q in data){
    if(data[q] != null){
      innerPlayerList.innerHTML += `<div>${data[q]}</div>`;
    }
  }
});
socket.on('changelogin',data=>{
  if(data.token){
    let loginDiv = document.getElementById('login'),
        clientShort = document.getElementById('clientShort');
    loginDiv.parentNode.removeChild(loginDiv);
    let addSick = '',
        addRebalTrain = '',
        addGang = '';
    if(data.sick)addSick = `<div id="playerSick"><p>Sick</p></div>`;
    if(data.rebal_training)addRebalTrain = `<div id="playerRebal"><p>Rebal Training</p></div>`;
    if(data.gang)addGang = `<div id="playerGang"><p>Gang: ${data.gang}</p></div>`;
    clientShort.innerHTML += `<img src="https://cdn.discordapp.com/avatars/${data.discordid}/${data.avatar}" alt="avatar for ${data.username}" class="shortClientImg"><span class="shortClientName">${data.username}</span>
    <div id="playerMoney"><p>Cocona's: <span>${data.money}</span></p></div>
    <div id="playerJob"><p>Job: <span>${data.job}</span></p></div>
    <div id="playerHappiness"><p>Happiness: <span>${data.happiness}</span></p></div>
    <div id="playerHunger"><p>Hunger: <span>${data.hunger}</span></p></div>
    <div id="playerSleep"><p>Sleep: <span>${data.sleep}</span></p></div>
    ${addGang}
    ${addSick}
    ${addRebalTrain}`;

    playArea.innerHTML += `<button id="jobListing" onclick="jobListing()">Job Listings</button>`;
    playArea.innerHTML += `<button id="workButton" onclick="workButton()">Work</button>`;
    playArea.innerHTML += `<button id="sleepButton" onclick="sleepButton()">Sleep</button>`;
  }else{
    let clientShort = document.getElementById('clientShort');
    clientShort.style.display = "none";
  }
});
socket.on('workCoolDown',data=>{
  if(document.getElementById('workButton')){
    document.getElementById('workButton').innerText = `Work: ${data}`;
  }
});
socket.on('workCoolDownReset',()=>{
  if(document.getElementById('workButton')){
    document.getElementById('workButton').innerText = `Work`;
  }
});
socket.on('sleepCoolDown',data=>{
  if(document.getElementById('sleepButton')){
    document.getElementById('sleepButton').innerText = `Sleep: ${data}`;
  }
});
socket.on('sleepCoolDownReset',()=>{
  if(document.getElementById('sleepButton')){
    document.getElementById('sleepButton').innerText = `Sleep`;
  }
});
socket.on('jobListResponse',data=>{
  playArea.innerHTML += `<div class="joblist" id="joblist"></div>`;
  let joblist = document.getElementById('joblist');
  for(let j in data){
    let id = data[j].id,
        name = data[j].name,
        income = data[j].income,
        members = data[j].members,
        tree = data[j].tree;
        joblist.innerHTML += `<div><h1>${name}</h1><div><p>Income: ${income}</p><p>Members: ${members}</p><p>Tree: ${tree}</p><form id="AcceptJob${j}" name="AcceptJobForm"><input type="text" id="job" value="${id}" style="display:none"><input type="submit" value="Accept Job" class="AcceptJobButton"></form></div></div>`;
  }
  let jobForms = document.getElementsByName('AcceptJobForm');
  for(let l=0;l<jobForms.length;l++){
    jobForms[l].addEventListener('submit',jobFormsListener);
  }
  function jobFormsListener(e){
    e.preventDefault();
    socket.emit('acceptedJob',e.path[0].childNodes[0].defaultValue);
  }
});
socket.on('dismissJobList',()=>{
  let joblist = document.getElementById('joblist');
  joblist.parentNode.removeChild(joblist);
});
socket.on('updateClientShort',(data)=>{
  let playerMoney = document.getElementById('playerMoney'),
      playerJob = document.getElementById('playerJob'),
      playerHappiness = document.getElementById('playerHappiness'),
      playerHunger = document.getElementById('playerHunger'),
      playerSleep = document.getElementById('playerSleep'),
      playerSick = document.getElementById('playerSick'),
      playerRebal = document.getElementById('playerRebal'),
      playerGang = document.getElementById('playerGang');
  playerMoney.parentNode.removeChild(playerMoney);
  playerJob.parentNode.removeChild(playerJob);
  playerHappiness.parentNode.removeChild(playerHappiness);
  playerHunger.parentNode.removeChild(playerHunger);
  playerSleep.parentNode.removeChild(playerSleep);
  if(playerSick) playerSick.parentNode.removeChild(playerSick);
  if(playerRebal) playerRebal.parentNode.removeChild(playerRebal);
  if(playerGang) playerGang.parentNode.removeChild(playerGang);
  let addSick = '',
      addRebalTrain = '',
      addGang = '';
  if(data.sick)addSick = `<div id="playerSick"><p>Sick</p></div>`;
  if(data.rebal_training)addRebalTrain = `<div id="playerRebal"><p>Rebal Training</p></div>`;
  if(data.gang)addGang = `<div id="playerGang"><p>Gang: ${data.gang}</p></div>`;  
  let clientShort = document.getElementById('clientShort');
  clientShort.innerHTML += `<div id="playerMoney"><p>Cocona's: <span>${data.money}</span></p></div>
  <div id="playerJob"><p>Job: <span>${data.job}</span></p></div>
  <div id="playerHappiness"><p>Happiness: <span>${data.happiness}</span></p></div>
  <div id="playerHunger"><p>Hunger: <span>${data.hunger}</span></p></div>
  <div id="playerSleep"><p>Sleep: <span>${data.sleep}</span></p></div>
  ${addGang}
  ${addSick}
  ${addRebalTrain}`;
});