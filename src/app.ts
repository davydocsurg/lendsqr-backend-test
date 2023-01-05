import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";

// local imports
import { ErrorHandler } from "./middleware";
import { authRoutes, walletRoutes } from "./routes";
import { Logger } from "./helpers";

const app: Express = express();
const allowlist = ["http://localhost:3000", process.env.FRONT_END_URL];

const corsOptionsDelegate = function (
    req: Request,
    callback: (err: any, corsOptions: any) => void
) {
    let corsOptions: any;
    if (allowlist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// test index route
app.get("/api/", (req: Request, res: Response) => {
    Logger.info(req.body);
    return res.status(200).json({
        message: "You have reached Demo Credit API index page",
        success: true,
    });
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", authRoutes);
app.use("/api", walletRoutes);
app.use(ErrorHandler);

export default app;
