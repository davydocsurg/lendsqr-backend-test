import request from "supertest";
import app from "../../app";

jest.setTimeout(50000);

const data = JSON.stringify({
    amount: 20,
});

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjcyOTE2MDAwLCJleHAiOjE2NzMwMDI0MDB9.qqAce1s0jQv08KuAutjNMkv_mAyYdAgIZUgaQwoz0vY";

describe("POST /api/fund-my-wallet", () => {
    it("funds user account and returns a message", async () => {
        const response = await request(app)
            .post("/api/fund-my-wallet")
            .set({
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            })
            .send(data);

        expect(response.status).toBe(200);
        return expect(response.body).toHaveProperty("message");
    });
});
