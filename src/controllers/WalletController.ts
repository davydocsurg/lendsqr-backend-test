import { NextFunction, Request, Response } from "express";

// local imports
import {
    AppError,
    checkWalletBalance,
    compareWalletBalanceWithAmount,
    isAmountLessThanOneDollar,
    isAmountLessThanTwoDollar,
    Logger,
} from "../helpers";
import {
    findUserWallet,
    updateWalletBalance,
    findUserByEmail,
    transferFunds,
    createTransaction,
} from "../models";

class WalletController {
    constructor() {
        this.fundAuthUserWallet = this.fundAuthUserWallet.bind(this);
        this.transferFundsToAnotherUser =
            this.transferFundsToAnotherUser.bind(this);
        this.withdrawFunds = this.withdrawFunds.bind(this);
    }

    async fundAuthUserWallet(req: Request, res: Response, next: NextFunction) {
        try {
            const { amount } = req.body;
            const { id } = req.user[0];

            const wallet = await findUserWallet(id, next);

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
                errors: error,
            });
        }
    }

    async transferFundsToAnotherUser(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { amount, receiver_email, description } = req.body;
            const { id } = req.user[0];

            isAmountLessThanTwoDollar(amount, next);

            // check if user exists
            const userExists = await findUserByEmail(receiver_email);
            if (!userExists) {
                return next(new AppError("User does not exist", 404));
            } else if (userExists.email === req.user[0].email) {
                return next(
                    new AppError(
                        "Can't transfer funds to yourself. Fund your account instead",
                        400
                    )
                );
            }

            // check if auth user has sufficient funds
            const wallet = await findUserWallet(id, next);
            const sufficientFunds = await compareWalletBalanceWithAmount(
                wallet?.balance!,
                amount
            );
            if (!sufficientFunds) {
                return next(new AppError("Insufficient Funds", 400));
            }

            // initiate transaction
            await transferFunds(req, receiver_email, amount, next);
            await createTransaction(req, receiver_email, description, amount);

            return res.status(201).json({
                success: true,
                message: {
                    sender: `Your transaction was successful. $${amount} have been deducted from your wallet`,
                    receiver: `$${amount} have been transfered to your wallet`,
                },
            });
        } catch (error: unknown) {
            Logger.error("An error occured: " + error);
            return res.json({
                success: false,
                errors: error,
            });
        }
    }

    async withdrawFunds(req: Request, res: Response, next: NextFunction) {
        try {
            const { amount } = req.body;
            const { id } = req.user[0];

            const wallet = await findUserWallet(id, next);

            isAmountLessThanOneDollar(amount, next);

            const sufficientFunds = await compareWalletBalanceWithAmount(
                wallet?.balance!,
                amount
            );
            if (!sufficientFunds) {
                return next(new AppError("Insufficient Funds", 400));
            }

            let updateType = "deduct";
            const newBalance = await updateWalletBalance(
                wallet!,
                amount,
                updateType
            );

            return res.status(200).json({
                success: true,
                message: `Debit Amount: $${amount}. Your new balance is $${newBalance}`,
            });
        } catch (error: unknown) {
            Logger.error("An error occured: " + error);
            return res.json({
                success: false,
                errors: error,
            });
        }
    }
}

export default new WalletController();
