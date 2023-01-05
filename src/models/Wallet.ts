import { createKnexConnection } from "../../config";
import { Logger } from "../helpers";

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

export const findAuthUserWallet = async (userId: number) => {
    const knex = await createKnexConnection();
    const wallet = await knex!("wallets").select().where({ user_id: userId });
    return wallet[0];
};

export default Wallet;
