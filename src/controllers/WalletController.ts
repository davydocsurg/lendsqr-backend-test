import { NextFunction, Request, Response } from "express";
import { AppError, checkWalletBalance, Logger } from "../helpers";
import { findAuthUserWallet, updateWalletBalance } from "../models";

class WalletController {
    constructor() {
        this.fundAuthUserWallet = this.fundAuthUserWallet.bind(this);
    }

    async fundAuthUserWallet(req: Request, res: Response, next: NextFunction) {
        try {
            const { amount } = req.body;
            const { id } = req.user[0];
            const wallet = await findAuthUserWallet(id);
            // const sufficientFunds = await checkWalletBalance(wallet.balance);
            // if (!sufficientFunds) {
            //     return next(new AppError("Insufficient Funds", 400));
            // }
            if (amount < 2) {
                return next(
                    new AppError("Amount must be greater than $1", 400)
                );
            }
            const newBalance = await updateWalletBalance(wallet, amount);

            return res.status(200).json({
                success: true,
                message: `$${amount} has been added to your wallet. Your new balance is $${newBalance}`,
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
