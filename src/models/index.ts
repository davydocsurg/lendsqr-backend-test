import User, { createUser, findUserByEmail } from "./User";
import Wallet, {
    createWallet,
    findUserWallet,
    updateWalletBalance,
    transferFunds,
} from "./Wallet";

export {
    createUser,
    findUserByEmail,
    createWallet,
    findUserWallet,
    updateWalletBalance,
    transferFunds,
    User,
    Wallet,
};
