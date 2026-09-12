import type {Request, Response} from "express";
import {Router} from "express";

export const healthRouter = Router();


healthRouter.get("/health", (request: Request, response: Response) => {
	response.status(200).json({success: true, message: "Health API is running"});
});