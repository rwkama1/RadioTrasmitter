import { IDAdvertiser } from "./interfaces/IDAdvertiser";
import { DAdvertiser } from "./class/DAdvertiser";
import { IDProgram } from "./interfaces/IDProgram";
import { DProgram } from "./class/DProgram";
import { IDExternalCampaign } from "./interfaces/IDExternalCampaign";
import { DExternalCampaign } from "./class/DExternalCampaign";
import { DOwnCampaign } from "./class/DOwnCampaign";
import { IDOwnCampaign } from "./interfaces/IDOwnCampaign";

export class FactoryData {
    public static getDAdvertiser(): IDAdvertiser {
        return (DAdvertiser.getInstance());
    }
    public static getDProgram(): IDProgram {
        return (DProgram.getInstance());
    }
    public static getDExternalCampaign(): IDExternalCampaign {
        return (DExternalCampaign.getInstance());
    }
    public static getDOwnCampaign(): IDOwnCampaign {
        return (DOwnCampaign.getInstance());
    }
}
