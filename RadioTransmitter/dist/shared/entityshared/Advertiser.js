"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advertiser = void 0;
class Advertiser {
    constructor(pRut, pNombre, pDireccion, pTelefono) {
        this.RutAnn = pRut;
        this.NomAnn = pNombre;
        this.DirAnn = pDireccion;
        this.TelAnn = pTelefono;
    }
    get RutAnn() {
        return this.RutAn;
    }
    set RutAnn(value) {
        this.RutAn = value;
    }
    get NomAnn() {
        return this.NomAn;
    }
    set NomAnn(value) {
        this.NomAn = value;
    }
    get DirAnn() {
        return this.DirAn;
    }
    set DirAnn(value) {
        this.DirAn = value;
    }
    get TelAnn() {
        return this.TelAn;
    }
    set TelAnn(value) {
        this.TelAn = value;
    }
}
exports.Advertiser = Advertiser;
//# sourceMappingURL=Advertiser.js.map