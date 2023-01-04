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
    user_id: number,
    walletAddress: string,
    balance: number
): Promise<void> => {
    const knex = await createKnexConnection();
    Logger.info(user_id + "from createWalllet");
    await knex!("wallets").insert([
        {
            user_id: user_id,
            address: walletAddress,
            balance: balance,
        },
    ]);
};

export default Wallet;
