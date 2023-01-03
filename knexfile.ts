import type { Knex } from "knex";
import { DB_PORT } from "./config";

// Update with your config settings.

export const config: { [key: string]: Knex.Config } = {
    development: {
        client: "mysql",
        connection: {
            filename: "config/database.ts",
            // database: process.env.DB_NAME,
            // user: process.env.DB_USER,
            // password: process.env.DB_PASSWORD,
            // port: DB_PORT || process.env.DB_PORT,
        },
        migrations: {
            directory: "./src/database/migrations",
            extension: "ts",
        },
        seeds: {
            directory: "./src/database/seeds",
        },
    },

    staging: {
        client: "mysql",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "mysql",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};

// module.exports = config;
