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
exports.LAdvertiser = void 0;
const logicexception_1 = require("../../shared/exceptions/logicexception");
const FactoryData_1 = require("../../data/FactoryData");
class LAdvertiser {
    constructor() { }
    static getInstance() {
        if (!LAdvertiser.instancia) {
            LAdvertiser.instancia = new LAdvertiser();
        }
        return LAdvertiser.instancia;
    }
    //Validations
    validateRut(rut) {
        if (rut < 1) {
            throw new logicexception_1.LogicException("The rut must be greater than or equal to 1");
        }
    }
    validateAddAdvertiser(validateadvertiser) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateRut(validateadvertiser.RutAnn);
            let objsearchadv = yield this.getAdvertiser(validateadvertiser.RutAnn);
            if (validateadvertiser == null) {
                throw new logicexception_1.LogicException("The Advertiser is empty ");
            }
            if (objsearchadv != null) {
                throw new logicexception_1.LogicException("That Advertiser already exists in the system");
            }
            if (validateadvertiser.NomAnn.trim() === "") {
                throw new logicexception_1.LogicException("The name cannot be empty");
            }
            if (validateadvertiser.DirAnn.trim() === "") {
                throw new logicexception_1.LogicException("The address cannot be empty");
            }
            if (validateadvertiser.TelAnn.trim() === "") {
                throw new logicexception_1.LogicException("The phone number cannot be empty");
            }
            if (!validateadvertiser.TelAnn.match(/^\d+$/)) {
                throw new logicexception_1.LogicException("The phone number can only contains number");
            }
        });
    }
    validateUpdateAdvertiser(validateadvertiser) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateRut(validateadvertiser.RutAnn);
            let objsearchadv = yield this.getAdvertiser(validateadvertiser.RutAnn);
            if (validateadvertiser == null) {
                throw new logicexception_1.LogicException("The Advertiser is empty ");
            }
            if (objsearchadv == null) {
                throw new logicexception_1.LogicException("That Advertiser does not exist in the system ");
            }
            if (validateadvertiser.NomAnn.trim() === "") {
                throw new logicexception_1.LogicException("The name cannot be empty");
            }
            if (validateadvertiser.DirAnn.trim() === "") {
                throw new logicexception_1.LogicException("The address cannot be empty");
            }
            if (validateadvertiser.TelAnn.trim() === "") {
                throw new logicexception_1.LogicException("The phone number cannot be empty");
            }
            if (!validateadvertiser.TelAnn.match(/^\d+$/)) {
                throw new logicexception_1.LogicException("The phone number can only contains number");
            }
        });
    }
    validateDeleteAdvertiser(validateadvertiser) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateRut(validateadvertiser.RutAnn);
            let objsearchadv = yield this.getAdvertiser(validateadvertiser.RutAnn);
            if (validateadvertiser == null) {
                throw new logicexception_1.LogicException("The Advertiser is empty ");
            }
            if (objsearchadv == null) {
                throw new logicexception_1.LogicException("That Advertiser does not exist in the system ");
            }
        });
    }
    //---------
    getAdvertisers() {
        return __awaiter(this, void 0, void 0, function* () {
            var listad = yield FactoryData_1.FactoryData.getDAdvertiser().getAdvertisers();
            return listad;
        });
    }
    getAdvertiser(rut) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateRut(rut);
            var searchadvertiser = yield FactoryData_1.FactoryData.getDAdvertiser().getAdvertiser(rut);
            return searchadvertiser;
        });
    }
    getAdvertiserByNameLetter(expression) {
        return __awaiter(this, void 0, void 0, function* () {
            if (expression.length == 0) {
                var lista = yield FactoryData_1.FactoryData.getDAdvertiser().getAdvertisers();
                return lista;
            }
            var listexp = yield FactoryData_1.FactoryData.getDAdvertiser().getAdvertisersByNameLetter(expression);
            return listexp;
        });
    }
    addAdvertiser(dtadvertiser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateAddAdvertiser(dtadvertiser);
            FactoryData_1.FactoryData.getDAdvertiser().addAdvertiser(dtadvertiser);
        });
    }
    deleteAdvertiser(dtadvertiser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateDeleteAdvertiser(dtadvertiser);
            FactoryData_1.FactoryData.getDAdvertiser().deleteAdvertiser(dtadvertiser);
        });
    }
    updateAdvertiser(dtadvertiser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateUpdateAdvertiser(dtadvertiser);
            FactoryData_1.FactoryData.getDAdvertiser().updateAdvertiser(dtadvertiser);
        });
    }
}
exports.LAdvertiser = LAdvertiser;
//TESTING
//LAdvertiser.getInstance().getAdvertisers().then(data => {
//        console.log(data)
//    });
//LAdvertiser.getInstance().getAdvertiserByNameLetter("").then(data => {
//        console.log(data)
//    });
//LAdvertiser.getInstance().getAdvertiser(555).then(data => {
//    console.log(data)
//    });
//let datatypeAdvertiser = new Advertiser(898788, "NewAdvertiser", "Vasd", "545556546");
//LAdvertiser.getInstance().addAdvertiser(datatypeAdvertiser).then(data => {
//        console.log(data)
//    });
//LAdvertiser.getInstance().deleteAdvertiser(datatypeAdvertiser).then(data => {
//        console.log(data)
//    });
//LAdvertiser.getInstance().updateAdvertiser(datatypeAdvertiser).then(data => {
//        console.log(data)
//    });
//# sourceMappingURL=LAdvertiser.js.map