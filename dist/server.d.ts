/// <reference types="socket.io" />
import * as db from "./mongo";
export declare function StartServer(config: {
  middleWare?: (req: any, res: any, next: () => void) => void;
  port?: number;
  controllersPath: string;
  mongoDB: db.ICfgMongo;
  socketServer: (io: SocketIO.Server) => void;
}): Promise<void>;
