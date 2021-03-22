import { ILCampaign } from "../interfaces/ILCampaign";
import { LogicException } from "../../shared/exceptions/logicexception";
import { Campaign } from "../../shared/entityshared/Campaign";
import { OwnCampaign } from "../../shared/entityshared/OwnCampaign";
import { ECampaign } from "../../shared/entityshared/ECampaign";
import { FactoryData } from "../../data/FactoryData";
import { Advertiser } from "../../shared/entityshared/Advertiser";
import { FactoryLogic } from "../FactoryLogic";
import { Emission } from "../../shared/entityshared/Emission";
import { Program } from "../../shared/entityshared/Program";



export class LCampaign implements ILCampaign{
    //SINGLETON
    private static instancia: LCampaign;
    private constructor() { }
    public static getInstance(): LCampaign {
        if (!LCampaign.instancia) {
            LCampaign.instancia = new LCampaign();
        }

        return LCampaign.instancia;
    }
    //Validations
    private validateTitle(title: string) {
        if (title.trim() === "") {
            throw new LogicException("The title cannot be empty");
        }
    }
    private async validateAddCampaign(validateccampaign: Campaign) {

        this.validateTitle(validateccampaign.title);
        if (validateccampaign.advert === null) {
            throw new LogicException("The Advertiser cannot be  empty");
        }
        let objsearchcampaign = await this.getCampaign(validateccampaign.title);
        let objsearchadvertiser = await FactoryData.getDAdvertiser().getAdvertiser(validateccampaign.advert.RutAnn);
       
        if (objsearchadvertiser == null) {
            throw new LogicException("That Advertiser does not exist in the system ");
        }

        if (objsearchcampaign != null)
        {
            throw new LogicException("That campaign already exists in the system ");
        }
        
        if (validateccampaign == null) {
            throw new LogicException("The Campaign is empty ");
        }
       
        if (validateccampaign.mentions<1) {
            throw new LogicException("The number of mentions must be greater than 0 ");
        }
        if (validateccampaign.duration <1) {
            throw new LogicException("The duration of the spot in seconds must be greater than 0");
        }
        if (validateccampaign.datei === null) {
            throw new LogicException("The start date cannot be empty");
        }
        if (validateccampaign.datef === null) {
            throw new LogicException("The end date cannot be empty");
        }
        if (validateccampaign.datei >= validateccampaign.datef) {
            throw new LogicException("The end date must be greater than the start date of the campaign");
        }
        if (validateccampaign instanceof OwnCampaign) {
            let owncampaign = validateccampaign as OwnCampaign;
            if (owncampaign.cost<1)
            {
                throw new LogicException("The production cost of the own campaign must be greater than 0");
            }
        }
        if (validateccampaign instanceof ECampaign) {
            let externalcampaign = validateccampaign as ECampaign;
            if (externalcampaign.producer.trim()==="") {
                throw new LogicException("The producer of the external campaign cannot be empty");
            }
        }
       
    }
    private async validateUpdateCampaign(validateccampaign: Campaign) {

        this.validateTitle(validateccampaign.title);
        if (validateccampaign.advert === null) {
            throw new LogicException("The Advertiser cannot be  empty");
        }
        let objsearchcampaign = await this.getCampaign(validateccampaign.title);
        let objsearchadvertiser = await FactoryData.getDAdvertiser().getAdvertiser(validateccampaign.advert.RutAnn);
       
        if (objsearchadvertiser == null) {
            throw new LogicException("That Advertiser does not exist in the system ");
        }
        if (objsearchcampaign == null) {
            throw new LogicException("That campaign does not exist in the system");
        }

        if (validateccampaign == null) {
            throw new LogicException("The Campaign is empty ");
        }
        if (validateccampaign.mentions < 1) {
            throw new LogicException("The number of mentions must be greater than 0 ");
        }
        if (validateccampaign.duration < 1) {
            throw new LogicException("The duration of the spot in seconds must be greater than 0");
        }
        if (validateccampaign.datei === null) {
            throw new LogicException("The start date cannot be empty");
        }
        if (validateccampaign.datef === null) {
            throw new LogicException("The end date cannot be empty");
        }
        if (validateccampaign.datei >= validateccampaign.datef) {
            throw new LogicException("The end date must be greater than the start date of the campaign");
        }
        if (validateccampaign instanceof OwnCampaign) {
            let owncampaign = validateccampaign as OwnCampaign;
            if (owncampaign.cost < 1) {
                throw new LogicException("The production cost of the own campaign must be greater than 0");
            }
        }
        if (validateccampaign instanceof ECampaign) {
            let externalcampaign = validateccampaign as ECampaign;
            if (externalcampaign.producer.trim() === "") {
                throw new LogicException("The producer of the external campaign cannot be empty");
            }
        }

    }
    private async validateDeleteCampaign(validateccampaign: Campaign) {

        this.validateTitle(validateccampaign.title);
        let objsearch = await this.getCampaign(validateccampaign.title);
        if (objsearch == null) {
            throw new LogicException("That campaign does not exist in the system ");
        }
    }
    private async validateEmission(validateemision: Campaign) {

        let objsearchcamp = await this.getCampaign(validateemision.title);
        let lastelementemision = validateemision.listemision[validateemision.listemision.length - 1];
        let nmentions = objsearchcamp.countdateofequalemission(lastelementemision.dateem);
        let emisionprogram = await FactoryLogic.getLogicProgram().getProgram(lastelementemision.programem.name);
        this.validateTitle(validateemision.title);

        if (validateemision == null) {
            throw new LogicException("The Campaign is empty ");
        }

        if (lastelementemision.programem === null) {
            throw new LogicException("The Program is empty ");
        }
        if (emisionprogram == null)
        {
            throw new LogicException("The entered program does not exist");
        }
        if (objsearchcamp == null) {
            throw new LogicException("The entered campaign does not exist");
        }
        if (lastelementemision.dateem === null) {
            throw new LogicException("The mention date cannot be empty ");
        }
        if (objsearchcamp.datei > lastelementemision.dateem) {
            throw new LogicException("The mention date cannot be less than the campaign start date ");
        }
        if (objsearchcamp.datef < lastelementemision.dateem) {
            throw new LogicException("The mention date cannot be greater than the end date of the campaign ");
        }
        if (objsearchcamp.mentions <= nmentions) {
            throw new LogicException("The number of daily mentions cannot be exceeded for the indicated date ");
        }
    }

