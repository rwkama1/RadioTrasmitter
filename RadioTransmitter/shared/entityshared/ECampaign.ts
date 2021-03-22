import { Campaign } from "./Campaign";
import { Emission } from "./Emission";
import { Advertiser } from "./Advertiser";

export class ECampaign extends Campaign {
   
    private _producer: string;
    public get producer(): string {
        return this._producer;
    }
    public set producer(value: string) {
        this._producer = value;
    }
    constructor(ctitle: string, cdatei: Date, cdatef: Date, cduration: number, cmentions: number, cadver: Advertiser, eproducer: string, clistem: Emission[]) {

        super( ctitle, cdatei, cdatef, cduration, cmentions, cadver,clistem);
        this.producer = eproducer;
    }
    public CalculatePrice() {
        let listem = this.listemision;
        let totalprice = 0;
        let numberofmentionsregister = listem.length;
        let durationspod = this.duration;
        let pricepersecond = 0;
        if (listem.length==0)
        {
            pricepersecond = 0;
        }
        for (let emision of listem)
        {
            pricepersecond = pricepersecond + emision._programem._pricexseg;
        }
        totalprice = durationspod * pricepersecond * numberofmentionsregister;
        return totalprice;


    }
}