import { Campaign } from "../../shared/entityshared/Campaign";
import { OwnCampaign } from "../../shared/entityshared/OwnCampaign";
import { ECampaign } from "../../shared/entityshared/ECampaign";

export interface ILCampaign {
    getOwnCampaigns(): Promise<OwnCampaign[]>;
    getECampaigns(): Promise<ECampaign[]>;
    getOCampaignByTitleLetter(expression: string): Promise<OwnCampaign[]>;
    getECampaignByTitleLetter(expression: string): Promise<ECampaign[]>;
    getCampaign(title: string): Promise<Campaign>;
    addCampaign(dtcampaign: Campaign): void;
    deleteCampaign(dtcampaign: Campaign): void;
    updateCampaign(dtcampaign: Campaign): void;
    addCEmission(dtcampaign: Campaign): void;
}
