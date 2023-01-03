import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("wallets", (table) => {
        table.increments("id").primary();
        table.string("address").notNullable().unique();
        table.string("balance").nullable();
        table
            .string("user_id")
            .unique()
            .notNullable()
            .references("id")
            .inTable("users");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("wallets");
}
