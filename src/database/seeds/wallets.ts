import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("wallets").del();

    // Inserts seed entries
    await knex("wallets").insert([
        {
            id: 1,
            address:
                "7f6a9eb6c8e3f17b2e2c3e3e3f3d6028d6e92a6a9a6f8e79bce60d4e49b44eaa",
            balance: "250",
            user_id: 1,
        },
    ]);
}
