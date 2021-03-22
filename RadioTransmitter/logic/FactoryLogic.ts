import { ILAdvertiser } from "./interfaces/ILAdvertiser";
import { LAdvertiser } from "./class/LAdvertiser";
import { ILProgram } from "./interfaces/ILProgram";
import { LProgram } from "./class/LProgram";
import { LCampaign } from "./class/LCampaign";
import { ILCampaign } from "./interfaces/ILCampaign";


export class FactoryLogic {
    public static getLogicAdvertiser(): ILAdvertiser {
        return (LAdvertiser.getInstance());
    }
    public static getLogicProgram(): ILProgram {
        return (LProgram.getInstance());
    }
    public static getLogicCampaign(): ILCampaign {
        return (LCampaign.getInstance());
    }
}
