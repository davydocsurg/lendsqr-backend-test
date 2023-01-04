export const DB_PORT = 8889;

const config = {
    http: {
        dbHost: process.env.DB_HOST!,
        dbUser: process.env.DB_USER!,
        dbPassword: process.env.DB_PASSWORD!,
        dbName: process.env.DB_NAME!,
        dbPort: DB_PORT || process.env.DB_PORT!,
        dbClient: process.env.DB_CLIENT! || "mysql",
    },
};

export default config;
