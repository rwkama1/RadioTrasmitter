"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryData = void 0;
const DAdvertiser_1 = require("./class/DAdvertiser");
const DProgram_1 = require("./class/DProgram");
const DExternalCampaign_1 = require("./class/DExternalCampaign");
const DOwnCampaign_1 = require("./class/DOwnCampaign");
class FactoryData {
    static getDAdvertiser() {
        return (DAdvertiser_1.DAdvertiser.getInstance());
    }
    static getDProgram() {
        return (DProgram_1.DProgram.getInstance());
    }
    static getDExternalCampaign() {
        return (DExternalCampaign_1.DExternalCampaign.getInstance());
    }
    static getDOwnCampaign() {
        return (DOwnCampaign_1.DOwnCampaign.getInstance());
    }
}
exports.FactoryData = FactoryData;
//# sourceMappingURL=FactoryData.js.map