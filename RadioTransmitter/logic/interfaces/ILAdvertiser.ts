import { Advertiser } from "../../shared/entityshared/Advertiser";

export interface ILAdvertiser {
    getAdvertisers(): Promise<Advertiser[]>;
    getAdvertiser(rut: number): Promise<Advertiser>;
    getAdvertiserByNameLetter(expression: string): Promise<Advertiser[]>;
    addAdvertiser(dtadvertiser: Advertiser):void;
    deleteAdvertiser(dtadvertiser: Advertiser):void;
    updateAdvertiser(dtadvertiser: Advertiser):void;
}