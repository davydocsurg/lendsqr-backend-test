import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

// local imports
import { createUser, createWallet, findUserByEmail } from "../models";
import {
    AppError,
    checkUser,
    comparePassword,
    createUserToken,
    generateWalletAddress,
    Logger,
} from "../helpers";

class AuthController {
    constructor() {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
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
        let balance = 0;
        await createWallet((await userData).id, walletAddress, balance);
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const userExists = await findUserByEmail(email);
            const validatePassword = await comparePassword(
                userExists,
                password
            );

            if (!userExists || !validatePassword) {
                return next(new AppError("Invalid Credentials", 401));
            }

            const token = createUserToken(userExists, 200, res);
            req.user = userExists;

            return res.status(200).json({
                success: true,
                data: { token, user: userExists },
                message: "Login successful",
            });
        } catch (error: unknown) {
            Logger.error("An error occured: " + error);
            return res.json({
                success: false,
                message: error,
            });
        }
    }
}

export default new AuthController();
