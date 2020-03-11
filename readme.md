# Project

Dynamic express with mongodb.

### How to use

- To start the server call function StartServer

```
import { StartServer } from "nd5-mongodb-server";
import * as path from "path";

const collections = [
  { db: "test", collection: "cars" },
];

const mongodb = "mongodb+srv://<username>:<password>@cluster-ouywc.mongodb.net/test?retryWrites=true&w=majority"

StartServer({
  port: 3000,
  controllersPath: path.join(__dirname, "src", "/", "controllers"),
  mongoDB: {
    url: mongodb
    useNewUrlParser: true,
    useUnifiedTopology: true,
    collections: collections
  }
});
```

## Creating your route

- Create src/controllers path.
- Create file into controllers path. The file name represents route path.
- The const router name must contain 'Router' at the end (dynamic loading of the routes)
- Example file cars:

```
import { handleServerError } from "nd5-mongodb-server";
import express from "express";

const carsRouter = express.Router();

carsRouter.get("/", async (req, res) => {
  try {
    res.json({});
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
  db: environment.db
});

export async function getCars(): Promise<Array<ICar>> {
  try {
    return await collection.find().toArray();
  } catch (e) {
    throw "Error searching cars. " + e;
  }
}
```
