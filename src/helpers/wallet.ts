import { NextFunction } from "express";
import { MIN_AMOUNT } from "../../config";
import { AppError } from "./AppError";

export const generateWalletAddress = (): string => {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let walletAddress = "";
    for (let i = 0; i < chars.length; i++) {
        walletAddress += chars[Math.floor(Math.random() * chars.length)];
    }
    return walletAddress;
};

export const checkWalletBalance = async (balance: number): Promise<boolean> => {
    if (balance < MIN_AMOUNT) {
        return false;
    }
    return true;
};

export const compareWalletBalanceWithAmount = async (
    balance: number,
    amount: number
): Promise<boolean> => {
    if (balance < amount) {
        return false;
    }
    return true;
};

export const isAmountLessThanTwoDollar = (
    amount: number,
    next: NextFunction
): void => {
    if (amount < 2) {
        return next(new AppError("Amount must be greater than $1", 400));
    }
    return;
};
