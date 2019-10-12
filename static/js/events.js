let chatadd = document.getElementById('chatadd'),
    peerShort = document.getElementById('peerShort');
chatadd.onsubmit = e=>{
    e.preventDefault();
    socket.emit('sendMsgToServer', chattext.value);
    chattext.value = '';
}
peerShort.onclick = ()=>{
    peerShort.style.display = "none";
}
function requestPlayerFromList(buttonVal){
    socket.emit('requestPeer',buttonVal.value);
}
function givePlayerItem(buttonVal){
    var userid = buttonVal.value;
    socket.emit('storePeerIdForGive',userid);
    peerShort.style.display = "block";
    if(document.getElementById('givelist')) document.getElementById('givelist').parentNode.removeChild(document.getElementById('givelist'));
    playArea.innerHTML += `<div class="joblist" id="givelist">
    <label for="itemAmount">Cocona's</label><input type="number" id="itemAmount" min="1" required placeholder="Amount" value="1" class="itemAmount"><button class="AcceptJobButton" onclick="giveMoney()">Give</button>
    <button id="giveFood" onclick="giveFood()" class="AcceptJobButton">Food</button>
    <button id="giveDrugs" onclick="giveDrugs()" class="AcceptJobButton">Drugs</button>
    <button id="giveWeapon" onclick="giveWeapon()" class="AcceptJobButton">Weapons</button>
    <button id="giveClose" onclick="giveClose()" class="AcceptJobButton">Close</button>
    </div>`;
}
function jobListing(){
    if(document.getElementById('joblist')) document.getElementById('joblist').parentNode.removeChild(document.getElementById('joblist'));
    else socket.emit('requestJobListing');
}
function workButton(){
    socket.emit('requestWork');
}
function sleepButton(){
    socket.emit('requestSleep');
}
function storeListing(){
    if(document.getElementById('storelist')) document.getElementById('storelist').parentNode.removeChild(document.getElementById('storelist'));
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    else playArea.innerHTML += `<div class="joblist" id="storelist">
    <button id="shopEntertainment" onclick="shopEntertainment()" class="AcceptJobButton">Entertainment</button>
    <button id="shopDrugs" onclick="shopDrugs()" class="AcceptJobButton">Drugs</button>
    <button id="shopFood" onclick="shopFood()" class="AcceptJobButton">Food</button>
    <button id="shopBeds" onclick="shopBeds()" class="AcceptJobButton">Beds</button>
    </div>`;
}
function eatListing(){
    if(document.getElementById('foodInventoryRes')) document.getElementById('foodInventoryRes').parentNode.removeChild(document.getElementById('foodInventoryRes'));
    else socket.emit('requestInventoryFood');
}
function eatListingRefresh(){
    document.getElementById('foodInventoryRes').parentNode.removeChild(document.getElementById('foodInventoryRes'));
    socket.emit('requestInventoryFood');
}
function shopEntertainment(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    socket.emit('requestEntertainmentShop');
}
function shopDrugs(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    socket.emit('requestDrugShop');
}
function shopFood(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    socket.emit('requestFoodShop');
}
function shopBeds(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    socket.emit('requestBedShop');
}
function giveClose(){
    if(document.getElementById('givelist')) document.getElementById('givelist').parentNode.removeChild(document.getElementById('givelist'));
}
function giveMoney(){
    let itemAmount = document.getElementById('itemAmount');
    socket.emit('requestGiveMoney',itemAmount.value);
    if(document.getElementById('givelist')) document.getElementById('givelist').parentNode.removeChild(document.getElementById('givelist'));
}
function giveFood(){
    socket.emit('requestGiveFoodList');
    if(document.getElementById('givelist')) document.getElementById('givelist').parentNode.removeChild(document.getElementById('givelist'));
}
function giveDrugs(){
    socket.emit('requestGiveDrugList');
    if(document.getElementById('givelist')) document.getElementById('givelist').parentNode.removeChild(document.getElementById('givelist'));
}