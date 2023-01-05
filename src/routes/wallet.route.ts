import express from "express";
import { WalletController } from "../controllers";
import { isAuthenticated } from "../middleware";

const walletRoutes = express.Router();

walletRoutes.get("/fund", isAuthenticated, WalletController.fundWallet);

export default walletRoutes;
