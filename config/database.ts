import * as Knex from "knex";
import dotenv from "dotenv";

// local imports
import KnexConfig from "../knexfile";
import { Logger } from "../src/helpers";
import { DB_PORT } from "./constants";

dotenv.config();

export const createKnexConnection = async () => {
    Logger.info("Creating knex connection...");
    try {
        const knex = Knex.default(
            KnexConfig[process.env.NODE_ENV || "development"]
            // {
            //     client: "mysql2",
            //     connection: {
            //         host: process.env.DB_HOST,
            //         port: DB_PORT || process.env.DB_PORT,
            //         user: process.env.DB_USER,
            //         password: process.env.DB_PASSWORD,
            //         database: process.env.DB_NAME,
            //     },
            // }
        );

        const dbHandshake = await knex.raw("SELECT VERSION()");

        if (dbHandshake) {
            Logger.success("Knex connection created successfully!");
        }

        return knex;
    } catch (error: any) {
        Logger.error("An error occured: " + error);
        // throw new Error(error);
    }
};
