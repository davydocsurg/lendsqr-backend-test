import { Knex } from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            id: 1,
            first_name: "David",
            last_name: "Ndubuisi",
            email: "davydocsurg@gmail.com",
            password: await bcrypt.hash("password", 12),
        },
    ]);
}
