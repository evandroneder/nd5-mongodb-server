# Project

Dynamic express server with mongodb and websocket.

### How to use

- To start the express server call function StartServer

```
import { StartServer } from "nd5-mongodb-server";
import * as path from "path";

const dbs = [
  { db: { name: "test", collections: ["cars"] } },
];

const mongodb = "mongodb+srv://<username>:<password>@cluster-ouywc.mongodb.net/test?retryWrites=true&w=majority"

StartServer({
  middleWare: middleWare
  controllersPath: path.join(__dirname, "src", "/", "controllers"),
  mongoDB: {
    url: mongodb
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbs: dbs,
    socketServer: socketServer
  }
});

function socketServer(io: SocketIO.Server) {
  io.on("connection", client => {
    console.log("Client " + client.id + " connected.");

    io.emit("message", {
      message: "Hello clients, new connection " + client.id
    });

    client.on("message", () => {
      io.emit("message", {
        message: "You have new message from " + client.id
      });
    });
    client.on("disconnect", () => {
      console.log("Good bye " + client.id);
      io.emit("message", {
        message: "Client " + client.id + " disconnected =("
      });
    });
  });
}


function middleWare(req, res, next) {
    next();
}
```

## Creating your route

- Create src/controllers path.
- Create file into controllers path. The file name represents route path.
- The const router name must contain 'Router' at the end (dynamic loading of the routes)
- Example file cars:

```
import { handleServerError } from "nd5-mongodb-server";
import * as carsCollections from "./../collections/cars";
import express from "express";

const carsRouter = express.Router();

carsRouter.get("/", async (req, res) => {
  try {
    let cars = await carsCollection.getCars();
    res.json(cars);
  } catch (e) {
    res.status(500).json(handleServerError(e));
  }
});

module.exports = carsRouter;
```

## Creating your collection controller

- Create collections path.
- Use getColletion function to use your collection:

```
import { getColletion } from "nd5-mongodb-server/mongo";

export interface ICar {
  name: string;
}

const { collection } = getColletion({
  collection: "cars",
  db: "test"
});

export async function getCars(): Promise<Array<ICar>> {
  try {
    return await collection.find().toArray();
  } catch (e) {
    throw "Error searching cars. " + e;
  }
}
```