    //-------------------------------------------------
    public async getOwnCampaigns(): Promise<OwnCampaign[]> {

        let listaownc = await FactoryData.getDOwnCampaign().getOwnCampaigns();
        return listaownc;
    }
    public async getECampaigns(): Promise<ECampaign[]> {

        let listaecam = await FactoryData.getDExternalCampaign().getECampaigns();
        return listaecam;
    }
    public async getOCampaignByTitleLetter(expression: string): Promise<OwnCampaign[]> {
        if (expression.length == 0) {
            var lista = await FactoryData.getDOwnCampaign().getOwnCampaigns();
            return lista;
        }
        var listexp = await FactoryData.getDOwnCampaign().getOCampaignsByNameLetter(expression);
        return listexp;
    }
    public async getECampaignByTitleLetter(expression: string): Promise<ECampaign[]> {
        if (expression.length == 0) {
            var lista = await FactoryData.getDExternalCampaign().getECampaigns();
            return lista;
        }
        var listexp = await FactoryData.getDExternalCampaign().getECampaignsByNameLetter(expression);
        return listexp;
    }
    public async getCampaign(title: string): Promise<Campaign> {
        this.validateTitle(title);
        let searchCampaign: Campaign;
         searchCampaign = await FactoryData.getDExternalCampaign().getECampaign(title);
        if (searchCampaign == null)
        {
            searchCampaign = await FactoryData.getDOwnCampaign().getOCampaign(title);
        }
        return searchCampaign
    }
    public async addCampaign(dtcampaign: Campaign) {
        await this.validateAddCampaign(dtcampaign);
        
        if (dtcampaign instanceof OwnCampaign)
        {
            FactoryData.getDOwnCampaign().addOCampaign(dtcampaign);
        }
        if (dtcampaign instanceof ECampaign)
        { FactoryData.getDExternalCampaign().addECampaign(dtcampaign); }
      
    }
    public async deleteCampaign(dtcampaign: Campaign) {
        await this.validateDeleteCampaign(dtcampaign);
        if (dtcampaign instanceof OwnCampaign) {
            FactoryData.getDOwnCampaign().deleteOCampaign(dtcampaign);
        }
        if (dtcampaign instanceof ECampaign) { FactoryData.getDExternalCampaign().deleteECampaign(dtcampaign); }
    }
    public async updateCampaign(dtcampaign: Campaign) {
        await this.validateUpdateCampaign(dtcampaign);
        if (dtcampaign instanceof OwnCampaign) {
            FactoryData.getDOwnCampaign().updateOCampaign(dtcampaign);
        }
        if (dtcampaign instanceof ECampaign) { FactoryData.getDExternalCampaign().updateECampaign(dtcampaign); }
    }
    public async addCEmission(dtcampaign: Campaign) {
       await  this.validateEmission(dtcampaign);
        if (dtcampaign instanceof OwnCampaign) {
            FactoryData.getDOwnCampaign().addOCEmission(dtcampaign);
        }
        if (dtcampaign instanceof ECampaign)
        { FactoryData.getDExternalCampaign().addECEmission(dtcampaign); }
    }
}

