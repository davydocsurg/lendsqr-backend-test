import { NextFunction } from "express";
import { createKnexConnection } from "../../config";
import { AppError, Logger } from "../helpers";
import { WalletType } from "../types";
import { findUserByEmail } from "./User";

class Wallet {
    address: string;
    balance: string;
    user_id: number;

    constructor(address: string, balance: string, user_id: number) {
        this.address = address;
        this.balance = balance;
        this.user_id = user_id;
    }
}

export const createWallet = async (
    userId: number,
    walletAddress: string,
    balance: number
): Promise<void> => {
    const knex = await createKnexConnection();
    await knex!("wallets").insert([
        {
            user_id: userId,
            address: walletAddress,
            balance: balance,
        },
    ]);
};

export const findUserWallet = async (
    userId: number,
    next: NextFunction
): Promise<WalletType | void> => {
    const knex = await createKnexConnection();
    const wallet = await knex!("wallets").select().where({ user_id: userId });
    if (!wallet) {
        return next(new AppError("Wallet not found", 400));
    }
    return wallet[0];
};

export const updateWalletBalance = async (
    wallet: WalletType,
    amount: number,
    updateType: string
): Promise<number | null> => {
    const knex = await createKnexConnection();
    if (updateType === "add") {
        const newBalance = +wallet.balance + amount;
        await knex!("wallets")
            .where({ id: wallet.id })
            .update({ balance: newBalance });
        return newBalance;
    } else if (updateType === "deduct") {
        const newBalance = +wallet.balance - amount;
        await knex!("wallets")
            .where({ id: wallet.id })
            .update({ balance: newBalance });
        return newBalance;
    }
    return null;
};

export const transferFunds = async (
    receiverEmail: string,
    amount: number,
    next: NextFunction
): Promise<number | void> => {
    // find receiver
    const receiver = await findUserByEmail(receiverEmail);
    if (!receiver) {
        return next(new AppError("User does not exist", 400));
    }

    // deduct amount from sender wallet
    const senderWallet = await findUserWallet(req.user.id, next);
    let senderWalletUpdateType = "deduct";
    await updateWalletBalance(senderWallet!, amount, senderWalletUpdateType);

    // add amount to receiver wallet
    const receiverWallet = await findUserWallet(receiver, next);
    let receiverWalletUpdateType = "add";
    await updateWalletBalance(
        receiverWallet!,
        amount,
        receiverWalletUpdateType
    );

    return amount;
};

export default Wallet;
