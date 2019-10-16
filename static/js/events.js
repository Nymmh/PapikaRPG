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
    <button id="giveWeapon" onclick="giveWeapon()" class="AcceptJobButton">Guns</button>
    <button id="giveClose" onclick="giveClose()" class="RedButton">Close</button>
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
    socket.emit('checkBlackMarket');
}
function storeListingReponse(data){
    let addblackmarket = '';
    if(data)addblackmarket = `<button id="shopBackMarket" onclick="shopBackMarket()" class="AcceptJobButton">Blackmarket</button>`;
    if(document.getElementById('storelist')) document.getElementById('storelist').parentNode.removeChild(document.getElementById('storelist'));
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    else playArea.innerHTML += `<div class="joblist" id="storelist">
    <button id="shopEntertainment" onclick="shopEntertainment()" class="AcceptJobButton">Entertainment</button>
    <button id="shopDrugs" onclick="shopDrugs()" class="AcceptJobButton">Drugs</button>
    <button id="shopFood" onclick="shopFood()" class="AcceptJobButton">Food</button>
    <button id="shopBeds" onclick="shopBeds()" class="AcceptJobButton">Beds</button>
    <button id="shopGuns" onclick="shopGuns()" class="AcceptJobButton">Guns</button>
    ${addblackmarket}
    <button id="giveClose" onclick="giveClose()" class="RedButton">Close</button>
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
    if(document.getElementById('storelist')) document.getElementById('storelist').parentNode.removeChild(document.getElementById('storelist'));
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
}
function storeSubListClose(){
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
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
function giveWeapon(){
    socket.emit('requestGiveGunsList');
    if(document.getElementById('givelist')) document.getElementById('givelist').parentNode.removeChild(document.getElementById('givelist'));
}
function wantedList(){
    socket.emit('requestWantedList');
}
function policeStore(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    socket.emit('requestPoliceStore');
}
function shopGuns(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    playArea.innerHTML += `<div class="joblist" id="storeSubList">
    <button id="shopCivGunsSideArm" onclick="shopCivGunsSideArm()" class="AcceptJobButton">SideArm</button>
    <button id="shopCivGunsSubmachine" onclick="shopCivGunsSubmachine()" class="AcceptJobButton">Submachine Guns</button>
    <button id="shopCivGunsSR" onclick="shopCivGunsSR()" class="AcceptJobButton">Sniper Rifle</button>
    <button id="storeSubListClose" onclick="storeSubListClose()" class="RedButton">Close</button>
    </div>`;
}
function shopBackMarket(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    playArea.innerHTML += `<div class="joblist" id="storeSubList">
    <button id="shopBlackmarketGuns" onclick="shopBlackmarketGuns()" class="AcceptJobButton">Guns</button>
    <button id="shopBlackmarketDrugs" onclick="shopBlackmarketDrugs()" class="AcceptJobButton">Drugs</button>
    <button id="storeSubListClose" onclick="storeSubListClose()" class="RedButton">Close</button>
    </div>`;
}
function shopBlackmarketGuns(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    playArea.innerHTML += `<div class="joblist" id="storeSubList">
    <button id="shopBlackmarketGunsSideArm" onclick="shopBlackmarketGunsSideArm()" class="AcceptJobButton">SideArm</button>
    <button id="shopBlackmarketGunsSubmachine" onclick="shopBlackmarketGunsSubmachine()" class="AcceptJobButton">Submachine Guns</button>
    <button id="shopBlackmarketGunsAR" onclick="shopBlackmarketGunsAR()" class="AcceptJobButton">Assault Rifles</button>
    <button id="shopBlackmarketGunsDMR" onclick="shopBlackmarketGunsDMR()" class="AcceptJobButton">DMR</button>
    <button id="shopBlackmarketGunsSR" onclick="shopBlackmarketGunsSR()" class="AcceptJobButton">Sniper Rifle</button>
    <button id="shopBlackmarketGunsExclusive" onclick="shopBlackmarketGunsExclusive()" class="AcceptJobButton">Exclusive</button>
    <button id="storeSubListClose" onclick="storeSubListClose()" class="RedButton">Close</button>
    </div>`;
}
function shopCivGunsSideArm(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    socket.emit('requestCivGunsSideArm');
}
function shopCivGunsSubmachine(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    socket.emit('requestCivGunsSubmachine');
}
function shopCivGunsSR(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    socket.emit('requestCivGunsSR');
}
function shopBlackmarketGunsSideArm(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    socket.emit('requestBlackMarketGunsSideArm');
}
function shopBlackmarketGunsSubmachine(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    socket.emit('requestBlackmarketGunsSubmachine');
}
function shopBlackmarketGunsAR(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    socket.emit('requestBlackmarketGunsAR');
}
function shopBlackmarketGunsDMR(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    socket.emit('requestBlackmarketGunsDMR');
}
function shopBlackmarketGunsSR(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    socket.emit('requestBlackmarketGunsSR');
}
function shopBlackmarketGunsExclusive(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    socket.emit('requestBlackmarketGunsExclusive');
}
function shopBlackmarketDrugs(){
    if(document.getElementById('shopRes')) document.getElementById('shopRes').parentNode.removeChild(document.getElementById('shopRes'));
    if(document.getElementById('storeSubList')) document.getElementById('storeSubList').parentNode.removeChild(document.getElementById('storeSubList'));
    socket.emit('requestBlackMarketDrugs');
}