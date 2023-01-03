import * as Knex from "knex";
import { config } from "../knexfile";
import { Logger } from "../src/helpers";
import { DB_PORT } from "./constants";

export const createKnexConnection = async () => {
    Logger.info("Creating knex connection...");

    try {
        // const knex = require("knex")({
        //     client: "mysql",
        //     connection: {
        //         host: process.env.DB_HOST,
        //         port: DB_PORT || process.env.DB_PORT,
        //         user: process.env.DB_USER,
        //         password: process.env.DB_PASSWORD,
        //         database: process.env.DB_NAME,
        //     },
        // });

        const knex = Knex.knex(config[process.env.NODE_ENV || "development"]);
        const dbHandshake = await knex.raw("SELECT VERSION()");

        if (dbHandshake) {
            Logger.info("Knex connection created successfully!");
        }
        // knex.raw("SELECT VERSION()").then((res) => {
        // Logger.info("Knex connection created successfully!");
        // });

        // return dbConnection;
    } catch (error: any) {
        Logger.error("An error occured: " + error);
        throw new Error(error);
    }
};
