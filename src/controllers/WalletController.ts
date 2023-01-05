import { NextFunction, Request, Response } from "express";
import { AppError, checkWalletBalance, Logger } from "../helpers";
import { findAuthUserWallet } from "../models";

class WalletController {
    constructor() {
        this.fundWallet = this.fundWallet.bind(this);
    }

    async fundWallet(req: Request, res: Response, next: NextFunction) {
        try {
            const { amount } = req.body;
            const { id } = req.user[0];
            const wallet = await findAuthUserWallet(id);
            Logger.success("Wallet found: " + wallet.address);
            const sufficientFunds = await checkWalletBalance(wallet.balance);
            if (!sufficientFunds) {
                return next(new AppError("Insufficient Funds", 400));
            }
            return res.status(200).json({
                success: true,
                data: "yea",
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

export default new WalletController();
