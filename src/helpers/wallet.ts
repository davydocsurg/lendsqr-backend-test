import { MIN_AMOUNT } from "../../config";

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
