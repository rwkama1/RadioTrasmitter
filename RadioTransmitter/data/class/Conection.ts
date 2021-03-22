import { MongoClient } from "mongodb";

export class Conexion {
    private static _uri = "mongodb+srv://rwkamandriw:IF3JJQIm00NdGzcq@carlosrodriguezcluster.eaywr.mongodb.net/RadioTransmitter?retryWrites=true&w=majority";
    public static uri(): MongoClient {
        const clientcon = new MongoClient(this._uri, { useNewUrlParser: true, useUnifiedTopology: true })
        return clientcon;
    }
}

