"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryLogic = void 0;
const LAdvertiser_1 = require("./class/LAdvertiser");
const LProgram_1 = require("./class/LProgram");
const LCampaign_1 = require("./class/LCampaign");
class FactoryLogic {
    static getLogicAdvertiser() {
        return (LAdvertiser_1.LAdvertiser.getInstance());
    }
    static getLogicProgram() {
        return (LProgram_1.LProgram.getInstance());
    }
    static getLogicCampaign() {
        return (LCampaign_1.LCampaign.getInstance());
    }
}
exports.FactoryLogic = FactoryLogic;
//# sourceMappingURL=FactoryLogic.js.map