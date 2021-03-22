"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECampaign = void 0;
const Campaign_1 = require("./Campaign");
class ECampaign extends Campaign_1.Campaign {
    constructor(ctitle, cdatei, cdatef, cduration, cmentions, cadver, eproducer, clistem) {
        super(ctitle, cdatei, cdatef, cduration, cmentions, cadver, clistem);
        this.producer = eproducer;
    }
    get producer() {
        return this._producer;
    }
    set producer(value) {
        this._producer = value;
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
        totalprice = durationspod * pricepersecond * numberofmentionsregister;
        return totalprice;
    }
}
exports.ECampaign = ECampaign;
//# sourceMappingURL=ECampaign.js.map