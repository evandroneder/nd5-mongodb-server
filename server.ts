import express from "express";
import * as fs from "fs";
import { MongoClient, Db, Collection } from "mongodb";

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
  mongoDB: ICfgMongo;
}) {
  await startClient(config.mongoDB);

  const port = config.port || defaultPort;

  await processRoutePath(config.controllersPath);

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

export interface ICfgMongo {
  url: string;
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

var CONFIG: ICfgMongo;

var CLIENT;

export async function startClient(cfg: ICfgMongo) {
  CONFIG = Object.assign({}, cfg);
  await getClient();
}

async function getClient(): Promise<MongoClient> {
  return (CLIENT = await MongoClient.connect(CONFIG.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch(err => {
    console.log(err);
    throw err;
  }));
}

export async function getColletion(config: { db: string; collection: string }) {
  const client = CLIENT;
  var db: Db;
  var collection: Collection;
  try {
    db = await client.db(config.db);
    collection = await db.collection(config.collection);
  } catch (e) {
    console.log(e);
    client.close();
    throw e;
  }

  return { client, db, collection };
}

export function handleServerError(error: any) {
  return {
    status: 500,
    error: error
  };
}

/*
StartServer({
  controllersPath: "",
  mongoDB: {
    url:
      "mongodb+srv://evandroneder:IXcPgcSSuWjWVMhh@cluster-ouywc.mongodb.net/test?retryWrites=true&w=majority",
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
});*/
