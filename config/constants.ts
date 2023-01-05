export const DB_PORT = 8889;
export const JWT_SECRET = "@davydocsurg@Mobile";
export const MIN_AMOUNT = 1;
export const MAX_AMOUNT = 1;

export const cookieOptions = {
    expires: new Date(Date.now() + parseInt("90", 10) * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
};

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
