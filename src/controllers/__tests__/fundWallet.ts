import request from "supertest";
import app from "../../app";

const data = JSON.stringify({
    amount: 20,
});

describe("POST /api/fund-my-wallet", () => {
    it("funds user account and returns a message", async () => {
        const response = await request(app)
            .post("/api/fund-my-wallet")
            .send(data);

        expect(response.status).toBe(200);
        return expect(response.body).toHaveProperty("message");
    });
});
