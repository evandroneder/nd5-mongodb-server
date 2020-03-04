"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
var CONFIG;
var CLIENT;
var COLLECTIONS = [];
async function startClient(cfg) {
    CONFIG = Object.assign({}, cfg);
    await getClient();
    for (let c of CONFIG.collections)
        await loadCollection(c);
}
exports.startClient = startClient;
async function getClient() {
    return (CLIENT = await mongodb_1.MongoClient.connect(CONFIG.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(err => {
        console.log(err);
        throw err;
    }));
}
async function loadCollection(config) {
    const dbName = config.db;
    const collectionName = config.collection;
    const client = CLIENT;
    var db;
    var collection;
    try {
        db = await client.db(config.db);
        collection = await db.collection(config.collection);
    }
    catch (e) {
        console.log(e);
        client.close();
        throw e;
    }
    COLLECTIONS.push({ client, db, collection, dbName, collectionName });
}
function getColletion(config) {
    let cfg = COLLECTIONS.find(c => c.dbName === config.db && c.collectionName === config.collection);
    if (!cfg)
        throw "Collection " +
            config.collection +
            " and db " +
            config.db +
            " not found.";
    return cfg;
}
exports.getColletion = getColletion;
//# sourceMappingURL=mongo.js.map