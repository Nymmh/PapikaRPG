let atlis = require('../closed/atlis'),
    store = require('../closed/store.js');
module.exports = {
    requestEntertainmentShop(socket){
        store.getEntertainment(socket);
    },
    requestDrugShop(socket){
        store.getDrugs(socket);
    },
    requestFoodShop(socket){
        store.getFood(socket);
    },
    requestBedShop(socket){
        store.getBed(socket);
    },
    buyItem(data,socket){
        store.buyItemFromDB(data,socket);
    },
    requestPoliceStore(socket){
        store.getPoliceStore(socket);
    },
    requestCivGunsSideArm(socket){
        store.requestCivGunsSideArm(socket);
    },
    requestCivGunsSubmachine(socket){
        store.requestCivGunsSubmachine(socket);
    },
    requestCivGunsSR(socket){
        store.requestCivGunsSR(socket);
    },
    requestBlackMarketGunsSideArm(socket){
        store.requestBlackMarketGunsSideArm(socket);
    },
    requestBlackmarketGunsSubmachine(socket){
        store.requestBlackmarketGunsSubmachine(socket);
    },
    requestBlackmarketGunsAR(socket){
        store.requestBlackmarketGunsAR(socket);
    },
    requestBlackmarketGunsDMR(socket){
        store.requestBlackmarketGunsDMR(socket);
    },
    requestBlackmarketGunsSR(socket){
        store.requestBlackmarketGunsSR(socket);
    },
    requestBlackmarketGunsExclusive(socket){
        store.requestBlackmarketGunsExclusive(socket);
    },
    requestBlackMarketDrugs(socket){
        store.getBlackMarketDrugs(socket);
    }
}