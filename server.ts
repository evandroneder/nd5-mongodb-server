import express from "express";
import * as fs from "fs";
import * as db from "./mongo";
import socketIO from "socket.io";
import http from "http";

const bodyParser = require("body-parser");
const cors = require("cors");
const defaultPort = process.env.PORT || 8888;
const app = express();
app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.json());

export async function StartServer(config: {
  port?: number;
  controllersPath: string;
  mongoDB: db.ICfgMongo;
  socketServer: Function;
}) {
  await db.startClient(config.mongoDB);

  const port = config.port || defaultPort;

  await processRoutePath(config.controllersPath);

  if (config.socketServer) {
    const server = http.createServer(app);
    const io = socketIO(server);
    config.socketServer(io);
    console.log("Socket activated!");
  }
  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
}

async function processRoutePath(route_path) {
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
