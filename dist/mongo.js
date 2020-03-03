"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
var CONFIG;
var CLIENT;
async function startClient(cfg) {
    CONFIG = Object.assign({}, cfg);
    await getClient();
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
async function getColletion(config) {
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
    return { client, db, collection };
}
exports.getColletion = getColletion;
function handleServerError(error) {
    return {
        status: 500,
        error: error
    };
}
exports.handleServerError = handleServerError;
//# sourceMappingURL=mongo.js.map