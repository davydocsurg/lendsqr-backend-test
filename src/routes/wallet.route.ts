import express from "express";
import { WalletController } from "../controllers";
import { fundAuthWalletValidator, isAuthenticated } from "../middleware";

const walletRoutes = express.Router();

walletRoutes.get(
    "/fund",
    isAuthenticated,
    fundAuthWalletValidator,
    WalletController.fundAuthUserWallet
);

export default walletRoutes;
