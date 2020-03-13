import * as db from "./mongo";
export declare function StartServer(config: {
    middleWare?: Function;
    port?: number;
    controllersPath: string;
    mongoDB: db.ICfgMongo;
    socketServer: Function;
}): Promise<void>;
export declare function handleServerError(error: any): {
    status: number;
    message: any;
};
