import request from "supertest";
import app from "../../app";

const fundWallet = jest.fn();

const data = JSON.stringify({
    amount: 70,
});

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjcyOTE2MDAwLCJleHAiOjE2NzMwMDI0MDB9.qqAce1s0jQv08KuAutjNMkv_mAyYdAgIZUgaQwoz0vY";

describe("POST /api/withdraw-funds", () => {
    beforeEach(() => {
        fundWallet.mockClear();
    });

    test("should withdraw funds from user's wallet", async () => {
        const response = await request(app)
            .post("/api/withdraw-funds")
            .set({
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            })
            .send(data);

        expect(fundWallet).toHaveBeenCalledTimes(1);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
    });

    test("should return an error if user is not authenticated", async () => {
        const response = await request(app)
            .post("/api/withdraw-funds")
            .set({
                Accept: "application/json",
            })
            .send(data);

        expect(fundWallet).toHaveBeenCalledTimes(0);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error");
    });

    test("should return an error if amount is not provided or is equal to 0", async () => {
        const response = await request(app)
            .post("/api/withdraw-funds")
            .set({
                Accept: "application/json",
            })
            .send(data);

        expect(fundWallet).toHaveBeenCalledTimes(0);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error");
    });

    test("should return an error if amount is greater than the user's wallet balance", async () => {
        const response = await request(app)
            .post("/api/withdraw-funds")
            .set({
                Accept: "application/json",
            })
            .send(data);

        expect(fundWallet).toHaveBeenCalledTimes(0);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error");
    });
});
