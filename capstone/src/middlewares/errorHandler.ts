import type { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import { AppError } from "../types/errors/AppError";

export function errorHandler(
	error: Error,
	_req: Request,
	_res: Response,
	next: NextFunction,
) {
	if (error instanceof AppError) {
		_res.status(error.statusCode).json({
			success: false,
			message: error.message,
		});
		logger.error({ err: error }, "Unhandled error");
		return;
	}
	logger.error({ err: error }, "Unhandled error");

	_res.status(500).json({ success: false, message: "Internal Server Error" });
}
