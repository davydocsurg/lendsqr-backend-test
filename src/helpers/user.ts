// import { Knex } from "knex";
import * as Knex from "knex";
import Logger from "./customLogs";

export const checkUser = async (
    knex: Knex.Knex,
    email: string
): Promise<boolean> => {
    const row = await Knex.knex("users").select().where({ email });
    if (row.length > 0) {
        Logger.info(row);
        return true;
    }
    return false;
};
