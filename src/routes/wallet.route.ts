import express from "express";
import { WalletController } from "../controllers";
import { catchAsync } from "../helpers";
import { verifyAmount, isAuthenticated } from "../middleware";

const walletRoutes = express.Router();

walletRoutes.post(
    "/fund-my-wallet",
    isAuthenticated,
    // verifyAmount,
    catchAsync(WalletController.fundAuthUserWallet)
);

walletRoutes.post(
    "/transfer-funds",
    isAuthenticated,
    verifyAmount,
    catchAsync(WalletController.transferFundsToAnotherUser)
);

export default walletRoutes;
