import * as Knex from "knex";
import Logger from "./customLogs";

export const checkUser = async (
    knex: Knex.Knex,
    email: string
): Promise<boolean> => {
    const user = await knex("users").where("email", email).first();
    if (user) {
        Logger.info(user);
        return true;
    }
    return false;
};
