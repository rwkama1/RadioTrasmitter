export class Program {
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    private _producer: string;
    public get producer(): string {
        return this._producer;
    }
    public set producer(value: string) {
        this._producer = value;
    }
    private _type: string;
    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
       
         this._type = value; 
       
    }
    public _pricexseg: number;
    public get pricexseg(): number {
        return this._pricexseg;
    }
    public set pricexseg(value: number) {
        this._pricexseg = value;
    }

    constructor(pname: string, pproducer: string, ptype: string, ppricexseg: number) {
       
        this.name = pname;
        this.producer = pproducer;
        this.type = ptype;
        this.pricexseg = ppricexseg;
        
    }



}
