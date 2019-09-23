let chatadd = document.getElementById('chatadd');
chatadd.onsubmit = e=>{
    e.preventDefault();
    socket.emit('sendMsgToServer', chattext.value);
    chattext.value = '';
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
    </div>`;
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