//TESTING

//LCampaign.getInstance().getECampaigns().then(data => {
//        console.log(data)
//});
//LCampaign.getInstance().getOwnCampaigns().then(data => {
//    console.log(data)
//});
//LCampaign.getInstance().getECampaignByTitleLetter("okok").then(data => {
//    console.log(data)
//});
//LCampaign.getInstance().getOCampaignByTitleLetter("C").then(data => {
//    console.log(data)
//});
//LCampaign.getInstance().getOCampaignByTitleLetter("C").then(data => {
//    console.log(data)
//});
//LCampaign.getInstance().getCampaign("Celular Android").then(data => {
//    console.log(data)
//});

//let datei = new Date("july 22, 2020");
//let datef = new Date("december 30, 2020");
//let dateem = new Date("December 28, 2020");
//let dtprog = new Program("Viajar por Uruguay", "PabloJackie", "Musical", 150);
//LCampaign.getInstance().getCampaign("dff").then(data => {
//    console.log(data)
//    let em = new Emission(dtprog, dateem);
//    data.listemision.push(em);
//    LCampaign.getInstance().addCEmission(data).then(data => {
//        console.log("Emission Added")
//    });;
//});
//let em = new Emission(dtprog, dateem);

//let datatypeAdvertiser = new Advertiser(89878, "NewAdvertiser", "Venezuela 154 block 7", "545556546");
//let dtec = new ECampaign("dff", datei, datef, 40, 3, datatypeAdvertiser, "Producer", null);


//    LCampaign.getInstance().addCampaign(dtec).then(data => {
//        console.log("Campaign Added")
//        LCampaign.getInstance().getECampaigns().then(data => {
//        console.log(data)
//});
// });
//LCampaign.getInstance().updateCampaign(dtec)
//    .then(data => {
//        console.log("Campaign Updated")
//        LCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)
//});
//    });;
//LCampaign.getInstance().deleteCampaign(dtec)
//    .then(data => {
//        console.log("Campaign Deleted")
//        LCampaign.getInstance().getOwnCampaigns().then(data => {
//            console.log(data)
//        });
//    });;
//LCampaign.getInstance().getCampaign("df").then(data => {
//    console.log(data.CalculatePrice())
//});