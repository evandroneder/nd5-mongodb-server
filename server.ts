import http from "http";
import * as db from "./mongo";
import * as fs from "fs";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const defaultPort = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.json());

export async function StartServer(config: {
  middleWare?: Function;
  port?: number;
  controllersPath: string;
  mongoDB: db.ICfgMongo;
  socketServer: Function;
}) {
  await db.startClient(config.mongoDB);

  const port = Number(config.port || defaultPort);

  app.use(
    (req: http.IncomingMessage, res: http.RequestOptions, next: Function) => {
      if (config.middleWare) config.middleWare(req, res, next);
      else next();
    }
  );

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

async function processRoutePath(route_path: string) {
  fs.readdirSync(route_path).forEach(async function(file) {
    var filepath = route_path + "/" + file;
    if (file.indexOf(".map") === -1) {
      const name = file.split(".")[0];
      console.info("Loading route: " + name);
      app.use("/" + name, require(filepath));
    }
  });
}

export function handleServerError(error: any) {
  return {
    status: 500,
    message: error
  };
}
