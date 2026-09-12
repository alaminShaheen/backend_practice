import type {NextFunction, Request, Response} from "express";

export function notFound(_req: Request, _res: Response, _next: NextFunction) {
	_res.status(404).json({success: false, message: "Route not found"});
}