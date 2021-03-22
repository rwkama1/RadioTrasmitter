import { ILProgram } from "../interfaces/ILProgram";
import { LogicException } from "../../shared/exceptions/logicexception";
import { Program } from "../../shared/entityshared/Program";
import { FactoryData } from "../../data/FactoryData";

export class LProgram implements ILProgram {

    private static instancia: LProgram;
    private constructor() { }
    public static getInstance(): LProgram {
        if (!LProgram.instancia) {
            LProgram.instancia = new LProgram();
        }

        return LProgram.instancia;
    }
    //Validations
    private validateName(name: string)
    {
        if (name.trim() === "") {
            throw new LogicException("The name cannot be empty");
        }
    }
    private async validateAddProgram(validateprogram: Program)
    {
    
        this.validateName(validateprogram.name);
        let objsearchpro = await this.getProgram(validateprogram.name);
        if (validateprogram == null)
        {
            throw new LogicException("The Program is empty ");
        }
        if (objsearchpro != null) {
            throw new LogicException("That Program already exists in the system");
        }
        if (validateprogram.producer.trim() === "")
        {
            throw new LogicException("The producer cannot be empty");
        }
        if (validateprogram.type.trim() === "") {
            throw new LogicException("The type cannot be empty");
        }
        if (validateprogram.pricexseg<1) {
            throw new LogicException("The price per second must be greater than 0");
        }
    }
    private async validateDeleteProgram(validateprogram: Program) {

        this.validateName(validateprogram.name);
        let objsearchpro = await this.getProgram(validateprogram.name);
        if (validateprogram == null) {
            throw new LogicException("The Program is empty ");
        }
        if (objsearchpro == null) {
            throw new LogicException("That Program does not exist in the system ");
        }
      
    }
    private async validateUpdateProgram(validateprogram: Program) {

        this.validateName(validateprogram.name);
        let objsearchpro = await this.getProgram(validateprogram.name);
        if (validateprogram == null) {
            throw new LogicException("The Program is empty ");
        }
        if (objsearchpro == null) {
            throw new LogicException("That Program does not exist in the system ");
        }

        if (validateprogram.producer.trim() === "") {
            throw new LogicException("The producer cannot be empty");
        }
        if (validateprogram.type.trim() === "") {
            throw new LogicException("The type cannot be empty");
        }
        if (validateprogram.pricexseg < 1) {
            throw new LogicException("The price per second must be greater than 0");
        }
    }
    //---------
    public async getPrograms(): Promise<Program[]> {
        var listaprogram = await FactoryData.getDProgram().getPrograms();
        return listaprogram;  
    }
    public async getProgram(name: string): Promise<Program> {
        this.validateName(name);
        var searchprogram = await FactoryData.getDProgram().getProgram(name);

        return searchprogram
    }
    public async getProgramsByNameLetter(expression: string): Promise<Program[]> {
            if (expression.length == 0)
            {
                var lista = await FactoryData.getDProgram().getPrograms();
                return lista;
            }
            var listexp = await FactoryData.getDProgram().getProgramsByNameLetter(expression);
            return listexp;
    }
    public async addProgram(dtprogram: Program) {
        await this.validateAddProgram(dtprogram);
        if (dtprogram.type == "Musical" || dtprogram.type == "Varieties" || dtprogram.type == "Journalistic") {
            FactoryData.getDProgram().addProgram(dtprogram);
        }
        else { throw new LogicException("The program type must be Musical, Journalistic, or Varieties only");}
       
   
    }
    public async deleteProgram(dtprogram: Program) {
        await this.validateDeleteProgram(dtprogram);
        FactoryData.getDProgram().deleteProgram(dtprogram);
    }
    public async updateProgram(dtprogram: Program) {
        await this.validateUpdateProgram(dtprogram);
        if (dtprogram.type == "Musical" || dtprogram.type == "Varieties" || dtprogram.type == "Journalistic") {
            FactoryData.getDProgram().updateProgram(dtprogram);
        }
        else { throw new LogicException("The program type must be Musical, Journalistic, or Varieties only"); }
    }
}
    
//Testing

let datatypeProgram = new Program("NewPrograms", "NewProducer", "Journalistic", 400);
//LProgram.getInstance().addProgram(datatypeProgram)
//.then(data => {
//        console.log(data)
//    });
//LProgram.getInstance().deleteProgram(datatypeProgram)
//.then(data => {
//        console.log(data)
//    });
//LProgram.getInstance().updateProgram(datatypeProgram)
//.then(data => {
//        console.log(data)
//    });