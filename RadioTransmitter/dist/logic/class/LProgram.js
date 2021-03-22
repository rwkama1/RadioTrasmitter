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
exports.LProgram = void 0;
const logicexception_1 = require("../../shared/exceptions/logicexception");
const Program_1 = require("../../shared/entityshared/Program");
const FactoryData_1 = require("../../data/FactoryData");
class LProgram {
    constructor() { }
    static getInstance() {
        if (!LProgram.instancia) {
            LProgram.instancia = new LProgram();
        }
        return LProgram.instancia;
    }
    //Validations
    validateName(name) {
        if (name.trim() === "") {
            throw new logicexception_1.LogicException("The name cannot be empty");
        }
    }
    validateAddProgram(validateprogram) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateName(validateprogram.name);
            let objsearchpro = yield this.getProgram(validateprogram.name);
            if (validateprogram == null) {
                throw new logicexception_1.LogicException("The Program is empty ");
            }
            if (objsearchpro != null) {
                throw new logicexception_1.LogicException("That Program already exists in the system");
            }
            if (validateprogram.producer.trim() === "") {
                throw new logicexception_1.LogicException("The producer cannot be empty");
            }
            if (validateprogram.type.trim() === "") {
                throw new logicexception_1.LogicException("The type cannot be empty");
            }
            if (validateprogram.pricexseg < 1) {
                throw new logicexception_1.LogicException("The price per second must be greater than 0");
            }
        });
    }
    validateDeleteProgram(validateprogram) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateName(validateprogram.name);
            let objsearchpro = yield this.getProgram(validateprogram.name);
            if (validateprogram == null) {
                throw new logicexception_1.LogicException("The Program is empty ");
            }
            if (objsearchpro == null) {
                throw new logicexception_1.LogicException("That Program does not exist in the system ");
            }
        });
    }
    validateUpdateProgram(validateprogram) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateName(validateprogram.name);
            let objsearchpro = yield this.getProgram(validateprogram.name);
            if (validateprogram == null) {
                throw new logicexception_1.LogicException("The Program is empty ");
            }
            if (objsearchpro == null) {
                throw new logicexception_1.LogicException("That Program does not exist in the system ");
            }
            if (validateprogram.producer.trim() === "") {
                throw new logicexception_1.LogicException("The producer cannot be empty");
            }
            if (validateprogram.type.trim() === "") {
                throw new logicexception_1.LogicException("The type cannot be empty");
            }
            if (validateprogram.pricexseg < 1) {
                throw new logicexception_1.LogicException("The price per second must be greater than 0");
            }
        });
    }
    //---------
    getPrograms() {
        return __awaiter(this, void 0, void 0, function* () {
            var listaprogram = yield FactoryData_1.FactoryData.getDProgram().getPrograms();
            return listaprogram;
        });
    }
    getProgram(name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateName(name);
            var searchprogram = yield FactoryData_1.FactoryData.getDProgram().getProgram(name);
            return searchprogram;
        });
    }
    getProgramsByNameLetter(expression) {
        return __awaiter(this, void 0, void 0, function* () {
            if (expression.length == 0) {
                var lista = yield FactoryData_1.FactoryData.getDProgram().getPrograms();
                return lista;
            }
            var listexp = yield FactoryData_1.FactoryData.getDProgram().getProgramsByNameLetter(expression);
            return listexp;
        });
    }
    addProgram(dtprogram) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateAddProgram(dtprogram);
            if (dtprogram.type == "Musical" || dtprogram.type == "Varieties" || dtprogram.type == "Journalistic") {
                FactoryData_1.FactoryData.getDProgram().addProgram(dtprogram);
            }
            else {
                throw new logicexception_1.LogicException("The program type must be Musical, Journalistic, or Varieties only");
            }
        });
    }
    deleteProgram(dtprogram) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateDeleteProgram(dtprogram);
            FactoryData_1.FactoryData.getDProgram().deleteProgram(dtprogram);
        });
    }
    updateProgram(dtprogram) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validateUpdateProgram(dtprogram);
            if (dtprogram.type == "Musical" || dtprogram.type == "Varieties" || dtprogram.type == "Journalistic") {
                FactoryData_1.FactoryData.getDProgram().updateProgram(dtprogram);
            }
            else {
                throw new logicexception_1.LogicException("The program type must be Musical, Journalistic, or Varieties only");
            }
        });
    }
}
exports.LProgram = LProgram;
//Testing
let datatypeProgram = new Program_1.Program("NewPrograms", "NewProducer", "Journalistic", 400);
//LProgram.getInstance().addProgram(datatypeProgram)
//.then(data => {
//        console.log(data)
//    });
//LProgram.getInstance().deleteProgram(datatypeProgram)
//.then(data => {
//        console.log(data)
//    });
//LProgram.getInstance().updateProgram(datatypeProgram)
//.then(data => {
//        console.log(data)
//    });
//# sourceMappingURL=LProgram.js.map