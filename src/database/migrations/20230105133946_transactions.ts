import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("transactions", (table) => {
        table.increments("id").primary();
        table
            .string("sender_email", 255)
            .notNullable()
            .references("email")
            .inTable("users");
        table
            .string("receiver_email", 255)
            .notNullable()
            .references("email")
            .inTable("users");
        table.string("description", 255).notNullable();
        table.integer("amount").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("transactions");
}
