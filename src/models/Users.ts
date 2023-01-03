import * as Knex from "knex";

class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;

    constructor(
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        password: string
    ) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
}

export const create = async (knex: Knex.Knex, user: User): Promise<void> => {
    await knex("users").insert([
        {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
        },
    ]);
};

export default User;
