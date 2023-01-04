import * as crypto from "crypto";

export const generateWalletAddress = (): string => {
    // // Generate a random 32-byte buffer
    // const privateKey = crypto.randomBytes(32);
    // // Use the private key to create a public key
    // const publicKey = crypto.createPublicKey({
    //     key: privateKey,
    //     format: "der",
    //     type: "pkcs1",
    // });
    // const newPublicKey = Buffer.from(publicKey.export()).toString("utf-8");
    // // Use the public key to generate a wallet address
    // const walletAddress = crypto
    //     .createHash("sha256")
    //     .update(newPublicKey)
    //     .digest("hex");

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let walletAddress = "";
    for (let i = 0; i < chars.length; i++) {
        walletAddress += chars[Math.floor(Math.random() * chars.length)];
    }
    return walletAddress;
};
