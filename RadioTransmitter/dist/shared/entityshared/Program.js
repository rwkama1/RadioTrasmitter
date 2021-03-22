"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
class Program {
    constructor(pname, pproducer, ptype, ppricexseg) {
        this.name = pname;
        this.producer = pproducer;
        this.type = ptype;
        this.pricexseg = ppricexseg;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get producer() {
        return this._producer;
    }
    set producer(value) {
        this._producer = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get pricexseg() {
        return this._pricexseg;
    }
    set pricexseg(value) {
        this._pricexseg = value;
    }
}
exports.Program = Program;
//# sourceMappingURL=Program.js.map