import * as db from "./mongo";
export declare function StartServer(config: {
    port?: number;
    controllersPath: string;
    mongoDB: db.ICfgMongo;
}): Promise<void>;
