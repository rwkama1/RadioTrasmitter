import { ECampaign } from "../../shared/entityshared/ECampaign";

export interface IDExternalCampaign {
    getECampaigns(): Promise<ECampaign[]>;
    getECampaignsByNameLetter(expression: string): Promise<ECampaign[]>;
    getECampaign(title: string): Promise<ECampaign>;
    addECampaign(dtec: ECampaign);
    deleteECampaign(dtec: ECampaign);
    updateECampaign(dtec: ECampaign);

    addECEmission(dtec: ECampaign);
}