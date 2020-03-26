/// <reference types="socket.io" />
import * as db from "./mongo";
import { IRequest, IResponse } from "./core";
export declare function StartServer(config: {
    middleWare?: (req: IRequest, res: IResponse, next: () => void) => void;
    port?: number;
    controllersPath: string;
    mongoDB: db.ICfgMongo;
    socketServer: (io: SocketIO.Server) => void;
}): Promise<void>;
