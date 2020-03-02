"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const db = __importStar(require("./mongo"));
const bodyParser = require("body-parser");
const cors = require("cors");
const defaultPort = process.env.PORT || 8888;
const app = express_1.default();
app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.json());
async function StartServer(config) {
  await db.startClient(config.mongoDB);
  const port = config.port || defaultPort;
  await processRoutePath(config.controllersPath);
  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
}
exports.StartServer = StartServer;
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
//# sourceMappingURL=server.js.map
