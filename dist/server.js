"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importStar(require("./mongo"));
const fs = __importStar(require("fs"));
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const defaultPort = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.json());
async function StartServer(config) {
    await db.startClient(config.mongoDB);
    const port = Number(config.port || defaultPort);
    if (config.middleWare) {
        app.use((req, res, next) => {
            config.middleWare(req, res, next);
        });
    }
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
exports.StartServer = StartServer;
async function processRoutePath(route_path) {
    fs.readdirSync(route_path).forEach(async function (file) {
        var filepath = route_path + "/" + file;
        if (file.indexOf(".map") === -1) {
            const name = file.split(".")[0];
            console.info("Loading route: " + name);
            app.use("/" + name, require(filepath));
        }
    });
}
function handleServerError(error) {
    return {
        status: 500,
        message: error
    };
}
exports.handleServerError = handleServerError;
//# sourceMappingURL=server.js.map