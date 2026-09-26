import {Router} from "express";
import {healthRouter} from "./heath.routes";
import { authRouter } from "./auth.routes";

export const apiRouter = Router();


apiRouter.use(healthRouter);
apiRouter.use("/auth", authRouter);