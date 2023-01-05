import assert from "assert";
import { createKnexConnection } from "../../../config";

describe("Authentication", () => {
    // beforeEach(async () => {
    //     const knex = await createKnexConnection();
    //     // create test users in the database
    //     await knex!("users").insert([
    //         { email: "test@demowallet.com", password: "password1" },
    //         { email: "test1@demowallet.com", password: "password2" },
    //     ]);
    // });

    // afterEach(async () => {
    //     const knex = await createKnexConnection();
    //     // clear test users from the database
    //     await knex!("users").del();
    // });

    it("should return true for successful login", async () => {
        const res = await loginUser("doe@gmail.com", "password1");
        assert(res === true);
    });

    it("should return false for failed login", async () => {
        const res = await loginUser("doe@gmail.com", "wrong password");
        assert(res === false);
    });
});

const loginUser = async (email: string, password: string) => {
    const knex = await createKnexConnection();

    const rows = await knex!("users").select().where({ email });
    return rows.length > 0;
};
