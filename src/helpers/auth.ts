import jwt from "jsonwebtoken";
import { Response } from "express";

// local imports
import { cookieOptions, JWT_SECRET } from "../../config";

const signToken = (id: string) => {
    const jwt_key: string = JWT_SECRET;
    const token = jwt.sign({ id }, jwt_key, { expiresIn: "1d" });
    return token;
};

export const createUserToken = (
    user: any,
    statusCode: number = 200,
    res: Response
) => {
    const token = signToken(user.id);
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);
    return token;

    // res.status(statusCode).json({
    //     success: true,
    //     token,
    //     user,
    // });
};
