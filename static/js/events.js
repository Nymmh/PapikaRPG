var chatadd = document.getElementById('chatadd');
function jobListing(){
    if(document.getElementById('joblist')) document.getElementById('joblist').parentNode.removeChild(document.getElementById('joblist'));
    else socket.emit('requestJobListing');
}
chatadd.onsubmit = (e)=>{
    e.preventDefault();
    socket.emit('sendMsgToServer', chattext.value);
    chattext.value = '';
  }