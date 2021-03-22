"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaign = void 0;
class Campaign {
    constructor(ctitle, cdatei, cdatef, cduration, cmentions, cadver, clistem) {
        this.title = ctitle;
        this.datei = cdatei;
        this.datef = cdatef;
        this.duration = cduration;
        this.mentions = cmentions;
        this.advert = cadver;
        this.listemision = clistem;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get datei() {
        return this._datei;
    }
    set datei(value) {
        this._datei = value;
    }
    get datef() {
        return this._datef;
    }
    set datef(value) {
        this._datef = value;
    }
    get duration() {
        return this._duration;
    }
    set duration(value) {
        this._duration = value;
    }
    get advert() {
        return this._advert;
    }
    set advert(value) {
        this._advert = value;
    }
    get listemision() {
        return this._listemision;
    }
    set listemision(value) {
        this._listemision = value;
    }
    get mentions() {
        return this._mentions;
    }
    set mentions(value) {
        this._mentions = value;
    }
    countdateofequalemission(newdateemission) {
        let varlistemision = this.listemision;
        let numbermentions = 0;
        for (var em of varlistemision) {
            if (em._dateem.getDate() === newdateemission.getDate()) {
                numbermentions++;
            }
        }
        return numbermentions;
    }
}
exports.Campaign = Campaign;
//# sourceMappingURL=Campaign.js.map