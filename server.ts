import * as db from "./mongo";
import * as fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const defaultPort = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.json());

export async function StartServer(config: {
  middleWare?: (req: any, res: any, next: () => void) => void;
  port?: number;
  controllersPath: string;
  mongoDB: db.ICfgMongo;
  socketServer: (io: SocketIO.Server) => void;
}) {
  await db.startClient(config.mongoDB);

  const port = Number(config.port || defaultPort);

  app.use((req: any, res: any, next: () => void) => {
    if (config.middleWare) config.middleWare(req, res, next);
    else next();
  });

  await processRoutePath(config.controllersPath);

  const server = app.listen(port, () => {
    console.log(`server is listening on ${port}`);
  });

  if (config.socketServer) {
    const io = require("socket.io").listen(server);
    config.socketServer(io);
    console.log("Socket activated.");
  }
}

async function processRoutePath(routerPath: string) {
  fs.readdirSync(routerPath).forEach(async file => {
    const filePath = routerPath + "/" + file;
    if (file.indexOf(".map") === -1) {
      const name = file.split(".")[0];
      console.log("Loading route: " + name);
      app.use("/" + name, require(filePath));
    }
  });
}
