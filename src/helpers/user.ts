import { createKnexConnection } from "../../config";

// types
import type { UserType } from "../types";
import Logger from "./customLogs";

export const checkUser = async (email: string): Promise<boolean> => {
    const knex = await createKnexConnection();

    const row = await knex!("users").select().where({ email });
    if (row.length > 0) {
        return true;
    }
    return false;
};

export const findUserByEmail = async (email: string): Promise<UserType> => {
    const knex = await createKnexConnection();

    const user = await knex!("users").select().where({ email: email });
    // if (user.length > 0) {
    return user[0];
    // }
};
