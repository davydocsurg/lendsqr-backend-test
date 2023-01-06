import assert from "assert";
import { createKnexConnection } from "../../../config";

import * as request from "supertest";
import app from "../../app";

// // Create a Knex client
// createKnexConnection();

// beforeAll(async () => {
//     // get knex instance
//     const knex = await createKnexConnection();

//     // Create a test user
//     await knex!("users").insert([
//         {
//             first_name: "Test",
//             last_name: "User",
//             email: "test@example.com",
//             password: "mypassword",
//         },
//     ]);
// });

// afterAll(async () => {
//     // get knex instance
//     const knex = await createKnexConnection();

//     // Clean up by deleting the test user
//     await knex!("users").where("email", "test@example.com").del();
//     // Close the Knex client
//     await knex!.destroy();
// });

const loginDetails = JSON.stringify({
    email: "doe@gmail.com",
    password: "password",
});
// jest.setTimeout(100000);

describe(`POST /api/login`, () => {
    it("logs in a user and returns a token and logged in user's data", async () => {
        const response = await request
            .default(app)
            .post("/api/login")
            .send(loginDetails);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });
});
