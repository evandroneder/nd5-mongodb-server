"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importStar(require("./mongo"));
const fs = __importStar(require("fs"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const defaultPort = process.env.PORT || 3000;
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json({ type: "application/*+json" }));
app.use(body_parser_1.default.json());
async function StartServer(config) {
    await db.startClient(config.mongoDB);
    const port = Number(config.port || defaultPort);
    app.use((req, res, next) => {
        if (config.middleWare)
            config.middleWare(req, res, next);
        else
            next();
    });
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
async function processRoutePath(routerPath) {
    fs.readdirSync(routerPath).forEach(async (file) => {
        const filePath = routerPath + "/" + file;
        if (file.indexOf(".map") === -1) {
            const name = file.split(".")[0];
            console.log("Loading route: " + name);
            app.use("/" + name, require(filePath));
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUE4QjtBQUM5Qix1Q0FBeUI7QUFDekIsc0RBQThCO0FBQzlCLDhEQUFxQztBQUNyQyxnREFBd0I7QUFDeEIsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQzdDLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUM7QUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RCxHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVwQixLQUFLLFVBQVUsV0FBVyxDQUFDLE1BTWpDO0lBQ0MsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVyQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsQ0FBQztJQUVoRCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxJQUFnQixFQUFFLEVBQUU7UUFDL0MsSUFBSSxNQUFNLENBQUMsVUFBVTtZQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFDcEQsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRS9DLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1FBQ3ZCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7S0FDbEM7QUFDSCxDQUFDO0FBM0JELGtDQTJCQztBQUVELEtBQUssVUFBVSxnQkFBZ0IsQ0FBQyxVQUFrQjtJQUNoRCxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLEVBQUU7UUFDOUMsTUFBTSxRQUFRLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQy9CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN0QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkYiBmcm9tIFwiLi9tb25nb1wiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG5pbXBvcnQgY29ycyBmcm9tIFwiY29yc1wiO1xuY29uc3QgZGVmYXVsdFBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC51c2UoY29ycygpKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgdHlwZTogXCJhcHBsaWNhdGlvbi8qK2pzb25cIiB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFN0YXJ0U2VydmVyKGNvbmZpZzoge1xuICBtaWRkbGVXYXJlPzogKHJlcTogYW55LCByZXM6IGFueSwgbmV4dDogKCkgPT4gdm9pZCkgPT4gdm9pZDtcbiAgcG9ydD86IG51bWJlcjtcbiAgY29udHJvbGxlcnNQYXRoOiBzdHJpbmc7XG4gIG1vbmdvREI6IGRiLklDZmdNb25nbztcbiAgc29ja2V0U2VydmVyOiAoaW86IFNvY2tldElPLlNlcnZlcikgPT4gdm9pZDtcbn0pIHtcbiAgYXdhaXQgZGIuc3RhcnRDbGllbnQoY29uZmlnLm1vbmdvREIpO1xuXG4gIGNvbnN0IHBvcnQgPSBOdW1iZXIoY29uZmlnLnBvcnQgfHwgZGVmYXVsdFBvcnQpO1xuXG4gIGFwcC51c2UoKHJlcTogYW55LCByZXM6IGFueSwgbmV4dDogKCkgPT4gdm9pZCkgPT4ge1xuICAgIGlmIChjb25maWcubWlkZGxlV2FyZSkgY29uZmlnLm1pZGRsZVdhcmUocmVxLCByZXMsIG5leHQpO1xuICAgIGVsc2UgbmV4dCgpO1xuICB9KTtcblxuICBhd2FpdCBwcm9jZXNzUm91dGVQYXRoKGNvbmZpZy5jb250cm9sbGVyc1BhdGgpO1xuXG4gIGNvbnN0IHNlcnZlciA9IGFwcC5saXN0ZW4ocG9ydCwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGBzZXJ2ZXIgaXMgbGlzdGVuaW5nIG9uICR7cG9ydH1gKTtcbiAgfSk7XG5cbiAgaWYgKGNvbmZpZy5zb2NrZXRTZXJ2ZXIpIHtcbiAgICBjb25zdCBpbyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIikubGlzdGVuKHNlcnZlcik7XG4gICAgY29uZmlnLnNvY2tldFNlcnZlcihpbyk7XG4gICAgY29uc29sZS5sb2coXCJTb2NrZXQgYWN0aXZhdGVkLlwiKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzUm91dGVQYXRoKHJvdXRlclBhdGg6IHN0cmluZykge1xuICBmcy5yZWFkZGlyU3luYyhyb3V0ZXJQYXRoKS5mb3JFYWNoKGFzeW5jIGZpbGUgPT4ge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gcm91dGVyUGF0aCArIFwiL1wiICsgZmlsZTtcbiAgICBpZiAoZmlsZS5pbmRleE9mKFwiLm1hcFwiKSA9PT0gLTEpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBmaWxlLnNwbGl0KFwiLlwiKVswXTtcbiAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZyByb3V0ZTogXCIgKyBuYW1lKTtcbiAgICAgIGFwcC51c2UoXCIvXCIgKyBuYW1lLCByZXF1aXJlKGZpbGVQYXRoKSk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==