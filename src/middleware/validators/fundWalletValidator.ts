import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";

// local imports
import validate from "./validate";

export const verifyAmount = (
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

export const verifyFundTransferDetails = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    verifyAmount(req, res, next);
    return validate(
        [
            check("receiver_email")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Receiver email is required"),

            check("description")
                .exists({
                    checkNull: true,
                    checkFalsy: true,
                })
                .withMessage("Description is required"),
        ],
        req,
        res,
        next
    );
};
