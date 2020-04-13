/// <reference types="socket.io" />
import { ICfgMongo } from "./mongo";
export declare function StartServer(config: {
    middleWare?: (req: any, res: any, next: () => void) => void;
    staticPath?: string;
    port?: number;
    controllersPath: string;
    mongoDB: ICfgMongo;
    socketServer: (io: SocketIO.Server) => void;
}): Promise<void>;
