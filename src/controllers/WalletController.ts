import { NextFunction, Request, Response } from "express";

// local imports
import {
    AppError,
    checkWalletBalance,
    isAmountLessThanTwoDollar,
    Logger,
} from "../helpers";
import {
    findUserWallet,
    updateWalletBalance,
    findUserByEmail,
} from "../models";

class WalletController {
    constructor() {
        this.fundAuthUserWallet = this.fundAuthUserWallet.bind(this);
    }

    async fundAuthUserWallet(req: Request, res: Response, next: NextFunction) {
        try {
            const { amount } = req.body;
            const { id } = req.user[0];
            const wallet = await findUserWallet(id, next);

            // if (amount < 2) {
            //     return next(
            //         new AppError("Amount must be greater than $1", 400)
            //     );
            // }
            isAmountLessThanTwoDollar(amount, next);
            let updateType = "add";
            const newBalance = await updateWalletBalance(
                wallet!,
                amount,
                updateType
            );

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

    async transferFundsToAnotherUser(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { amount, email } = req.body;
            const { id } = req.user[0];

            isAmountLessThanTwoDollar(amount, next);

            // check if user exists
            const userExists = await findUserByEmail(email);
            if (!userExists) {
                return next(new AppError("User does not exist", 404));
            }

            // check if auth user has sufficient funds
            const wallet = await findUserWallet(id, next);
            const sufficientFunds = await checkWalletBalance(wallet?.balance!);
            if (!sufficientFunds) {
                return next(new AppError("Insufficient Funds", 400));
            }
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
