import { type NextFunction, type Request, type Response } from "express";
import { UserRole } from "../types/enums/UserRole";
import { AppError } from "../types/errors/AppError";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
	if (req.user?.role !== UserRole.ADMIN) {
		next(new AppError(403, "Admin privileges not found."));
		return;
	}

	next();
	return;
}
