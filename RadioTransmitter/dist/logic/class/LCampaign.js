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
exports.LCampaign = void 0;
const logicexception_1 = require("../../shared/exceptions/logicexception");
const OwnCampaign_1 = require("../../shared/entityshared/OwnCampaign");
const ECampaign_1 = require("../../shared/entityshared/ECampaign");
const FactoryData_1 = require("../../data/FactoryData");
const FactoryLogic_1 = require("../FactoryLogic");
class LCampaign {
    constructor() { }
    static getInstance() {
        if (!LCampaign.instancia) {
            LCampaign.instancia = new LCampaign();
        }
        return LCampaign.instancia;
    }
    //Validations
    validateTitle(title) {
        if (title.trim() === "") {
            throw new logicexception_1.LogicException("The title cannot be empty");
        }
    }
    validateAddCampaign(validateccampaign) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateTitle(validateccampaign.title);
            if (validateccampaign.advert === null) {
                throw new logicexception_1.LogicException("The Advertiser cannot be  empty");
            }
            let objsearchcampaign = yield this.getCampaign(validateccampaign.title);
            let objsearchadvertiser = yield FactoryData_1.FactoryData.getDAdvertiser().getAdvertiser(validateccampaign.advert.RutAnn);
            if (objsearchadvertiser == null) {
                throw new logicexception_1.LogicException("That Advertiser does not exist in the system ");
            }
            if (objsearchcampaign != null) {
                throw new logicexception_1.LogicException("That campaign already exists in the system ");
            }
            if (validateccampaign == null) {
                throw new logicexception_1.LogicException("The Campaign is empty ");
            }
            if (validateccampaign.mentions < 1) {
                throw new logicexception_1.LogicException("The number of mentions must be greater than 0 ");
            }
            if (validateccampaign.duration < 1) {
                throw new logicexception_1.LogicException("The duration of the spot in seconds must be greater than 0");
            }
            if (validateccampaign.datei === null) {
                throw new logicexception_1.LogicException("The start date cannot be empty");
            }
            if (validateccampaign.datef === null) {
                throw new logicexception_1.LogicException("The end date cannot be empty");
            }
            if (validateccampaign.datei >= validateccampaign.datef) {
                throw new logicexception_1.LogicException("The end date must be greater than the start date of the campaign");
            }
            if (validateccampaign instanceof OwnCampaign_1.OwnCampaign) {
                let owncampaign = validateccampaign;
                if (owncampaign.cost < 1) {
                    throw new logicexception_1.LogicException("The production cost of the own campaign must be greater than 0");
                }
            }
            if (validateccampaign instanceof ECampaign_1.ECampaign) {
                let externalcampaign = validateccampaign;
                if (externalcampaign.producer.trim() === "") {
                    throw new logicexception_1.LogicException("The producer of the external campaign cannot be empty");
                }
            }
        });
    }
    validateUpdateCampaign(validateccampaign) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateTitle(validateccampaign.title);
            if (validateccampaign.advert === null) {
                throw new logicexception_1.LogicException("The Advertiser cannot be  empty");
            }
            let objsearchcampaign = yield this.getCampaign(validateccampaign.title);
            let objsearchadvertiser = yield FactoryData_1.FactoryData.getDAdvertiser().getAdvertiser(validateccampaign.advert.RutAnn);
            if (objsearchadvertiser == null) {
                throw new logicexception_1.LogicException("That Advertiser does not exist in the system ");
            }
            if (objsearchcampaign == null) {
                throw new logicexception_1.LogicException("That campaign does not exist in the system");
            }
            if (validateccampaign == null) {
                throw new logicexception_1.LogicException("The Campaign is empty ");
            }
            if (validateccampaign.mentions < 1) {
                throw new logicexception_1.LogicException("The number of mentions must be greater than 0 ");
            }
            if (validateccampaign.duration < 1) {
                throw new logicexception_1.LogicException("The duration of the spot in seconds must be greater than 0");
            }
            if (validateccampaign.datei === null) {
                throw new logicexception_1.LogicException("The start date cannot be empty");
            }
            if (validateccampaign.datef === null) {
                throw new logicexception_1.LogicException("The end date cannot be empty");
            }
            if (validateccampaign.datei >= validateccampaign.datef) {
                throw new logicexception_1.LogicException("The end date must be greater than the start date of the campaign");
            }
            if (validateccampaign instanceof OwnCampaign_1.OwnCampaign) {
                let owncampaign = validateccampaign;
                if (owncampaign.cost < 1) {
                    throw new logicexception_1.LogicException("The production cost of the own campaign must be greater than 0");
                }
            }
            if (validateccampaign instanceof ECampaign_1.ECampaign) {
                let externalcampaign = validateccampaign;
                if (externalcampaign.producer.trim() === "") {
                    throw new logicexception_1.LogicException("The producer of the external campaign cannot be empty");
                }
            }
        });
    }
    validateDeleteCampaign(validateccampaign) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateTitle(validateccampaign.title);
            let objsearch = yield this.getCampaign(validateccampaign.title);
            if (objsearch == null) {
                throw new logicexception_1.LogicException("That campaign does not exist in the system ");
            }
        });
    }
    validateEmission(validateemision) {
        return __awaiter(this, void 0, void 0, function* () {
            let objsearchcamp = yield this.getCampaign(validateemision.title);
            let lastelementemision = validateemision.listemision[validateemision.listemision.length - 1];
            let nmentions = objsearchcamp.countdateofequalemission(lastelementemision.dateem);
            let emisionprogram = yield FactoryLogic_1.FactoryLogic.getLogicProgram().getProgram(lastelementemision.programem.name);
            this.validateTitle(validateemision.title);
            if (validateemision == null) {
                throw new logicexception_1.LogicException("The Campaign is empty ");
            }
            if (lastelementemision.programem === null) {
                throw new logicexception_1.LogicException("The Program is empty ");
            }
            if (emisionprogram == null) {
                throw new logicexception_1.LogicException("The entered program does not exist");
            }
            if (objsearchcamp == null) {
                throw new logicexception_1.LogicException("The entered campaign does not exist");
            }
            if (lastelementemision.dateem === null) {
                throw new logicexception_1.LogicException("The mention date cannot be empty ");
            }
            if (objsearchcamp.datei > lastelementemision.dateem) {
                throw new logicexception_1.LogicException("The mention date cannot be less than the campaign start date ");
            }
            if (objsearchcamp.datef < lastelementemision.dateem) {
                throw new logicexception_1.LogicException("The mention date cannot be greater than the end date of the campaign ");
            }
            if (objsearchcamp.mentions <= nmentions) {
                throw new logicexception_1.LogicException("The number of daily mentions cannot be exceeded for the indicated date ");
            }
        });
    }
    //-------------------------------------------------
    getOwnCampaigns() {
        return __awaiter(this, void 0, void 0, function* () {
            let listaownc = yield FactoryData_1.FactoryData.getDOwnCampaign().getOwnCampaigns();
            return listaownc;
        });
    }
    getECampaigns() {
        return __awaiter(this, void 0, void 0, function* () {
            let listaecam = yield FactoryData_1.FactoryData.getDExternalCampaign().getECampaigns();
            return listaecam;
        });
    }
    getOCampaignByTitleLetter(expression) {
        return __awaiter(this, void 0, void 0, function* () {
            if (expression.length == 0) {
                var lista = yield FactoryData_1.FactoryData.getDOwnCampaign().getOwnCampaigns();
                return lista;
            }
            var listexp = yield FactoryData_1.FactoryData.getDOwnCampaign().getOCampaignsByNameLetter(expression);
            return listexp;
        });
    }
    getECampaignByTitleLetter(expression) {
        return __awaiter(this, void 0, void 0, function* () {
            if (expression.length == 0) {
                var lista = yield FactoryData_1.FactoryData.getDExternalCampaign().getECampaigns();
                return lista;
            }
            var listexp = yield FactoryData_1.FactoryData.getDExternalCampaign().getECampaignsByNameLetter(expression);
            return listexp;
        });
    }
    getCampaign(title) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateTitle(title);
            let searchCampaign;
            searchCampaign = yield FactoryData_1.FactoryData.getDExternalCampaign().getECampaign(title);
            if (searchCampaign == null) {
                searchCampaign = yield FactoryData_1.FactoryData.getDOwnCampaign().getOCampaign(title);
            }
            return searchCampaign;
        });
    }
    addCampaign(dtcampaign) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateAddCampaign(dtcampaign);
            if (dtcampaign instanceof OwnCampaign_1.OwnCampaign) {
                FactoryData_1.FactoryData.getDOwnCampaign().addOCampaign(dtcampaign);
            }
            if (dtcampaign instanceof ECampaign_1.ECampaign) {
                FactoryData_1.FactoryData.getDExternalCampaign().addECampaign(dtcampaign);
            }
        });
    }
    deleteCampaign(dtcampaign) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateDeleteCampaign(dtcampaign);
            if (dtcampaign instanceof OwnCampaign_1.OwnCampaign) {
                FactoryData_1.FactoryData.getDOwnCampaign().deleteOCampaign(dtcampaign);
            }
            if (dtcampaign instanceof ECampaign_1.ECampaign) {
                FactoryData_1.FactoryData.getDExternalCampaign().deleteECampaign(dtcampaign);
            }
        });
    }
    updateCampaign(dtcampaign) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateUpdateCampaign(dtcampaign);
            if (dtcampaign instanceof OwnCampaign_1.OwnCampaign) {
                FactoryData_1.FactoryData.getDOwnCampaign().updateOCampaign(dtcampaign);
            }
            if (dtcampaign instanceof ECampaign_1.ECampaign) {
                FactoryData_1.FactoryData.getDExternalCampaign().updateECampaign(dtcampaign);
            }
        });
    }
    addCEmission(dtcampaign) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateEmission(dtcampaign);
            if (dtcampaign instanceof OwnCampaign_1.OwnCampaign) {
                FactoryData_1.FactoryData.getDOwnCampaign().addOCEmission(dtcampaign);
            }
            if (dtcampaign instanceof ECampaign_1.ECampaign) {
                FactoryData_1.FactoryData.getDExternalCampaign().addECEmission(dtcampaign);
            }
        });
    }
}
exports.LCampaign = LCampaign;
//TESTING
//LCampaign.getInstance().getECampaigns().then(data => {
//        console.log(data)
//});
//LCampaign.getInstance().getOwnCampaigns().then(data => {
//    console.log(data)
//});
//LCampaign.getInstance().getECampaignByTitleLetter("okok").then(data => {
//    console.log(data)
//});
//LCampaign.getInstance().getOCampaignByTitleLetter("C").then(data => {
//    console.log(data)
//});
//LCampaign.getInstance().getOCampaignByTitleLetter("C").then(data => {
//    console.log(data)
//});
//LCampaign.getInstance().getCampaign("Celular Android").then(data => {
//    console.log(data)
//});
//let datei = new Date("july 22, 2020");
//let datef = new Date("december 30, 2020");
//let dateem = new Date("December 28, 2020");
//let dtprog = new Program("Viajar por Uruguay", "PabloJackie", "Musical", 150);
//LCampaign.getInstance().getCampaign("dff").then(data => {
//    console.log(data)
//    let em = new Emission(dtprog, dateem);
//    data.listemision.push(em);
//    LCampaign.getInstance().addCEmission(data).then(data => {
//        console.log("Emission Added")
//    });;
//});
//let em = new Emission(dtprog, dateem);
//let datatypeAdvertiser = new Advertiser(89878, "NewAdvertiser", "Venezuela 154 block 7", "545556546");
//let dtec = new ECampaign("dff", datei, datef, 40, 3, datatypeAdvertiser, "Producer", null);
//    LCampaign.getInstance().addCampaign(dtec).then(data => {
//        console.log("Campaign Added")
//        LCampaign.getInstance().getECampaigns().then(data => {
//        console.log(data)
//});
// });
//LCampaign.getInstance().updateCampaign(dtec)
//    .then(data => {
//        console.log("Campaign Updated")
//        LCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)
//});
//    });;
//LCampaign.getInstance().deleteCampaign(dtec)
//    .then(data => {
//        console.log("Campaign Deleted")
//        LCampaign.getInstance().getOwnCampaigns().then(data => {
//            console.log(data)
//        });
//    });;
//LCampaign.getInstance().getCampaign("df").then(data => {
//    console.log(data.CalculatePrice())
//});
//# sourceMappingURL=LCampaign.js.map