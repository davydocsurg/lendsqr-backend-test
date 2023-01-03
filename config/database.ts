import { knex } from "knex";
import { Logger } from "../src/helpers";
import { DB_PORT } from "./constants";

export const createKnexConnection = async () => {
    Logger.info("Creating knex connection...");

    try {
        knex({
            client: "mysql",
            connection: {
                host: process.env.DB_HOST,
                port: DB_PORT || process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            },
        });
        Logger.info("Knex connection created successfully!");
    } catch (error: any) {
        Logger.error("An error occured: " + error);
        throw new Error(error);
    }
};
