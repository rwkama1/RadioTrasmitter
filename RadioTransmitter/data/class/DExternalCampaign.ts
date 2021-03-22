import { IDExternalCampaign } from "../interfaces/IDExternalCampaign";
import { ECampaign } from "../../shared/entityshared/ECampaign";
import { Conexion } from "./Conection";
import { DataException } from "../../shared/exceptions/dataexception";
import { Advertiser } from "../../shared/entityshared/Advertiser";
import { Emission } from "../../shared/entityshared/Emission";
import { Program } from "../../shared/entityshared/Program";

export class DExternalCampaign implements IDExternalCampaign {

    private static instancia: DExternalCampaign;
    private constructor() { }
    public static getInstance(): DExternalCampaign {
        if (!DExternalCampaign.instancia) {
            DExternalCampaign.instancia = new DExternalCampaign();
        }

        return DExternalCampaign.instancia;
    }
    public async getECampaigns(): Promise<ECampaign[]> {


        try {
            let cn = await Conexion.uri().connect();
            const collection = cn.db("RadioTransmitter").collection("ExternalCampaign");
            const result = await collection.find({}).toArray();

            let array = [];
            for (var p of result) {
                var obj = new ECampaign(p._title, p._datei, p._datef, p._duration, p._mentions, p._advert, p._producer, p._listemision);
                array.push(obj);
            }

            return array;
            cn.close();

        }
        catch (e) {
            throw new DataException("External Campaign could not be listed" + e.message);
        }

    }
    public async getECampaignsByNameLetter(expression: string): Promise<ECampaign[]> {

        try {
            var cn = await Conexion.uri().connect();
            var query = { _title: { $regex: expression } }
            const collection = cn.db("RadioTransmitter").collection("ExternalCampaign");
            const result = await collection.find(query).toArray();

            let array = [];
            for (var p of result) {
                var obj = new ECampaign(p._title, p._datei, p._datef, p._duration, p._mentions, p._advert, p._producer, p._listemision);
                array.push(obj);
            }

            return array;
            cn.close();

        }
        catch (e) {
            throw new DataException("External Campaign could not be listed" + e.message);
        }

    }
    public async getECampaign(title: string): Promise<ECampaign> {
       
        let obj = null;
      
        try {
            let cn = await Conexion.uri().connect();
            let collection = cn.db("RadioTransmitter").collection("ExternalCampaign");
            let p = await collection.findOne({ _title: title });
            if (p == null) { return null;}
            obj = new ECampaign(p._title, p._datei, p._datef, p._duration, p._mentions, p._advert, p._producer, p._listemision);   
            return obj;
            cn.close();

        }

        catch (e) {
            throw new DataException("External Campaign could not be searched (It is possible that the ECampaign is not in the system)" + e.message);
        }

    }
    public async addECampaign(dtec: ECampaign) {
        try {
            dtec.listemision = [];
            let cn = await Conexion.uri().connect();
            const coladvert = cn.db("RadioTransmitter").collection("ExternalCampaign");
            const result = await coladvert.insertOne(dtec);


            cn.close();

        }
        catch (e) {
            throw new DataException("External Campaign could not be added" + e.message);
        }

    }
    public async deleteECampaign(dtec: ECampaign) {
        try {

            let cn = await Conexion.uri().connect();
            var query = { _title: dtec.title };
            const coladvert = cn.db("RadioTransmitter").collection("ExternalCampaign");
            const result = await coladvert.deleteOne(query);


            cn.close();

        }
        catch (e) {
            throw new DataException("External Campaign could not be deleted" + e.message);
        }

    }
    public async updateECampaign(dtec: ECampaign) {
        try {

            let cn = await Conexion.uri().connect();
            let query = { _title: dtec.title };
            var newvalues = { $set: { _datei: dtec.datei, _datef: dtec.datef, dtec, _duration: dtec.duration, _mentions: dtec.mentions, _advert: dtec.advert, _producer: dtec.producer } };
            const coladvert = cn.db("RadioTransmitter").collection("ExternalCampaign");
            const result = await coladvert.updateOne(query, newvalues);


            cn.close();

        }
        catch (e) {
            throw new DataException("External Campaign could not be updated" + e.message);
        }

    }
    //Emision 
    public async addECEmission(dtec: ECampaign) {
        try {
          
            let titlecam = { _title: dtec.title };
            let cn = await Conexion.uri().connect();
            var newvalues = { $set: { _listemision: dtec.listemision } };
            const colcamp =await  cn.db("RadioTransmitter").collection("ExternalCampaign");
            
            const result = await colcamp.updateOne(titlecam, newvalues);


            cn.close();

        }
        catch (e) {
            throw new DataException("Emission could not be added" + e.message);
        }

    }

}
//TESTING
//var datei = new Date("July 22, 2020");
//var datef = new Date("December 30, 2020");
//var dateem = new Date("December 27, 2020");
//if (datei > datef) {
//    console.log('La fecha final tiene que ser mayor a la fecha inicial');

//}
//else
//{
//    console.log('Bien');
//}
//let dtprog = new Program("Top 10", "PabloJackie", "Musical", 150);
//var dtadv = new Advertiser(555, "sfasfasfsafas", "qweqwrqtqt", "0867686776");
//var em = new Emission(dtprog, dateem);
let  dateem = new Date("December 27, 2020");
//var unalista=[];
////unalista.push(em);
////unalista.push(em);
//let dtec = new ECampaign("Cine Anime", datei, datef, 40, 4, dtadv, "Vitamina",unalista);

//dtec.listemision.push(em);
//DExternalCampaign.getInstance().addECEmission(dtec).then(data => {
//    console.log(data)
//    DExternalCampaign.getInstance().getECampaigns().then(data => {
//        console.log(data)


//    });
//});
//DExternalCampaign.getInstance().getECampaign("Cine Anime").then(campaign => {
//    console.log(campaign)
//    campaign.listemision.push(em);
//    DExternalCampaign.getInstance().addECEmission(campaign).then(emi => {
//        console.log(emi);
//        DExternalCampaign.getInstance().getECampaigns().then(data => {
//            console.log(data)


//        });

//    })


//});
//DExternalCampaign.getInstance().addECampaign(dtec).then(data => {
//    console.log(data)
//    DExternalCampaign.getInstance().getECampaigns().then(data => {
//        console.log(data)


//    });

//});
//DExternalCampaign.getInstance().updateECampaign(dtec).then(data => {
//    console.log(data)
//    DExternalCampaign.getInstance().getECampaigns().then(data => {
//        console.log(data)


//    });

//});
//DExternalCampaign.getInstance().deleteECampaign(dtec).then(data => {
//    console.log(data)
//    DExternalCampaign.getInstance().getECampaigns().then(data => {
//        console.log(data)


//    });

//});
//DExternalCampaign.getInstance().getECampaign("Cine Anime").then(data => {
//        console.log(data)


//  });
//DExternalCampaign.getInstance().getECampaignsByNameLetter("Ci").then(data => {
//        console.log(data)


//    });
    //DExternalCampaign.getInstance().getECampaigns().then(data => {
    //    console.log(data)


    //});