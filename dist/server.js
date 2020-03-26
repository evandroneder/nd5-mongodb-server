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
async function processRoutePath(route_path) {
    fs.readdirSync(route_path).forEach(async function (file) {
        var filepath = route_path + "/" + file;
        if (file.indexOf(".map") === -1) {
            const name = file.split(".")[0];
            console.log("Loading route: " + name);
            app.use("/" + name, require(filepath));
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUE4QjtBQUM5Qix1Q0FBeUI7QUFDekIsc0RBQThCO0FBQzlCLDhEQUFxQztBQUVyQyxnREFBd0I7QUFDeEIsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQzdDLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUM7QUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RCxHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVwQixLQUFLLFVBQVUsV0FBVyxDQUFDLE1BTWpDO0lBQ0MsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVyQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsQ0FBQztJQUVoRCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxJQUFnQixFQUFFLEVBQUU7UUFDL0MsSUFBSSxNQUFNLENBQUMsVUFBVTtZQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFDcEQsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRS9DLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1FBQ3ZCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7S0FDbEM7QUFDSCxDQUFDO0FBM0JELGtDQTJCQztBQUVELEtBQUssVUFBVSxnQkFBZ0IsQ0FBQyxVQUFrQjtJQUNoRCxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFdBQVUsSUFBSTtRQUNwRCxJQUFJLFFBQVEsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUN2QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3RDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGRiIGZyb20gXCIuL21vbmdvXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCB7IElSZXF1ZXN0LCBJUmVzcG9uc2UgfSBmcm9tIFwiLi9jb3JlXCI7XG5pbXBvcnQgY29ycyBmcm9tIFwiY29yc1wiO1xuY29uc3QgZGVmYXVsdFBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbmFwcC51c2UoY29ycygpKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKHsgdHlwZTogXCJhcHBsaWNhdGlvbi8qK2pzb25cIiB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFN0YXJ0U2VydmVyKGNvbmZpZzoge1xuICBtaWRkbGVXYXJlPzogKHJlcTogSVJlcXVlc3QsIHJlczogSVJlc3BvbnNlLCBuZXh0OiAoKSA9PiB2b2lkKSA9PiB2b2lkO1xuICBwb3J0PzogbnVtYmVyO1xuICBjb250cm9sbGVyc1BhdGg6IHN0cmluZztcbiAgbW9uZ29EQjogZGIuSUNmZ01vbmdvO1xuICBzb2NrZXRTZXJ2ZXI6IChpbzogU29ja2V0SU8uU2VydmVyKSA9PiB2b2lkO1xufSkge1xuICBhd2FpdCBkYi5zdGFydENsaWVudChjb25maWcubW9uZ29EQik7XG5cbiAgY29uc3QgcG9ydCA9IE51bWJlcihjb25maWcucG9ydCB8fCBkZWZhdWx0UG9ydCk7XG5cbiAgYXBwLnVzZSgocmVxOiBhbnksIHJlczogYW55LCBuZXh0OiAoKSA9PiB2b2lkKSA9PiB7XG4gICAgaWYgKGNvbmZpZy5taWRkbGVXYXJlKSBjb25maWcubWlkZGxlV2FyZShyZXEsIHJlcywgbmV4dCk7XG4gICAgZWxzZSBuZXh0KCk7XG4gIH0pO1xuXG4gIGF3YWl0IHByb2Nlc3NSb3V0ZVBhdGgoY29uZmlnLmNvbnRyb2xsZXJzUGF0aCk7XG5cbiAgY29uc3Qgc2VydmVyID0gYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coYHNlcnZlciBpcyBsaXN0ZW5pbmcgb24gJHtwb3J0fWApO1xuICB9KTtcblxuICBpZiAoY29uZmlnLnNvY2tldFNlcnZlcikge1xuICAgIGNvbnN0IGlvID0gcmVxdWlyZShcInNvY2tldC5pb1wiKS5saXN0ZW4oc2VydmVyKTtcbiAgICBjb25maWcuc29ja2V0U2VydmVyKGlvKTtcbiAgICBjb25zb2xlLmxvZyhcIlNvY2tldCBhY3RpdmF0ZWQuXCIpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NSb3V0ZVBhdGgocm91dGVfcGF0aDogc3RyaW5nKSB7XG4gIGZzLnJlYWRkaXJTeW5jKHJvdXRlX3BhdGgpLmZvckVhY2goYXN5bmMgZnVuY3Rpb24oZmlsZSkge1xuICAgIHZhciBmaWxlcGF0aCA9IHJvdXRlX3BhdGggKyBcIi9cIiArIGZpbGU7XG4gICAgaWYgKGZpbGUuaW5kZXhPZihcIi5tYXBcIikgPT09IC0xKSB7XG4gICAgICBjb25zdCBuYW1lID0gZmlsZS5zcGxpdChcIi5cIilbMF07XG4gICAgICBjb25zb2xlLmxvZyhcIkxvYWRpbmcgcm91dGU6IFwiICsgbmFtZSk7XG4gICAgICBhcHAudXNlKFwiL1wiICsgbmFtZSwgcmVxdWlyZShmaWxlcGF0aCkpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=