import { ILAdvertiser } from "../interfaces/ILAdvertiser";
import { LogicException } from "../../shared/exceptions/logicexception";
import { Advertiser } from "../../shared/entityshared/Advertiser";
import { FactoryData } from "../../data/FactoryData";



export class LAdvertiser implements ILAdvertiser {

    private static instancia: LAdvertiser;
    private constructor() { }
    public static getInstance(): LAdvertiser {
        if (!LAdvertiser.instancia) {
            LAdvertiser.instancia = new LAdvertiser();
        }

        return LAdvertiser.instancia;
    }
    //Validations
    private validateRut(rut: number)
    {
        if (rut < 1) {
            throw new LogicException("The rut must be greater than or equal to 1");
        }
    }
    private  async validateAddAdvertiser(validateadvertiser: Advertiser)
    {
    
        this.validateRut(validateadvertiser.RutAnn);
        let objsearchadv = await this.getAdvertiser(validateadvertiser.RutAnn);
        if (validateadvertiser == null)
        {
            throw new LogicException("The Advertiser is empty ");
        }
        if (objsearchadv != null) {
            throw new LogicException("That Advertiser already exists in the system");
        }
        if (validateadvertiser.NomAnn.trim() === "")
        {
            throw new LogicException("The name cannot be empty");
        }
        if (validateadvertiser.DirAnn.trim() === "") {
            throw new LogicException("The address cannot be empty");
        }
        if (validateadvertiser.TelAnn.trim() === "") {
            throw new LogicException("The phone number cannot be empty");
        }
        if (!validateadvertiser.TelAnn.match(/^\d+$/)) {
            throw new LogicException("The phone number can only contains number");
        }
      
    }
    private async validateUpdateAdvertiser(validateadvertiser: Advertiser) {

        this.validateRut(validateadvertiser.RutAnn);
        let objsearchadv = await this.getAdvertiser(validateadvertiser.RutAnn);
        if (validateadvertiser == null) {
            throw new LogicException("The Advertiser is empty ");
        }
        if (objsearchadv == null) {
            throw new LogicException("That Advertiser does not exist in the system ");
        }
        if (validateadvertiser.NomAnn.trim() === "") {
            throw new LogicException("The name cannot be empty");
        }
        if (validateadvertiser.DirAnn.trim() === "") {
            throw new LogicException("The address cannot be empty");
        }
        if (validateadvertiser.TelAnn.trim() === "") {
            throw new LogicException("The phone number cannot be empty");
        }
        if (!validateadvertiser.TelAnn.match(/^\d+$/)) {
            throw new LogicException("The phone number can only contains number");
        }

    }
    private async validateDeleteAdvertiser(validateadvertiser: Advertiser) {

        this.validateRut(validateadvertiser.RutAnn);
        let objsearchadv = await this.getAdvertiser(validateadvertiser.RutAnn);
        if (validateadvertiser == null) {
            throw new LogicException("The Advertiser is empty ");
        }
        if (objsearchadv == null) {
            throw new LogicException("That Advertiser does not exist in the system ");
        }
      

    }
    //---------
    public async getAdvertisers(): Promise<Advertiser[]> {
            var listad = await FactoryData.getDAdvertiser().getAdvertisers();
            return listad;
    }
    public async getAdvertiser(rut: number): Promise<Advertiser> {
        this.validateRut(rut);
        var searchadvertiser = await FactoryData.getDAdvertiser().getAdvertiser(rut);

        return searchadvertiser
    }
    public async getAdvertiserByNameLetter(expression: string): Promise<Advertiser[]> {
            if (expression.length == 0)
            {
                var lista = await FactoryData.getDAdvertiser().getAdvertisers();
                return lista;
            }
            var listexp = await FactoryData.getDAdvertiser().getAdvertisersByNameLetter(expression);
            return listexp;
    }
    public async addAdvertiser(dtadvertiser: Advertiser) {
        await this.validateAddAdvertiser(dtadvertiser);
        FactoryData.getDAdvertiser().addAdvertiser(dtadvertiser);
    }
    public async deleteAdvertiser(dtadvertiser: Advertiser) {
        await this.validateDeleteAdvertiser(dtadvertiser);
        FactoryData.getDAdvertiser().deleteAdvertiser(dtadvertiser);
    }
    public async updateAdvertiser(dtadvertiser: Advertiser) {
        await this.validateUpdateAdvertiser(dtadvertiser);
        FactoryData.getDAdvertiser().updateAdvertiser(dtadvertiser);
    }
}
    
//TESTING

//LAdvertiser.getInstance().getAdvertisers().then(data => {
//        console.log(data)
//    });
//LAdvertiser.getInstance().getAdvertiserByNameLetter("").then(data => {
//        console.log(data)
//    });
//LAdvertiser.getInstance().getAdvertiser(555).then(data => {
//    console.log(data)

//    });
//let datatypeAdvertiser = new Advertiser(898788, "NewAdvertiser", "Vasd", "545556546");

//LAdvertiser.getInstance().addAdvertiser(datatypeAdvertiser).then(data => {
//        console.log(data)
//    });
//LAdvertiser.getInstance().deleteAdvertiser(datatypeAdvertiser).then(data => {
//        console.log(data)
//    });
//LAdvertiser.getInstance().updateAdvertiser(datatypeAdvertiser).then(data => {
//        console.log(data)
//    });
