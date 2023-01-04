import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

// local imports
import { createUser, createWallet, User } from "../models";
import {
    AppError,
    checkUser,
    findUserByEmail,
    generateWalletAddress,
    Logger,
} from "../helpers";

class AuthController {
    constructor() {
        this.register = this.register.bind(this);
        this.createUserWallet = this.createUserWallet.bind(this);
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            const email = req.body.email;
            const password = req.body.password;
            const passwordConfirmation = req.body.passwordConfirmation;

            const userExists = await checkUser(email);
            if (userExists) {
                Logger.warn("User already exist");
                return res.status(409).json({
                    success: false,
                    message: "User Already Exist. Please Login",
                });
            }

            if (password !== passwordConfirmation) {
                return next(new AppError("Password does not match", 400));
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const userInput = {
                first_name,
                last_name,
                email,
                password: hashedPassword,
            };

            await createUser(userInput);

            await this.createUserWallet(email);
            return res.status(201).json({
                success: true,
                data: null,
                message: "User created successfully",
            });
        } catch (error: unknown) {
            Logger.error("An error occured: " + error);
        }
    }

    async createUserWallet(email: string) {
        const userData = findUserByEmail(email);
        const walletAddress = generateWalletAddress();
        Logger.info("Wallet Address: " + walletAddress + userData);
        let balance = 100;
        await createWallet((await userData).id, walletAddress, balance);
    }
}

export default new AuthController();
