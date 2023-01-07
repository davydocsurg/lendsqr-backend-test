import request from "supertest";
import app from "../../app";

const transferFunds = jest.fn();

const data = JSON.stringify({
    amount: 45,
    email: "chibueze@gmail.com",
});

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjcyOTE2MDAwLCJleHAiOjE2NzMwMDI0MDB9.qqAce1s0jQv08KuAutjNMkv_mAyYdAgIZUgaQwoz0vY";

describe("POST /api/transfer-funds", () => {
    beforeEach(() => {
        transferFunds.mockClear();
    });

    test("should transfer funds to selected user account and return a message", async () => {
        const response = await request(app)
            .post("/api/transfer-funds")
            .set({
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            })
            .send(data);

        expect(transferFunds).toHaveBeenCalledTimes(1);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    });

    test("should return an error if user is not authenticated", async () => {
        const response = await request(app)
            .post("/api/transfer-funds")
            .set({
                Accept: "application/json",
            })
            .send(data);

        expect(transferFunds).toHaveBeenCalledTimes(0);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error");
    });

    test("should return an error if amount or email is not provided", async () => {
        const response = await request(app)
            .post("/api/transfer-funds")
            .set({
                Accept: "application/json",
            })
            .send(data);

        expect(transferFunds).toHaveBeenCalledTimes(0);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error");
    });

    test("should return an error if amount is greater than the user's wallet balance", async () => {
        const response = await request(app)
            .post("/api/transfer-funds")
            .set({
                Accept: "application/json",
            })
            .send(data);

        expect(transferFunds).toHaveBeenCalledTimes(0);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error");
    });
});
