import { Advertiser } from "../../shared/entityshared/Advertiser";

export interface IDAdvertiser {
    getAdvertisers(): Promise<Advertiser[]>;
    getAdvertiser(rut: number): Promise<Advertiser>;
    getAdvertisersByNameLetter(expression: string): Promise<Advertiser[]>;
    addAdvertiser(dtadvertiser: Advertiser);
    deleteAdvertiser(dtadvertiser: Advertiser);
    updateAdvertiser(dtadvertiser: Advertiser);
}