import * as request from "supertest";
import app from "../../app";
import { Logger } from "../../helpers";

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
jest.setTimeout(50000);

describe(`POST /api/login`, () => {
    // test("logs in a user and returns a token and logged in user's data", async () => {
    it("should return a message when login is successful", async () => {
        const response = await request
            .default(app)
            .post("/api/login")
            .set("Accept", "application/json")
            .send(loginDetails);

        expect((res: request.Response) => {
            Logger.info(res.body);
            Logger.info(response.body);
        }).toBe(200);
        // expect(response.body).toMatchObject({
        //     success: true,
        //     data: {
        //         token: expect.any(String),
        //         user: {
        //             id: 2,
        //             first_name: expect.any(String),
        //             last_name: expect.any(String),
        //             email: expect.any(String),
        //             password: expect.any(String),
        //             created_at: expect.any(String),
        //             updated_at: expect.any(String),
        //         },
        //     },
        //     message: "Login successful",
        // });
        // return response;
    });
});
