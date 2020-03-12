import { MongoClient, Db, Collection } from "mongodb";
export interface ICfgMongo {
    url: string;
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    dbs: {
        name: string;
        collections: string[];
    }[];
}
interface ICfgCollection {
    client: MongoClient;
    db: Db;
    collection: Collection<any>;
    dbName: string;
    collectionName: string;
}
export declare function startClient(cfg: ICfgMongo): Promise<void>;
export declare function getColletion(config: {
    db: string;
    collection: string;
}): ICfgCollection;
export {};
