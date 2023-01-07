import * as request from "supertest";
import app from "../../app";

jest.setTimeout(50000);

const registerUser = jest.fn();
const loginUser = jest.fn();

const registrationData = JSON.stringify({
    first_name: "John",
    last_name: "Doe",
    email: "doe@gmail.com",
    password: "password",
});

const loginDetails = JSON.stringify({
    email: "doe@gmail.com",
    password: "password",
});

describe("POST /api/register", () => {
    beforeEach(() => {
        registerUser.mockClear();
        registerUser.mockResolvedValue(0);
    });

    describe("given a fistname, lastname, email and password", () => {
        test("should save the firstname, lastname, email and password to the database", async () => {
            const response = await request
                .default(app)
                .post("/api/register")
                .send(registrationData);
            expect(response.body.success).toBe(true);
            expect(registerUser.mock.calls.length).toBe(1);
        });

        test("should return a message when registration is successful", async () => {
            const response = await request
                .default(app)
                .post("/api/register")
                .send(registrationData);
            expect(response.body.message).toBe("User registered successfully");
        });
    });

    describe("given an email that already exists in the database", () => {
        test("should return an error message", async () => {
            const response = await request
                .default(app)
                .post("/api/register")
                .send(registrationData);
            expect(response.body.error).toBe("User already exists");
        });
    });
});

describe(`POST /api/login`, () => {
    test("should return a message when login is successful", async () => {
        const response = await request
            .default(app)
            .post("/api/login")
            .set("Accept", "application/json")
            .send(loginDetails);

        expect(loginUser.mock.calls.length).toBe(1);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User logged in successfully");
    });

    test("should return a token when login is successful", async () => {
        const response = await request
            .default(app)
            .post("/api/login")
            .set("Accept", "application/json")
            .send(loginDetails);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    test("should return an error message when login is unsuccessful", async () => {
        const response = await request
            .default(app)
            .post("/api/login")
            .set("Accept", "application/json")
            .send(loginDetails);

        expect(response.status).toBe(200);
        expect(response.body.error).toBe("Invalid email or password");
    });
});
