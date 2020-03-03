import { MongoClient, Db, Collection } from "mongodb";

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
