import bcrypt from "bcryptjs";

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

export const findUserByEmail = async (
    email: string
): Promise<UserType | any> => {
    const knex = await createKnexConnection();

    const user = await knex!("users").select().where({ email: email });
    if (user.length > 0) {
        return user[0];
    }
    return null;
};

export const comparePassword = async (
    user: UserType,
    password: string
): Promise<boolean> => {
    const comparePwd = await bcrypt.compare(password, user.password);

    if (!comparePwd) {
        return false;
    }

    return true;
};
