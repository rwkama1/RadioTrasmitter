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
exports.DExternalCampaign = void 0;
const ECampaign_1 = require("../../shared/entityshared/ECampaign");
const Conection_1 = require("./Conection");
const dataexception_1 = require("../../shared/exceptions/dataexception");
class DExternalCampaign {
    constructor() { }
    static getInstance() {
        if (!DExternalCampaign.instancia) {
            DExternalCampaign.instancia = new DExternalCampaign();
        }
        return DExternalCampaign.instancia;
    }
    getECampaigns() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                const collection = cn.db("RadioTransmitter").collection("ExternalCampaign");
                const result = yield collection.find({}).toArray();
                let array = [];
                for (var p of result) {
                    var obj = new ECampaign_1.ECampaign(p._title, p._datei, p._datef, p._duration, p._mentions, p._advert, p._producer, p._listemision);
                    array.push(obj);
                }
                return array;
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("External Campaign could not be listed" + e.message);
            }
        });
    }
    getECampaignsByNameLetter(expression) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var cn = yield Conection_1.Conexion.uri().connect();
                var query = { _title: { $regex: expression } };
                const collection = cn.db("RadioTransmitter").collection("ExternalCampaign");
                const result = yield collection.find(query).toArray();
                let array = [];
                for (var p of result) {
                    var obj = new ECampaign_1.ECampaign(p._title, p._datei, p._datef, p._duration, p._mentions, p._advert, p._producer, p._listemision);
                    array.push(obj);
                }
                return array;
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("External Campaign could not be listed" + e.message);
            }
        });
    }
    getECampaign(title) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = null;
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                let collection = cn.db("RadioTransmitter").collection("ExternalCampaign");
                let p = yield collection.findOne({ _title: title });
                if (p == null) {
                    return null;
                }
                obj = new ECampaign_1.ECampaign(p._title, p._datei, p._datef, p._duration, p._mentions, p._advert, p._producer, p._listemision);
                return obj;
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("External Campaign could not be searched (It is possible that the ECampaign is not in the system)" + e.message);
            }
        });
    }
    addECampaign(dtec) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                dtec.listemision = [];
                let cn = yield Conection_1.Conexion.uri().connect();
                const coladvert = cn.db("RadioTransmitter").collection("ExternalCampaign");
                const result = yield coladvert.insertOne(dtec);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("External Campaign could not be added" + e.message);
            }
        });
    }
    deleteECampaign(dtec) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                var query = { _title: dtec.title };
                const coladvert = cn.db("RadioTransmitter").collection("ExternalCampaign");
                const result = yield coladvert.deleteOne(query);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("External Campaign could not be deleted" + e.message);
            }
        });
    }
    updateECampaign(dtec) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                let query = { _title: dtec.title };
                var newvalues = { $set: { _datei: dtec.datei, _datef: dtec.datef, dtec, _duration: dtec.duration, _mentions: dtec.mentions, _advert: dtec.advert, _producer: dtec.producer } };
                const coladvert = cn.db("RadioTransmitter").collection("ExternalCampaign");
                const result = yield coladvert.updateOne(query, newvalues);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("External Campaign could not be updated" + e.message);
            }
        });
    }
    //Emision 
    addECEmission(dtec) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let titlecam = { _title: dtec.title };
                let cn = yield Conection_1.Conexion.uri().connect();
                var newvalues = { $set: { _listemision: dtec.listemision } };
                const colcamp = yield cn.db("RadioTransmitter").collection("ExternalCampaign");
                const result = yield colcamp.updateOne(titlecam, newvalues);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Emission could not be added" + e.message);
            }
        });
    }
}
exports.DExternalCampaign = DExternalCampaign;
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
//let dtprog = new Program("Top 10", "PabloJackie", "Musical", 150);
//var dtadv = new Advertiser(555, "sfasfasfsafas", "qweqwrqtqt", "0867686776");
//var em = new Emission(dtprog, dateem);
let dateem = new Date("December 27, 2020");
//var unalista=[];
////unalista.push(em);
////unalista.push(em);
//let dtec = new ECampaign("Cine Anime", datei, datef, 40, 4, dtadv, "Vitamina",unalista);
//dtec.listemision.push(em);
//DExternalCampaign.getInstance().addECEmission(dtec).then(data => {
//    console.log(data)
//    DExternalCampaign.getInstance().getECampaigns().then(data => {
//        console.log(data)
//    });
//});
//DExternalCampaign.getInstance().getECampaign("Cine Anime").then(campaign => {
//    console.log(campaign)
//    campaign.listemision.push(em);
//    DExternalCampaign.getInstance().addECEmission(campaign).then(emi => {
//        console.log(emi);
//        DExternalCampaign.getInstance().getECampaigns().then(data => {
//            console.log(data)
//        });
//    })
//});
//DExternalCampaign.getInstance().addECampaign(dtec).then(data => {
//    console.log(data)
//    DExternalCampaign.getInstance().getECampaigns().then(data => {
//        console.log(data)
//    });
//});
//DExternalCampaign.getInstance().updateECampaign(dtec).then(data => {
//    console.log(data)
//    DExternalCampaign.getInstance().getECampaigns().then(data => {
//        console.log(data)
//    });
//});
//DExternalCampaign.getInstance().deleteECampaign(dtec).then(data => {
//    console.log(data)
//    DExternalCampaign.getInstance().getECampaigns().then(data => {
//        console.log(data)
//    });
//});
//DExternalCampaign.getInstance().getECampaign("Cine Anime").then(data => {
//        console.log(data)
//  });
//DExternalCampaign.getInstance().getECampaignsByNameLetter("Ci").then(data => {
//        console.log(data)
//    });
//DExternalCampaign.getInstance().getECampaigns().then(data => {
//    console.log(data)
//});
//# sourceMappingURL=DExternalCampaign.js.map