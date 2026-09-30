import {
	type NextFunction,
	type Request,
	type Response,
	Router,
} from "express";
import { UserAuthRequest } from "../types/dtos/UserAuthRequest";
import { loginUser, registerUser } from "../services/auth.service";
import { authenticate } from "../middlewares/auth.middleware";

export const authRouter = Router();

authRouter.post(
	"/register",
	async (
		req: Request<{}, {}, UserAuthRequest>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			await registerUser(req.body);

			res.status(201).json({
				success: true,
				message: "Registration completed. Please login to continue",
			});
		} catch (error) {
			next(error);
		}
	},
);

authRouter.post(
	"/login",
	async (
		req: Request<{}, {}, UserAuthRequest>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const data = await loginUser(req.body);

			res.status(200).json({
				success: true,
				data,
			});
		} catch (error) {
			next(error);
		}
	},
);

authRouter.get("/me", authenticate, (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		data: {
			user: req.user,
		},
	});
});