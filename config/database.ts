import * as Knex from "knex";
import dotenv from "dotenv";

// local imports
import KnexConfig from "../knexfile";
import { Logger } from "../src/helpers";

dotenv.config();

export const createKnexConnection = async () => {
    Logger.info("Creating knex connection...");
    try {
        const knex = Knex.default(
            KnexConfig["production"] //process.env.NODE_ENV ||
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
