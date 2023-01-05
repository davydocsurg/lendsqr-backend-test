import { Request } from "express";
import { createKnexConnection } from "../../config";

class Transaction {
    sender_email: string;
    receiver_email: string;
    description: string;
    amount: number;

    constructor(
        sender_email: string,
        receiver_email: string,
        description: string,
        amount: number
    ) {
        this.sender_email = sender_email;
        this.receiver_email = receiver_email;
        this.description = description;
        this.amount = amount;
    }
}

export const createTransaction = async (
    req: Request,
    receiverEmail: string,
    description: string,
    amount: number
): Promise<void> => {
    const knex = await createKnexConnection();
    await knex!("transactions").insert([
        {
            sender_email: req.user[0].email,
            receiver_email: receiverEmail,
            description,
            amount,
        },
    ]);
};

export default Transaction;
