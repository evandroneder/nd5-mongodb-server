import express from "express";
import * as fs from "fs";
import * as path from "path";
import { startClient, ICfgMongo } from "./mongodb/lib";

const bodyParser = require("body-parser");
const cors = require("cors");
const defaultPort = process.env.PORT || 8888;
const defaultControllersPath = "controllers";
const app = express();
app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.json());

export async function StartServer(config: {
  port?: number;
  controllersPath?: string;
  mongoDB: ICfgMongo;
}) {
  await startClient(config.mongoDB);

  const port = config.port || defaultPort;

  const controllersPath = config.controllersPath || defaultControllersPath;

  await processRoutePath(path.join(__dirname, "/", controllersPath));

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
