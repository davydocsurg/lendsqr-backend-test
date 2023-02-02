import AuthController from "../AuthController";
import { Request, Response } from "express";

describe("register handler", () => {
    const knexMock = {
        insert: jest.fn().mockReturnValue(Promise.resolve({})),
    };

    jest.mock("knex", () => ({
        __esModule: true,
        default: jest.fn(() => knexMock),
    }));
    type ResponseType = {
        success: boolean;
        data: null;
        message: string;
    };

    it("should create a new user and return a 200 status code", async () => {
        const req = {
            body: {
                first_name: "John",
                last_name: "Doe",
                email: "john@doe.com",
                password: "password",
                passwordConfirmation: "password",
            },
        } as Request;
        const res = {
            json({ success, data, message }: ResponseType) {
                expect(success).toBe(true);
                expect(data).toBe(null);
                expect(message).toBe("User created successfully");
            },
        } as Response; // mock response

        await AuthController.register(req, res, () => {});

        expect(knexMock.insert).toHaveBeenCalledWith(
            {
                first_name: "John",
                last_name: "Doe",
                email: "john@doe.com",
                password: "password",
                passwordConfirmation: "password",
            },
            "id"
        );
    });
});
