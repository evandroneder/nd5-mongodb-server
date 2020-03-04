import * as db from "./mongo";
export declare function StartServer(config: {
    port?: number;
    controllersPath: string;
    mongoDB: db.ICfgMongo;
}): Promise<void>;
export declare function handleServerError(error: any): {
    status: number;
    error: any;
};
