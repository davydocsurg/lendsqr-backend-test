import * as Knex from "knex";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

// local imports
import { createUser, User } from "../models";
import { checkUser, Logger } from "../helpers";

class AuthController {
    constructor() {
        this.register = this.register.bind(this);
    }

    async register(
        knex: Knex.Knex,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            Logger.warn(req.headers);
            return;

            const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            const email = req.body.email;
            const password = req.body.password;
            const passwordConfirmation = req.body.passwordConfirmation;

            const userExists = await checkUser(knex, email);
            if (userExists) {
                return res.status(409).json({
                    success: false,
                    message: "User Already Exist. Please Login",
                });
            }

            if (password !== passwordConfirmation) {
                return res.json({
                    success: false,
                    message: "Password does not match. Check and try again",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const userInput = {
                first_name,
                last_name,
                email,
                password: hashedPassword,
            };
            Logger.warn("still got here");
            await createUser(knex, userInput);
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
