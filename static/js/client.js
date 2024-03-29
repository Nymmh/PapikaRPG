let //socket = io.connect('http://70.77.208.186:5000'),
    socket = io.connect('http://localhost:5000')
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
      innerPlayerList.innerHTML += `<div><button class="playerListButton" id="playerListButton" value="${data[q].id}" onclick="requestPlayerFromList(this)">${data[q].nickname}</button></div>`;
    }
  }
});
socket.on('addToPlayerList',data=>{
  innerPlayerList.innerHTML += `<div><button class="playerListButton" id="playerListButton" value="${data.id}" onclick="requestPlayerFromList(this)">${data.nickname}</button></div>`;
});
socket.on('alert',(data)=>{
  alert(data);
});
socket.on('addToChatGlobal',data=>{
  globalchat.innerHTML += `<div><p>${data}</p></div>`;
  globalchat.scrollTop = globalchat.scrollHeight;
});
socket.on('updatePlayerList',data=>{
  innerPlayerList.innerHTML = '';
  for(let q in data){
    if(data[q] != null){
      innerPlayerList.innerHTML += `<div><button class="playerListButton" id="playerListButton" value="${data[q].id}" onclick="requestPlayerFromList(this)">${data[q].nickname}</button></div>`;
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
        addGang = '',
        addTree = '';
    if(data.sick)addSick = `<div id="playerSick"><p>Sick</p></div>`;
    if(data.rebal_training)addRebalTrain = `<div id="playerRebal"><p>Rebal Training</p></div>`;
    if(data.gang)addGang = `<div id="playerGang"><p>Gang: ${data.gang}</p></div>`;
    if(data.jobTree){
      if(data.jobTree == "Police")addTree = `<button id="policeWanted" class="playerListButton" onclick="wantedList()">Wanted List</button>
      <button class="playerListButton" onclick="policeStore()">Police Store</button>`;
    }
    clientShort.innerHTML += `<img src="https://cdn.discordapp.com/avatars/${data.discordid}/${data.avatar}" alt="avatar for ${data.username}" class="shortClientImg"><span class="shortClientName">${data.username}</span>
    <div id="playerMoney"><p>Cocona's: <span>${data.money}</span></p></div>
    <div id="playerJob"><p>Job: <span>${data.job}</span></p></div>
    <div id="playerHappiness"><p>Happiness: <span>${data.happiness}</span></p></div>
    <div id="playerHunger"><p>Hunger: <span>${data.hunger}</span></p></div>
    <div id="playerSleep"><p>Sleep: <span>${data.sleep}</span></p></div>
    ${addGang}
    ${addSick}
    ${addRebalTrain}`;

    playArea.innerHTML += `<div class="mainHud"><button id="jobListing" onclick="jobListing()">Job Listings</button>
    <button id="workButton" onclick="workButton()">Work</button>
    <button id="sleepButton" onclick="sleepButton()">Sleep</button>
    <button id="storeListing" onclick="storeListing()">Store</button>
    <button id="eatListing" onclick="eatListing()">Eat</button>
    <button id="gangsListing" onclick="gangsListing()">Gangs</button></div>`;
    playArea.innerHTML += addTree;
  }else{
    let clientShort = document.getElementById('clientShort');
    clientShort.style.display = "none";
  }
});
socket.on('peerData',data=>{
  let peerShort = document.getElementById('peerShort');
  let addSick = '',
      addGang = '';
  if(data.sick)addSick = `<div id="playerSick"><p>Sick</p></div>`;
  if(data.gang)addGang = `<div id="playerGang"><p>Gang: ${data.gang}</p></div>`;
  peerShort.innerHTML = `<img src="https://cdn.discordapp.com/avatars/${data.discordid}/${data.avatar}" alt="avatar for ${data.username}" class="shortClientImg"><span class="shortClientName">${data.username}</span>
    <div id="playerMoney"><p>Cocona's: <span>${data.balance}</span></p></div>
    <div id="playerJob"><p>Job: <span>${data.job}</span></p></div>
  ${addGang}
  ${addSick}
  <div><button class="playerListButton" id="giveButton" value="${data.discordid}" onclick="givePlayerItem(this)">Give</button></div>`;
  peerShort.style.display = "block";
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
  joblist.innerHTML += `<div><button id="quitJob" class="RedButton">Quit Job</button></div>`;
  let quitJob = document.getElementById('quitJob');
  quitJob.addEventListener('click',quitJobEvent);
  let jobForms = document.getElementsByName('AcceptJobForm');
  for(let l=0;l<jobForms.length;l++){
    jobForms[l].addEventListener('submit',jobFormsListener);
  }
  function jobFormsListener(e){
    e.preventDefault();
    socket.emit('acceptedJob',e.target[0].defaultValue);
  }
  function quitJobEvent(e){
    e.preventDefault();
    socket.emit("quitJob");
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
socket.on('updateBalancePeer',data=>{
  let playerMoney = document.getElementById('playerMoney');
  playerMoney.innerHTML = `<p>Cocona's: <span>${data}</span></p>`;
});
socket.on('shopReponse',data=>{
  playArea.innerHTML += `<div class="joblist" id="shopRes"></div>`;
  let shopRes = document.getElementById('shopRes');
  for(let r in data){
    let id = data[r].id,
        name = data[r].name,
        price = data[r].price,
        happiness = data[r].happiness,
        hunger = data[r].hunger,
        sleep = data[r].sleep,
        cooldown = data[r].cooldown,
        restricted = data[r].restricted,
        ammo = data[r].ammo,
        firerate = data[r].firerate,
        damage = data[r].damage,
        hungerPrint = '',
        sleepPrint = '',
        happinessrPrint = '',
        cooldownPrint = '',
        restrictedPrint = '',
        ammoPrint = '',
        fireratePrint = '',
        damagePrint = '';
    if(happiness)happinessrPrint = `<p>Happiness: ${happiness}</p>`;
    if(hunger)hungerPrint = `<p>Hunger: ${hunger}</p>`;
    if(sleep)sleepPrint = `<p>Sleep: ${sleep}</p>`;
    if(cooldown)cooldownPrint = `<p>Cooldown: ${cooldown}s</p>`;
    if(restricted != null)restrictedPrint = `<p>Restricted: ${restricted}</p>`;
    if(ammo)ammoPrint = `<p>Ammo: ${ammo}</p>`;
    if(firerate)fireratePrint = `<p>Firerate: ${firerate}</p>`;
    if(damage)damagePrint = `<p>Damage: ${damage}</p>`;
    shopRes.innerHTML += `<div class="shopres"><p>${name}</p><p>Price: ${price}</p>${happinessrPrint}${hungerPrint}${sleepPrint}${cooldownPrint}${restrictedPrint}${ammoPrint}${fireratePrint}${damagePrint}<form id="shopItem${r}" name="shopItem"><input type="text" id="item" value="${id}" style="display:none"><input type="number" id="itemAmount" min="1" required placeholder="Amount" value="1" class="itemAmount"><input type="submit" value="Buy" class="AcceptJobButton"></form></div>`;
  }
  let shopForms = document.getElementsByName('shopItem');
  for(let k=0;k<shopForms.length;k++){
    shopForms[k].addEventListener('submit',shopFormsListener);
  }
  function shopFormsListener(e){
    e.preventDefault();
    let itemid = e.target[0].defaultValue,
        amount = e.target[1].value;
    socket.emit('butItem',{itemid,amount});
  }
});
socket.on('foodInventoryResponse',data=>{
  playArea.innerHTML += `<div class="joblist" id="foodInventoryRes"></div>`;
  let foodInventoryRes = document.getElementById('foodInventoryRes');
  for(let j in data){
    let type = data[j].type,
        name = data[j].item,
        amount = data[j].amount,
        buttonText = "Eat";
    if(type == "drug") buttonText = "Use";
    foodInventoryRes.innerHTML += `<div class="shopres"><p>${name}</p><p>Amount: ${amount}</p><form id="inventoryEat${j}" name="inventoryEat"><input type="text" id="item" value="${name}" style="display:none"><input type="text" id="type" value="${type}" style="display:none"><input type="submit" value="${buttonText}" class="AcceptJobButton"></form></div>`;
    let eatForms = document.getElementsByName('inventoryEat');
    for(let k=0;k<eatForms.length;k++){
      eatForms[k].addEventListener('submit',eatFormsListener);
    }
    function eatFormsListener(e){
      e.preventDefault();
      let item = e.target[0].defaultValue,
          type = e.target[1].defaultValue;
      socket.emit('eatItem',{item:item,type:type});
    }
  }
});
socket.on('refreshEatMenu',()=>{
  eatListingRefresh();
});
socket.on('giveFoodInventoryResponse',data=>{
  playArea.innerHTML += `<div class="joblist" id="foodInventoryRes"></div>`;
  let foodInventoryRes = document.getElementById('foodInventoryRes');
  for(let j in data){
    let type = data[j].type,
        name = data[j].item,
        amount = data[j].amount,
        buttonText = "Give";
    foodInventoryRes.innerHTML += `<div class="shopres"><p>${name}</p><p>Amount: ${amount}</p><form id="inventoryGive${j}" name="inventoryGive"><input type="text" id="item" value="${name}" style="display:none"><input type="text" id="type" value="${type}" style="display:none"><input type="number" id="itemAmount" min="1" required placeholder="Amount" value="1" class="itemAmount"><input type="submit" value="${buttonText}" class="AcceptJobButton"></form></div>`;
    let giveForms = document.getElementsByName('inventoryGive');
    for(let k=0;k<giveForms.length;k++){
      giveForms[k].addEventListener('submit',giveFormsListener);
    }
    function giveFormsListener(e){
      e.preventDefault();
      let item = e.target[0].defaultValue,
          type = e.target[1].defaultValue,
          giveAmount = e.target[2].value;
      socket.emit('giveItem',{item:item,type:type,amount:giveAmount});
    }
  }
});
socket.on('forceCloseMenues',()=>{
  if(document.getElementById('foodInventoryRes'))document.getElementById('foodInventoryRes').parentNode.removeChild(document.getElementById('foodInventoryRes'));
});
socket.on('blackmarketResponse',data=>{
  storeListingReponse(data);
});
socket.on('updateWeather',data=>{
  if(document.getElementById('weather')){
    let weatherArea = document.getElementById('weather');
    let cloudsPrint = '',
      humidityPrint = '';
    if(data.clouds)cloudsPrint = `<p>Clouds: ${data.clouds}</p>`;
    if(data.humidity)humidityPrint = `<p>Humidity: ${data.humidity}</p>`;
    weatherArea.innerHTML = `<div>
    <p>Type: ${data.type}</p>
    <p>Temperature: ${data.temp}</p>
    ${cloudsPrint}
    ${humidityPrint}
    <p>Wind: ${data.wind} Km/h</p>
    </div>`;
  }
});
socket.on('myGangReponse',data=>{
  if(document.getElementById('storelist')) document.getElementById('storelist').parentNode.removeChild(document.getElementById('storelist'));
  if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
  else playArea.innerHTML += data;
  let myGang = document.getElementById('myGang');
  myGang.onsubmit = e=>{
    e.preventDefault();
    let gangName = e.target[0].value,
      gangIcon = e.target[1].value;
    socket.emit('modifyGang',{gangName:gangName,gangIcon:gangIcon});
  }
});