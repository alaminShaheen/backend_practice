import { type NextFunction, type Request, type Response } from "express";
import { AppError } from "../types/errors/AppError";
import { verifyAccessToken } from "../lib/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		next(new AppError(401, "Access token is required."));
		return;
	}
	console.log({ authHeader });

	const token = authHeader?.split(" ")[1];

	if (!token) {
		next(new AppError(401, "Access token is required."));
		return;
	}

	console.log({ token });

	req.user = verifyAccessToken(token);
	next();
	return;
}
