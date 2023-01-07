import request from "supertest";
import app from "../../app";

jest.setTimeout(50000);

const fundWallet = jest.fn();

const data = JSON.stringify({
    amount: 20,
});

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjcyOTE2MDAwLCJleHAiOjE2NzMwMDI0MDB9.qqAce1s0jQv08KuAutjNMkv_mAyYdAgIZUgaQwoz0vY";

describe("POST /api/fund-my-wallet", () => {
    beforeEach(() => {
        fundWallet.mockClear();
    });

    test("should fund user wallet and returns a message", async () => {
        const response = await request(app)
            .post("/api/fund-my-wallet")
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
            .post("/api/fund-my-wallet")
            .set({
                Accept: "application/json",
            })
            .send(data);

        expect(fundWallet).toHaveBeenCalledTimes(0);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error");
    });

    test("should return an error amount is not provided", async () => {
        const response = await request(app)
            .post("/api/fund-my-wallet")
            .set({
                Accept: "application/json",
            })
            .send(data);

        expect(fundWallet).toHaveBeenCalledTimes(0);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error");
    });
});
