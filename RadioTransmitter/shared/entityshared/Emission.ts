
import { Program } from "./Program";

export class Emission {
  
    public _programem: Program;
    public get programem(): Program {
        return this._programem;
    }
    public set programem(value: Program) {
        this._programem = value;
    }
    public _dateem: Date;
    public get dateem(): Date {
        return this._dateem;
    }
    public set dateem(value: Date) {
        this._dateem = value;
    }
    constructor( emprogram: Program,edateemi:Date) {

      
        this.programem = emprogram;
        this.dateem = edateemi;
      
    }



}
