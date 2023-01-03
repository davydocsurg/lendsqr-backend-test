import express from "express";
import { AuthController } from "../controllers";
import { catchAsync } from "../helpers";
import { ValidateCreateUserRequest } from "../middleware";

const authRoutes = express.Router();

authRoutes.post(
    "/register",
    ValidateCreateUserRequest,
    catchAsync(AuthController.register)
);

export default authRoutes;
