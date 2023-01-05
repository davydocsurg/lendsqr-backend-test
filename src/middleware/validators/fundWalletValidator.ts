import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";

// local imports
import validate from "./validate";

export const fundAuthWalletValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return validate(
        [
            check("amount")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Amount is required"),
        ],
        req,
        res,
        next
    );
};
