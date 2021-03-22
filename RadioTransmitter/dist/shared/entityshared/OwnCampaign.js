"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnCampaign = void 0;
const Campaign_1 = require("./Campaign");
class OwnCampaign extends Campaign_1.Campaign {
    constructor(ctitle, cdatei, cdatef, cduration, cmentions, cadver, owncost, ownlistem) {
        super(ctitle, cdatei, cdatef, cduration, cmentions, cadver, ownlistem);
        this.cost = owncost;
    }
    get cost() {
        return this._cost;
    }
    set cost(value) {
        this._cost = value;
    }
    CalculatePrice() {
        let listem = this.listemision;
        let totalprice = 0;
        let numberofmentionsregister = listem.length;
        let durationspod = this.duration;
        let pricepersecond = 0;
        if (listem.length == 0) {
            pricepersecond = 0;
        }
        for (let emision of listem) {
            pricepersecond = pricepersecond + emision._programem._pricexseg;
        }
        totalprice = (durationspod * pricepersecond * numberofmentionsregister) + this.cost;
        return totalprice;
    }
}
exports.OwnCampaign = OwnCampaign;
//# sourceMappingURL=OwnCampaign.js.map