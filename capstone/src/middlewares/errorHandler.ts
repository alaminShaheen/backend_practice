import type {NextFunction, Request, Response} from "express";
import {logger} from "../lib/logger";

export function errorHandler(error: Error, _req: Request, _res: Response, next: NextFunction) {
	logger.error({err: error}, "Unhandled error");

	_res.status(500).json({success: false, message: "Internal Server Error"});
}