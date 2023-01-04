import { createKnexConnection } from "../../config";
import Logger from "./customLogs";

export const checkUser = async (email: string): Promise<boolean> => {
    const knex = await createKnexConnection();

    const row = await knex!("users").select().where({ email });
    if (row.length > 0) {
        Logger.info(row);
        return true;
    }
    return false;
};
