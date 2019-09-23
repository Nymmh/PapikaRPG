let atlis = require('../closed/atlis'),
    store = require('../closed/store.js');
module.exports = {
    requestEntertainmentShop(socket){
        store.getEntertainment(socket);
    },
    requestDrugShop(socket){
        store.getDrugs(socket);
    },
    buyItem(data,socket){
        store.buyItemFromDB(data,socket);
    }
}