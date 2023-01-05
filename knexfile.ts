import dotenv from "dotenv";
import type { Knex } from "knex";

// local imports
import { DB_PORT, PROD_DB_PORT } from "./config";

// Update with your config settings.

dotenv.config();
const KnexConfig: { [key: string]: Knex.Config } = {
    development: {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: DB_PORT || process.env.DB_PORT,
            timezone: "Z",
            stringifyObjects: true,
        },
        pool: {
            min: 2,
            max: 20,
        },
        migrations: {
            directory: "./src/database/migrations",
            extension: "ts",
        },
        seeds: {
            directory: "./src/database/seeds",
            extension: "ts",
        },
        useNullAsDefault: true,
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
            host: process.env.PROD_DB_HOST,
            database: process.env.PROD_DB_NAME,
            user: process.env.PROD_DB_USER,
            password: process.env.PROD_DB_PASSWORD,
            port: PROD_DB_PORT || process.env.PROD_DB_PORT,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: "./src/database/migrations",
            extension: "ts",
        },
        seeds: {
            directory: "./src/database/seeds",
            extension: "ts",
        },
    },
};

export default KnexConfig;
