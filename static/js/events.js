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