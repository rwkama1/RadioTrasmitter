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
exports.DAdvertiser = void 0;
const Conection_1 = require("./Conection");
const Advertiser_1 = require("../../shared/entityshared/Advertiser");
const dataexception_1 = require("../../shared/exceptions/dataexception");
class DAdvertiser {
    constructor() { }
    static getInstance() {
        if (!DAdvertiser.instancia) {
            DAdvertiser.instancia = new DAdvertiser();
        }
        return DAdvertiser.instancia;
    }
    getAdvertisers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                const collection = cn.db("RadioTransmitter").collection("Advertiser");
                const result = yield collection.find({}).toArray();
                let array = [];
                for (var p of result) {
                    var obj = new Advertiser_1.Advertiser(p.RutAn, p.NomAn, p.DirAn, p.TelAn);
                    array.push(obj);
                }
                return array;
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Advertisers could not be listed" + e.message);
            }
        });
    }
    getAdvertisersByNameLetter(expression) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var cn = yield Conection_1.Conexion.uri().connect();
                var query = { NomAn: { $regex: expression } };
                const collection = cn.db("RadioTransmitter").collection("Advertiser");
                const result = yield collection.find(query).toArray();
                let array = [];
                for (var p of result) {
                    var obj = new Advertiser_1.Advertiser(p.RutAn, p.NomAn, p.DirAn, p.TelAn);
                    array.push(obj);
                }
                return array;
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Advertisers could not be listed" + e.message);
            }
        });
    }
    getAdvertiser(rut) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = null;
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                const collection = cn.db("RadioTransmitter").collection("Advertiser");
                const p = yield collection.findOne({ RutAn: rut });
                if (p == null) {
                    return null;
                }
                obj = new Advertiser_1.Advertiser(p.RutAn, p.NomAn, p.DirAn, p.TelAn);
                return obj;
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Advertiser could not be searched (It is possible that the Advertiser is not in the system)");
            }
        });
    }
    addAdvertiser(dtadvertiser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                const coladvert = cn.db("RadioTransmitter").collection("Advertiser");
                const result = yield coladvert.insertOne(dtadvertiser);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Advertiser could not be added" + e.message);
            }
        });
    }
    deleteAdvertiser(dtadvertiser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var myquery = { RutAn: dtadvertiser.RutAnn };
                let cn = yield Conection_1.Conexion.uri().connect();
                const coladvert = cn.db("RadioTransmitter").collection("Advertiser");
                const result = yield coladvert.deleteOne(myquery);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Advertiser could not be deleted" + e.message);
            }
        });
    }
    updateAdvertiser(dtadvertiser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                let query = { RutAn: dtadvertiser.RutAnn };
                var newvalues = { $set: { NomAn: dtadvertiser.NomAnn, DirAn: dtadvertiser.DirAnn, TelAn: dtadvertiser.TelAnn } };
                const coladvert = cn.db("RadioTransmitter").collection("Advertiser");
                const result = yield coladvert.updateOne(query, newvalues);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Advertiser could not be updated" + e.message);
            }
        });
    }
}
exports.DAdvertiser = DAdvertiser;
//TESTING
//var dtadv = new Advertiser(555, "dfhdfhfdh", "sasafasfasf", "0867686776");
//DAdvertiser.getInstance().addAdvertiser(dtadv).then(data => {
//    console.log(data)
//    DAdvertiser.getInstance().getAdvertisers().then(data => {
//        console.log(data)
//    });
//});
//DAdvertiser.getInstance().deleteAdvertiser(dtadv).then(data => {
//    console.log(data)
//    DAdvertiser.getInstance().getAdvertisers().then(data => {
//        console.log(data)
//    });
//});
//DAdvertiser.getInstance().updateAdvertiser(dtadv).then(data => {
//    console.log(data)
//    DAdvertiser.getInstance().getAdvertisers().then(data => {
//        console.log(data)
//    });
//});
//DAdvertiser.getInstance().getAdvertiser(555).then(data => {
//      console.log(data)
//});
//DAdvertiser.getInstance().getAdvertisersByNameLetter("S").then(data => {
//        console.log(data)
//    });
//DAdvertiser.getInstance().getAdvertisers().then(data => {
//       console.log(data)
//   });
//# sourceMappingURL=DAdvertiser.js.map