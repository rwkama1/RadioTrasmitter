import { IDOwnCampaign } from "../interfaces/IDOwnCampaign";
import { OwnCampaign } from "../../shared/entityshared/OwnCampaign";
import { Conexion } from "./Conection";
import { DataException } from "../../shared/exceptions/dataexception";
import { Advertiser } from "../../shared/entityshared/Advertiser";
import { Emission } from "../../shared/entityshared/Emission";
import { Program } from "../../shared/entityshared/Program";

export class DOwnCampaign implements IDOwnCampaign {

    private static instancia: DOwnCampaign;
    private constructor() { }
    public static getInstance(): DOwnCampaign {
        if (!DOwnCampaign.instancia) {
            DOwnCampaign.instancia = new DOwnCampaign();
        }

        return DOwnCampaign.instancia;
    }
    public async getOwnCampaigns(): Promise<OwnCampaign[]> {


        try {
            let cn = await Conexion.uri().connect();
            const collection = cn.db("RadioTransmitter").collection("OwnCampaign");
            const result = await collection.find({}).toArray();

            let array = [];
            for (var p of result) {
                var obj = new OwnCampaign(p._title, p._datei, p._datef, p._duration, p._mentions, p._advert, p._cost, p._listemision);
                array.push(obj);
            }

            return array;
            cn.close();

        }
        catch (e) {
            throw new DataException("Own Campaign could not be listed" + e.message);
        }

    }
    public async getOCampaignsByNameLetter(expression: string): Promise<OwnCampaign[]> {

        try {
            var cn = await Conexion.uri().connect();
            var query = { _title: { $regex: expression } }
            const collection = cn.db("RadioTransmitter").collection("OwnCampaign");
            const result = await collection.find(query).toArray();

            let array = [];
            for (var p of result) {
                var obj = new OwnCampaign(p._title, p._datei, p._datef, p._duration, p._mentions, p._advert, p._cost, p._listemision);
                array.push(obj);
            }

            return array;
            cn.close();

        }
        catch (e) {
            throw new DataException("Own Campaign could not be listed" + e.message);
        }

    }
    public async getOCampaign(title: string): Promise<OwnCampaign> {


        try {
            let cn = await Conexion.uri().connect();
            const collection = cn.db("RadioTransmitter").collection("OwnCampaign");
            const p = await collection.findOne({ _title: title });
            if (p == null) { return null; }
            var obj = new OwnCampaign(p._title, p._datei, p._datef, p._duration, p._mentions, p._advert, p._cost, p._listemision);
            return obj;
            cn.close();

        }
        catch (e) {
            throw new DataException("Own Campaign could not be searched(It is possible that the OwnCampaign is not in the system)" + e.message);
        }

    }
    public async addOCampaign(dtoc: OwnCampaign) {
        try {
            dtoc.listemision = [];
            let cn = await Conexion.uri().connect();
            const coladvert = cn.db("RadioTransmitter").collection("OwnCampaign");
            const result = await coladvert.insertOne(dtoc);


            cn.close();

        }
        catch (e) {
            throw new DataException("Own Campaign could not be added" + e.message);
        }

    }
    public async deleteOCampaign(dtoc: OwnCampaign) {
        try {

            let cn = await Conexion.uri().connect();
            var query = { _title: dtoc.title };
            const coladvert = cn.db("RadioTransmitter").collection("OwnCampaign");
            const result = await coladvert.deleteOne(query);


            cn.close();

        }
        catch (e) {
            throw new DataException("Own Campaign could not be deleted" + e.message);
        }

    }
    public async updateOCampaign(dtoc: OwnCampaign) {
        try {

            let cn = await Conexion.uri().connect();
            let query = { _title: dtoc.title };
            var newvalues = { $set: { _datei: dtoc.datei, _datef: dtoc.datef, dtoc, _duration: dtoc.duration, _mentions: dtoc.mentions, _advert: dtoc.advert, _cost: dtoc.cost } };
            const coladvert = cn.db("RadioTransmitter").collection("OwnCampaign");
            const result = await coladvert.updateOne(query, newvalues);


            cn.close();

        }
        catch (e) {
            throw new DataException("Own Campaign could not be updated" + e.message);
        }

    }
   // ----------------------------------
    public async addOCEmission(dtec: OwnCampaign) {
        try {

            //let titlecam = {_title: dtec.title };
            let cn = await Conexion.uri().connect();
            var query = {_title: dtec.title };
            var newvalues = {$set: { _listemision: dtec.listemision } };
            const colcamp = await cn.db("RadioTransmitter").collection("OwnCampaign");
            const result = await colcamp.updateOne(query,newvalues);


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
//let dtprog = new Program("Viajar por Uruguay", "PabloJackie", "Musical", 150);
//var dtadv = new Advertiser(555, "sfasfasfsafas", "qweqwrqtqt", "0867686776");
//var em = new Emission(dtprog, dateem);
//var unalista = [];
////unalista.push(em);
////unalista.push(em);
//let dtec = new OwnCampaign("Celulares Android", datei, datef, 40, 6, dtadv, 500, unalista);
//dtec.listemision.push(em);
//DOwnCampaign.getInstance().addOCEmission(dtec).then(data => {
//    console.log(data)
//    DOwnCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)


//    });
//});
//DOwnCampaign.getInstance().getOCampaign("Celulares Android").then(campaign => {
//    console.log(campaign)
//    campaign.listemision.push(em);
//    DOwnCampaign.getInstance().addOCEmission(campaign).then(emi =>
//    {
//        console.log(emi);
//        DOwnCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)


//    });

//    })


//  });

//DOwnCampaign.getInstance().addOCampaign(dtec).then(data => {
//    console.log(data)
//    DOwnCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)


//    });

//});
//DOwnCampaign.getInstance().updateOCampaign(dtec).then(data => {
//    console.log(data)
//    DOwnCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)


//    });

//});
//DOwnCampaign.getInstance().deleteOCampaign(dtec).then(data => {
//    console.log(data)
//    DOwnCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)


//    });

//});
//DOwnCampaign.getInstance().getOCampaign("Celulares Android").then(data => {
//        console.log(data)


//  });
//DOwnCampaign.getInstance().getOCampaignsByNameLetter("Cel").then(data => {
//        console.log(data)


//    });
//DOwnCampaign.getInstance().getOwnCampaigns().then(data => {
//        console.log(data)


//    });
