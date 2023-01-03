import * as Knex from "knex";
// import { destroy } from "knex/lib";

// local imports
import { createKnexConnection } from "../../config";

describe("database connection", () => {
    beforeAll(async () => {
        await createKnexConnection();
    });

    afterAll(async () => {
        const knex = await createKnexConnection();
        if (knex) {
            await knex.destroy();
        }
    });

    it("should be able to connect to the database", async () => {
        const knex = await createKnexConnection();
        if (knex) {
            const result = await knex.raw("SELECT VERSION()");
            expect(result[0][0].result).toBe(2);
        }
    });
});
