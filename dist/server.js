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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDRDQUE4QjtBQUM5Qix1Q0FBeUI7QUFFekIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ3RCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMxQyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBRTdDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUVwQixLQUFLLFVBQVUsV0FBVyxDQUFDLE1BTWpDO0lBQ0MsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVyQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsQ0FBQztJQUVoRCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxJQUFjLEVBQUUsRUFBRTtRQUM3QyxJQUFJLE1BQU0sQ0FBQyxVQUFVO1lBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOztZQUNwRCxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFL0MsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7UUFDdkIsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztLQUNsQztBQUNILENBQUM7QUEzQkQsa0NBMkJDO0FBRUQsS0FBSyxVQUFVLGdCQUFnQixDQUFDLFVBQWtCO0lBQ2hELEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssV0FBVSxJQUFJO1FBQ3BELElBQUksUUFBUSxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ3ZDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUMvQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDdkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsS0FBVTtJQUMxQyxPQUFPO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxPQUFPLEVBQUUsS0FBSztLQUNmLENBQUM7QUFDSixDQUFDO0FBTEQsOENBS0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkYiBmcm9tIFwiLi9tb25nb1wiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5cbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7XG5jb25zdCBjb3JzID0gcmVxdWlyZShcImNvcnNcIik7XG5jb25zdCBkZWZhdWx0UG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMDtcblxuYXBwLnVzZShjb3JzKCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oeyB0eXBlOiBcImFwcGxpY2F0aW9uLyoranNvblwiIH0pKTtcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gU3RhcnRTZXJ2ZXIoY29uZmlnOiB7XG4gIG1pZGRsZVdhcmU/OiBGdW5jdGlvbjtcbiAgcG9ydD86IG51bWJlcjtcbiAgY29udHJvbGxlcnNQYXRoOiBzdHJpbmc7XG4gIG1vbmdvREI6IGRiLklDZmdNb25nbztcbiAgc29ja2V0U2VydmVyOiBGdW5jdGlvbjtcbn0pIHtcbiAgYXdhaXQgZGIuc3RhcnRDbGllbnQoY29uZmlnLm1vbmdvREIpO1xuXG4gIGNvbnN0IHBvcnQgPSBOdW1iZXIoY29uZmlnLnBvcnQgfHwgZGVmYXVsdFBvcnQpO1xuXG4gIGFwcC51c2UoKHJlcTogYW55LCByZXM6IGFueSwgbmV4dDogRnVuY3Rpb24pID0+IHtcbiAgICBpZiAoY29uZmlnLm1pZGRsZVdhcmUpIGNvbmZpZy5taWRkbGVXYXJlKHJlcSwgcmVzLCBuZXh0KTtcbiAgICBlbHNlIG5leHQoKTtcbiAgfSk7XG5cbiAgYXdhaXQgcHJvY2Vzc1JvdXRlUGF0aChjb25maWcuY29udHJvbGxlcnNQYXRoKTtcblxuICBjb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKHBvcnQsICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgc2VydmVyIGlzIGxpc3RlbmluZyBvbiAke3BvcnR9YCk7XG4gIH0pO1xuXG4gIGlmIChjb25maWcuc29ja2V0U2VydmVyKSB7XG4gICAgY29uc3QgaW8gPSByZXF1aXJlKFwic29ja2V0LmlvXCIpLmxpc3RlbihzZXJ2ZXIpO1xuICAgIGNvbmZpZy5zb2NrZXRTZXJ2ZXIoaW8pO1xuICAgIGNvbnNvbGUubG9nKFwiU29ja2V0IGFjdGl2YXRlZC5cIik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc1JvdXRlUGF0aChyb3V0ZV9wYXRoOiBzdHJpbmcpIHtcbiAgZnMucmVhZGRpclN5bmMocm91dGVfcGF0aCkuZm9yRWFjaChhc3luYyBmdW5jdGlvbihmaWxlKSB7XG4gICAgdmFyIGZpbGVwYXRoID0gcm91dGVfcGF0aCArIFwiL1wiICsgZmlsZTtcbiAgICBpZiAoZmlsZS5pbmRleE9mKFwiLm1hcFwiKSA9PT0gLTEpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBmaWxlLnNwbGl0KFwiLlwiKVswXTtcbiAgICAgIGNvbnNvbGUuaW5mbyhcIkxvYWRpbmcgcm91dGU6IFwiICsgbmFtZSk7XG4gICAgICBhcHAudXNlKFwiL1wiICsgbmFtZSwgcmVxdWlyZShmaWxlcGF0aCkpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVTZXJ2ZXJFcnJvcihlcnJvcjogYW55KSB7XG4gIHJldHVybiB7XG4gICAgc3RhdHVzOiA1MDAsXG4gICAgbWVzc2FnZTogZXJyb3JcbiAgfTtcbn1cbiJdfQ==