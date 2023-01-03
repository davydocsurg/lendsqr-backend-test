import * as Knex from "knex";
import { createUser, User } from "../models";
import { Response } from "express";
import { Logger } from "../helpers";

class AuthController {
    constructor() {
        this.register = this.register.bind(this);
    }

    async register(knex: Knex.Knex, user: User, res: Response) {
        try {
            await createUser(knex, user);
            return res.status(201).json({
                success: true,
                data: null,
                message: "User created successfully",
            });
        } catch (error: unknown) {
            Logger.error("An error occured: " + error);
        }
    }
}

export default new AuthController();
