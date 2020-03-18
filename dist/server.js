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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLDRDQUE4QjtBQUM5Qix1Q0FBeUI7QUFFekIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ3RCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMxQyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBRTdDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVwQixLQUFLLFVBQVUsV0FBVyxDQUFDLE1BTWpDO0lBQ0MsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVyQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsQ0FBQztJQUVoRCxHQUFHLENBQUMsR0FBRyxDQUNMLENBQUMsR0FBeUIsRUFBRSxHQUF3QixFQUFFLElBQWMsRUFBRSxFQUFFO1FBQ3RFLElBQUksTUFBTSxDQUFDLFVBQVU7WUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7O1lBQ3BELElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUNGLENBQUM7SUFFRixNQUFNLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUUvQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtRQUN2QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQ2xDO0FBQ0gsQ0FBQztBQTdCRCxrQ0E2QkM7QUFFRCxLQUFLLFVBQVUsZ0JBQWdCLENBQUMsVUFBa0I7SUFDaEQsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxXQUFVLElBQUk7UUFDcEQsSUFBSSxRQUFRLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDdkMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQy9CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN2QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDeEM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxLQUFVO0lBQzFDLE9BQU87UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE9BQU8sRUFBRSxLQUFLO0tBQ2YsQ0FBQztBQUNKLENBQUM7QUFMRCw4Q0FLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBodHRwIGZyb20gXCJodHRwXCI7XG5pbXBvcnQgKiBhcyBkYiBmcm9tIFwiLi9tb25nb1wiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5cbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5jb25zdCBjb3JzID0gcmVxdWlyZShcImNvcnNcIik7XG5jb25zdCBkZWZhdWx0UG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMDtcblxuYXBwLnVzZShjb3JzKCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyB0eXBlOiBcImFwcGxpY2F0aW9uLyoranNvblwiIH0pKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gU3RhcnRTZXJ2ZXIoY29uZmlnOiB7XG4gIG1pZGRsZVdhcmU/OiBGdW5jdGlvbjtcbiAgcG9ydD86IG51bWJlcjtcbiAgY29udHJvbGxlcnNQYXRoOiBzdHJpbmc7XG4gIG1vbmdvREI6IGRiLklDZmdNb25nbztcbiAgc29ja2V0U2VydmVyOiBGdW5jdGlvbjtcbn0pIHtcbiAgYXdhaXQgZGIuc3RhcnRDbGllbnQoY29uZmlnLm1vbmdvREIpO1xuXG4gIGNvbnN0IHBvcnQgPSBOdW1iZXIoY29uZmlnLnBvcnQgfHwgZGVmYXVsdFBvcnQpO1xuXG4gIGFwcC51c2UoXG4gICAgKHJlcTogaHR0cC5JbmNvbWluZ01lc3NhZ2UsIHJlczogaHR0cC5SZXF1ZXN0T3B0aW9ucywgbmV4dDogRnVuY3Rpb24pID0+IHtcbiAgICAgIGlmIChjb25maWcubWlkZGxlV2FyZSkgY29uZmlnLm1pZGRsZVdhcmUocmVxLCByZXMsIG5leHQpO1xuICAgICAgZWxzZSBuZXh0KCk7XG4gICAgfVxuICApO1xuXG4gIGF3YWl0IHByb2Nlc3NSb3V0ZVBhdGgoY29uZmlnLmNvbnRyb2xsZXJzUGF0aCk7XG5cbiAgY29uc3Qgc2VydmVyID0gYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coYHNlcnZlciBpcyBsaXN0ZW5pbmcgb24gJHtwb3J0fWApO1xuICB9KTtcblxuICBpZiAoY29uZmlnLnNvY2tldFNlcnZlcikge1xuICAgIGNvbnN0IGlvID0gcmVxdWlyZShcInNvY2tldC5pb1wiKS5saXN0ZW4oc2VydmVyKTtcbiAgICBjb25maWcuc29ja2V0U2VydmVyKGlvKTtcbiAgICBjb25zb2xlLmxvZyhcIlNvY2tldCBhY3RpdmF0ZWQuXCIpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NSb3V0ZVBhdGgocm91dGVfcGF0aDogc3RyaW5nKSB7XG4gIGZzLnJlYWRkaXJTeW5jKHJvdXRlX3BhdGgpLmZvckVhY2goYXN5bmMgZnVuY3Rpb24oZmlsZSkge1xuICAgIHZhciBmaWxlcGF0aCA9IHJvdXRlX3BhdGggKyBcIi9cIiArIGZpbGU7XG4gICAgaWYgKGZpbGUuaW5kZXhPZihcIi5tYXBcIikgPT09IC0xKSB7XG4gICAgICBjb25zdCBuYW1lID0gZmlsZS5zcGxpdChcIi5cIilbMF07XG4gICAgICBjb25zb2xlLmluZm8oXCJMb2FkaW5nIHJvdXRlOiBcIiArIG5hbWUpO1xuICAgICAgYXBwLnVzZShcIi9cIiArIG5hbWUsIHJlcXVpcmUoZmlsZXBhdGgpKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU2VydmVyRXJyb3IoZXJyb3I6IGFueSkge1xuICByZXR1cm4ge1xuICAgIHN0YXR1czogNTAwLFxuICAgIG1lc3NhZ2U6IGVycm9yXG4gIH07XG59XG4iXX0=