import * as Knex from "knex";
import { create, User } from "../models";
import { Response } from "express";
import { Logger } from "../helpers";

class UserController {
    constructor() {
        this.createUser = this.createUser.bind(this);
    }

    async createUser(knex: Knex.Knex, user: User, res: Response) {
        try {
            await create(knex, user);
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

export default new UserController();
