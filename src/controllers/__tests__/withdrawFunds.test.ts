import request from "supertest";
import app from "../../app";

const data = JSON.stringify({
    amount: 70,
});

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjcyOTE2MDAwLCJleHAiOjE2NzMwMDI0MDB9.qqAce1s0jQv08KuAutjNMkv_mAyYdAgIZUgaQwoz0vY";

describe("POST /api/withdraw-funds", () => {
    it("withdraw funds from user's wallet", async () => {
        const response = await request(app)
            .post("/api/withdraw-funds")
            .set({
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            })
            .send(data);

        expect(response.status).toBe(200);
        return expect(response.body).toHaveProperty("message");
    });
});
