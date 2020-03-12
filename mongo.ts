import { MongoClient, Db, Collection } from "mongodb";

export interface ICfgMongo {
  url: string;
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
  dbs: { name: string; collections: string[] }[];
}

interface ICfgCollection {
  client: MongoClient;
  db: Db;
  collection: Collection<any>;
  dbName: string;
  collectionName: string;
}

var CONFIG: ICfgMongo;

var CLIENT: MongoClient;

var COLLECTIONS: ICfgCollection[] = [];

export async function startClient(cfg: ICfgMongo) {
  CONFIG = Object.assign({}, cfg);
  await getClient();
  for (let db of CONFIG.dbs)
    for (let c of db.collections)
      await loadCollection({ db: db.name, collection: c });
}

async function getClient(): Promise<MongoClient> {
  return (CLIENT = await MongoClient.connect(CONFIG.url, {
    useNewUrlParser: CONFIG.useNewUrlParser,
    useUnifiedTopology: CONFIG.useUnifiedTopology
  }).catch(err => {
    console.log(err);
    throw err;
  }));
}

async function loadCollection(config: {
  db: string;
  collection: string;
}): Promise<void> {
  const dbName = config.db;
  const collectionName = config.collection;
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

  COLLECTIONS.push({ client, db, collection, dbName, collectionName });
}

export function getColletion(config: {
  db: string;
  collection: string;
}): ICfgCollection {
  let cfg = COLLECTIONS.find(
    c => c.dbName === config.db && c.collectionName === config.collection
  );
  if (!cfg)
    throw "Collection " +
      config.collection +
      " and db " +
      config.db +
      " not found.";

  return cfg;
}
