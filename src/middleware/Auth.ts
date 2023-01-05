import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
// import { promisify } from "util";

// local imports
import { createKnexConnection, JWT_SECRET } from "../../config";
import { AppError, catchAsync, Logger } from "../helpers";

const jwt_key: string = JWT_SECRET;
const isAuthenticated = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        // const logInSession: boolean = await req?.session.isLoggedIn;

        // if (!logInSession) {
        //     return res.redirect("/login");
        // }
        // return next();

        let token;
        // check if token is set
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return next(
                new AppError("Unauthorized. Please login to continue.", 401)
            );
        }

        let payload: any;
        // verify token
        try {
            payload = jwt.verify(token, jwt_key);
        } catch (error: any) {
            return next(new AppError(error.message, 401));
        }
        Logger.warn(`${payload} payload`);

        // check if user still exists in the database
        const knex = await createKnexConnection();
        const currentUser = await knex!("users")
            .select()
            .where({ id: payload.id });
        if (!currentUser) {
            return next(new AppError("This User does not exist", 401));
        }

        // grant access
        req.user = currentUser;
        return next();
    }
);
export default isAuthenticated;
