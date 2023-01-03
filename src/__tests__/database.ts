import { Knex as Knextype, knex } from "knex";
// import * as Knex from "knex";
// import { destroy } from "knex/lib";

// local imports
import { createKnexConnection } from "../../config";

describe("database connection", () => {
    let knex: Knextype;

    beforeAll(async () => {
        await createKnexConnection();
    });

    afterAll(async () => {
        await knex.destroy();
    });

    it("should be able to connect to the database", async () => {
        const result = await knex.raw("SELECT 1+1 as result");
        expect(result[0][0].result).toBe(2);
    });
});
