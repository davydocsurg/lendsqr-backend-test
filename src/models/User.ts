import { createKnexConnection } from "../../config";
import { Logger } from "../helpers";
import { UserType } from "../types";

class User {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;

    constructor(
        // id?: number,
        first_name: string,
        last_name: string,
        email: string,
        password: string
    ) {
        // this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
}

export const createUser = async (userInput: User): Promise<void> => {
    const knex = await createKnexConnection();
    await knex!("users").insert([
        {
            first_name: userInput.first_name,
            last_name: userInput.last_name,
            email: userInput.email,
            password: userInput.password,
        },
    ]);
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

export default User;
