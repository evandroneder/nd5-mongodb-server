import { Db, Collection } from "mongodb";
export interface ICfgMongo {
    url: string;
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
}
export declare function startClient(cfg: ICfgMongo): Promise<void>;
export declare function getColletion(config: {
    db: string;
    collection: string;
}): Promise<{
    client: any;
    db: Db;
    collection: Collection<any>;
}>;
export declare function handleServerError(error: any): {
    status: number;
    error: any;
};
