import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import validate from "./validate";

const ValidateLoginRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return validate(
        [
            check("email")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Email is required"),
            check("password")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Password is required"),
        ],
        req,
        res,
        next
    );
};
export default ValidateLoginRequest;
