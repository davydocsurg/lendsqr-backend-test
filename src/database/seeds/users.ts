import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("table_name").del();

    // Inserts seed entries
    await knex("table_name").insert([
        {
            id: 1,
            first_name: "David",
            last_name: "Ndubuisi",
            email: "davydocsurg@gmail.com",
            password: "password",
        },
    ]);
}
