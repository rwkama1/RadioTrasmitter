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
exports.DProgram = void 0;
const Program_1 = require("../../shared/entityshared/Program");
const Conection_1 = require("./Conection");
const dataexception_1 = require("../../shared/exceptions/dataexception");
class DProgram {
    constructor() { }
    static getInstance() {
        if (!DProgram.instancia) {
            DProgram.instancia = new DProgram();
        }
        return DProgram.instancia;
    }
    getPrograms() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                const collection = cn.db("RadioTransmitter").collection("Program");
                const result = yield collection.find({}).toArray();
                let array = [];
                for (var p of result) {
                    var obj = new Program_1.Program(p._name, p._producer, p._type, p._pricexseg);
                    array.push(obj);
                }
                return array;
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Program could not be listed" + e.message);
            }
        });
    }
    getProgramsByNameLetter(expression) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var cn = yield Conection_1.Conexion.uri().connect();
                var query = { _name: { $regex: expression } };
                const collection = cn.db("RadioTransmitter").collection("Program");
                const result = yield collection.find(query).toArray();
                let array = [];
                for (var p of result) {
                    var obj = new Program_1.Program(p._name, p._producer, p._type, p._pricexseg);
                    array.push(obj);
                }
                return array;
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Program could not be listed" + e.message);
            }
        });
    }
    getProgram(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                const collection = cn.db("RadioTransmitter").collection("Program");
                const p = yield collection.findOne({ _name: name });
                if (p == null) {
                    return null;
                }
                var obj = new Program_1.Program(p._name, p._producer, p._type, p._pricexseg);
                return obj;
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Program could not be searched (It is possible that the Program is not in the system)" + e.message);
            }
        });
    }
    addProgram(dtprogram) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                const coladvert = cn.db("RadioTransmitter").collection("Program");
                const result = yield coladvert.insertOne(dtprogram);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Program could not be added" + e.message);
            }
        });
    }
    deleteProgram(dtprogram) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var myquery = { _name: dtprogram.name };
                let cn = yield Conection_1.Conexion.uri().connect();
                const coladvert = cn.db("RadioTransmitter").collection("Program");
                const result = yield coladvert.deleteOne(myquery);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Program could not be deleted" + e.message);
            }
        });
    }
    updateProgram(dtprogram) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cn = yield Conection_1.Conexion.uri().connect();
                let query = { _name: dtprogram.name };
                var newvalues = { $set: { _type: dtprogram.type, _pricexseg: dtprogram.pricexseg, _producer: dtprogram.producer } };
                const coladvert = cn.db("RadioTransmitter").collection("Program");
                const result = yield coladvert.updateOne(query, newvalues);
                cn.close();
            }
            catch (e) {
                throw new dataexception_1.DataException("Program could not be updated" + e.message);
            }
        });
    }
}
exports.DProgram = DProgram;
//let dtprog = new Program("Top 10", "PabloJackie","Musical",150);
//DProgram.getInstance().addProgram(dtprog).then(data => {
//    console.log(data)
//    DProgram.getInstance().getPrograms().then(data => {
//        console.log(data)
//    });
//});
//DProgram.getInstance().deleteProgram(dtprog).then(data => {
//    console.log(data)
//    DProgram.getInstance().getPrograms().then(data => {
//        console.log(data)
//    });
//});
//DProgram.getInstance().updateProgram(dtprog).then(data => {
//    console.log(data)
//    DProgram.getInstance().getPrograms().then(data => {
//        console.log(data)
//    });
//});
//DProgram.getInstance().getProgram("Viajar por Uruguay").then(data => {
//        console.log(data)
//  });
//DProgram.getInstance().getProgramsByNameLetter("Ur").then(data => {
//        console.log(data)
//    });
//DProgram.getInstance().getPrograms().then(data => {
//        console.log(data)
//    });
//# sourceMappingURL=DProgram.js.map