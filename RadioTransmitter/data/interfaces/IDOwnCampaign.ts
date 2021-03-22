import { OwnCampaign } from "../../shared/entityshared/OwnCampaign";

export interface IDOwnCampaign {
    getOwnCampaigns(): Promise<OwnCampaign[]>;
    getOCampaignsByNameLetter(expression: string): Promise<OwnCampaign[]>;
    getOCampaign(title: string): Promise<OwnCampaign>;
    addOCampaign(dtoc: OwnCampaign);
    deleteOCampaign(dtoc: OwnCampaign);
    updateOCampaign(dtoc: OwnCampaign);
    addOCEmission(dtec: OwnCampaign)
}
