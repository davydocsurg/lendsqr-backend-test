import request from "supertest";
import app from "../app";

describe("test the root path", () => {
    test("should GET the index path", async () => {
        const response = await request(app).get("/");
        return expect(response.statusCode).toBe(200);
    });
});
