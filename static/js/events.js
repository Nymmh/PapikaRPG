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