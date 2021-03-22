import { IDProgram } from "../interfaces/IDProgram";
import { Program } from "../../shared/entityshared/Program";
import { Conexion } from "./Conection";
import { DataException } from "../../shared/exceptions/dataexception";

export class DProgram implements IDProgram {

    private static instancia: DProgram;
    private constructor() { }
    public static getInstance(): DProgram {
        if (!DProgram.instancia) {
            DProgram.instancia = new DProgram();
        }

        return DProgram.instancia;
    }
    public async getPrograms(): Promise<Program[]> {


        try {
            let cn = await Conexion.uri().connect();
            const collection = cn.db("RadioTransmitter").collection("Program");
            const result = await collection.find({}).toArray();

            let array = [];
            for (var p of result) {
                var obj = new Program(p._name, p._producer, p._type, p._pricexseg)
                array.push(obj);
            }

            return array;
            cn.close();

        }
        catch (e) {
            throw new DataException("Program could not be listed" + e.message);
        }

    }
    public async getProgramsByNameLetter(expression: string): Promise<Program[]> {

        try {
            var cn = await Conexion.uri().connect();
            var query = { _name: { $regex: expression } }
            const collection = cn.db("RadioTransmitter").collection("Program");
            const result = await collection.find(query).toArray();

            let array = [];
            for (var p of result) {
                var obj = new Program(p._name, p._producer, p._type, p._pricexseg)
                array.push(obj);
            }

            return array;
            cn.close();

        }
        catch (e) {
            throw new DataException("Program could not be listed" + e.message);
        }

    }
    public async getProgram(name: string): Promise<Program> {


        try {
            let cn = await Conexion.uri().connect();
            const collection = cn.db("RadioTransmitter").collection("Program");
            const p = await collection.findOne({ _name: name });

            if (p == null) { return null; }
            var obj = new Program(p._name, p._producer, p._type, p._pricexseg)
            return obj;
            cn.close();

        }
        catch (e) {
            throw new DataException("Program could not be searched (It is possible that the Program is not in the system)" + e.message);
        }

    }
    public async addProgram(dtprogram: Program) {
        try {

            let cn = await Conexion.uri().connect();
            const coladvert = cn.db("RadioTransmitter").collection("Program");
            const result = await coladvert.insertOne(dtprogram);


            cn.close();

        }
        catch (e) {
            throw new DataException("Program could not be added" + e.message);
        }

    }
    public async deleteProgram(dtprogram: Program) {
        try {
            var myquery = { _name: dtprogram.name};
            let cn = await Conexion.uri().connect();
            const coladvert = cn.db("RadioTransmitter").collection("Program");
            const result = await coladvert.deleteOne(myquery);


            cn.close();

        }
        catch (e) {
            throw new DataException("Program could not be deleted" + e.message);
        }

    }
    public async updateProgram(dtprogram: Program) {
        try {

            let cn = await Conexion.uri().connect();
            let query = { _name: dtprogram.name };
            var newvalues = { $set: { _type: dtprogram.type, _pricexseg: dtprogram.pricexseg, _producer: dtprogram.producer } };
            const coladvert = cn.db("RadioTransmitter").collection("Program");
            const result = await coladvert.updateOne(query, newvalues);


            cn.close();

        }
        catch (e) {
            throw new DataException("Program could not be updated" + e.message);
        }

    }
    //TESTING
}
//let dtprog = new Program("Top 10", "PabloJackie","Musical",150);

//DProgram.getInstance().addProgram(dtprog).then(data => {
//    console.log(data)
//    DProgram.getInstance().getPrograms().then(data => {
//        console.log(data)


//    });

//});
//DProgram.getInstance().deleteProgram(dtprog).then(data => {
//    console.log(data)
//    DProgram.getInstance().getPrograms().then(data => {
//        console.log(data)


//    });

//});
//DProgram.getInstance().updateProgram(dtprog).then(data => {
//    console.log(data)
//    DProgram.getInstance().getPrograms().then(data => {
//        console.log(data)


//    });

//});
//DProgram.getInstance().getProgram("Viajar por Uruguay").then(data => {
//        console.log(data)


//  });
//DProgram.getInstance().getProgramsByNameLetter("Ur").then(data => {
//        console.log(data)


//    });
//DProgram.getInstance().getPrograms().then(data => {
//        console.log(data)


//    });




