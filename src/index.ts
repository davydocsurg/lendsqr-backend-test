import dotenv from "dotenv";
dotenv.config();
// locals
import app from "./app";
import { Logger } from "./helpers";

// Uncaught Exceptions
process.on("uncaughtException", (err) => {
    Logger.error(err);
    process.exit(1);
});

if (!process.env.APP_PORT) {
    process.exit(1);
}

exports.APP_PORT = parseInt(process.env.APP_PORT, 10);

const server = app.listen(exports.APP_PORT, () => {
    Logger.info(`🚀 Server ready at port: ${exports.APP_PORT}`);
});
process.on("unhandledRejection", (err) => {
    Logger.error(err);
    server.close(() => {
        process.exit(1);
    });
});
