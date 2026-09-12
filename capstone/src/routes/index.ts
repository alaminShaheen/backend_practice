import {Router} from "express";
import {healthRouter} from "./heath.routes";

export const apiRouter = Router();


apiRouter.use(healthRouter);