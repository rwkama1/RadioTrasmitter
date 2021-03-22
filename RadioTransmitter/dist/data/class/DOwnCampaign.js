"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOwnCampaign = void 0;
const OwnCampaign_1 = require("../../shared/entityshared/OwnCampaign");
const Conection_1 = require("./Conection");
const dataexception_1 = require("../../shared/exceptions/dataexception");
class DOwnCampaign {
    constructor() { }
    static getInstance() {
        if (!DOwnCampaign.instancia) {
            DOwnCampaign.instancia = new DOwnCampaign();
        }
        return DOwnCampaign.instancia;
    }
    getOwnCampaigns() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                const collection = cn.db("RadioTransmitter").collection("OwnCampaign");
                const result = yield collection.find({}).toArray();
                let array = [];
                for (var p of result) {
                    var obj = new OwnCampaign_1.OwnCampaign(p._title, p._datei, p._datef, p._duration, p._mentions, p._advert, p._cost, p._listemision);
                    array.push(obj);
                }
                return array;
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Own Campaign could not be listed" + e.message);
            }
        });
    }
    getOCampaignsByNameLetter(expression) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var cn = yield Conection_1.Conexion.uri().connect();
                var query = { _title: { $regex: expression } };
                const collection = cn.db("RadioTransmitter").collection("OwnCampaign");
                const result = yield collection.find(query).toArray();
                let array = [];
                for (var p of result) {
                    var obj = new OwnCampaign_1.OwnCampaign(p._title, p._datei, p._datef, p._duration, p._mentions, p._advert, p._cost, p._listemision);
                    array.push(obj);
                }
                return array;
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Own Campaign could not be listed" + e.message);
            }
        });
    }
    getOCampaign(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                const collection = cn.db("RadioTransmitter").collection("OwnCampaign");
                const p = yield collection.findOne({ _title: title });
                if (p == null) {
                    return null;
                }
                var obj = new OwnCampaign_1.OwnCampaign(p._title, p._datei, p._datef, p._duration, p._mentions, p._advert, p._cost, p._listemision);
                return obj;
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Own Campaign could not be searched(It is possible that the OwnCampaign is not in the system)" + e.message);
            }
        });
    }
    addOCampaign(dtoc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                dtoc.listemision = [];
                let cn = yield Conection_1.Conexion.uri().connect();
                const coladvert = cn.db("RadioTransmitter").collection("OwnCampaign");
                const result = yield coladvert.insertOne(dtoc);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Own Campaign could not be added" + e.message);
            }
        });
    }
    deleteOCampaign(dtoc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                var query = { _title: dtoc.title };
                const coladvert = cn.db("RadioTransmitter").collection("OwnCampaign");
                const result = yield coladvert.deleteOne(query);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Own Campaign could not be deleted" + e.message);
            }
        });
    }
    updateOCampaign(dtoc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                let query = { _title: dtoc.title };
                var newvalues = { $set: { _datei: dtoc.datei, _datef: dtoc.datef, dtoc, _duration: dtoc.duration, _mentions: dtoc.mentions, _advert: dtoc.advert, _cost: dtoc.cost } };
                const coladvert = cn.db("RadioTransmitter").collection("OwnCampaign");
                const result = yield coladvert.updateOne(query, newvalues);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Own Campaign could not be updated" + e.message);
            }
        });
    }
    // ----------------------------------
    addOCEmission(dtec) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //let titlecam = {_title: dtec.title };
                let cn = yield Conection_1.Conexion.uri().connect();
                var query = { _title: dtec.title };
                var newvalues = { $set: { _listemision: dtec.listemision } };
                const colcamp = yield cn.db("RadioTransmitter").collection("OwnCampaign");
                const result = yield colcamp.updateOne(query, newvalues);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Emission could not be added" + e.message);
            }
        });
    }
}
exports.DOwnCampaign = DOwnCampaign;
//TESTING
//var datei = new Date("July 22, 2020");
//var datef = new Date("December 30, 2020");
//var dateem = new Date("December 27, 2020");
//if (datei > datef) {
//    console.log('La fecha final tiene que ser mayor a la fecha inicial');
//}
//else
//{
//    console.log('Bien');
//}
//let dtprog = new Program("Viajar por Uruguay", "PabloJackie", "Musical", 150);
//var dtadv = new Advertiser(555, "sfasfasfsafas", "qweqwrqtqt", "0867686776");
//var em = new Emission(dtprog, dateem);
//var unalista = [];
////unalista.push(em);
////unalista.push(em);
//let dtec = new OwnCampaign("Celulares Android", datei, datef, 40, 6, dtadv, 500, unalista);
//dtec.listemision.push(em);
//DOwnCampaign.getInstance().addOCEmission(dtec).then(data => {
//    console.log(data)
//    DOwnCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)
//    });
//});
//DOwnCampaign.getInstance().getOCampaign("Celulares Android").then(campaign => {
//    console.log(campaign)
//    campaign.listemision.push(em);
//    DOwnCampaign.getInstance().addOCEmission(campaign).then(emi =>
//    {
//        console.log(emi);
//        DOwnCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)
//    });
//    })
//  });
//DOwnCampaign.getInstance().addOCampaign(dtec).then(data => {
//    console.log(data)
//    DOwnCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)
//    });
//});
//DOwnCampaign.getInstance().updateOCampaign(dtec).then(data => {
//    console.log(data)
//    DOwnCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)
//    });
//});
//DOwnCampaign.getInstance().deleteOCampaign(dtec).then(data => {
//    console.log(data)
//    DOwnCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)
//    });
//});
//DOwnCampaign.getInstance().getOCampaign("Celulares Android").then(data => {
//        console.log(data)
//  });
//DOwnCampaign.getInstance().getOCampaignsByNameLetter("Cel").then(data => {
//        console.log(data)
//    });
//DOwnCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)
//    });
//# sourceMappingURL=DOwnCampaign.js.map