import {
	type NextFunction,
	type Request,
	type Response,
	Router,
} from "express";
import { requireAdmin } from "../middlewares/admin.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { AdminTaskListQuery } from "../types/queries/AdminTaskListQuery";
import {
	getAdminTasks,
	updateAdminTaskStatus,
} from "../services/admin.task.service";
import { GetTaskByIdRequest } from "../types/dtos/GetTaskByIdRequest";

export const adminTaskRouter = Router();

adminTaskRouter.use(authenticate, requireAdmin);

adminTaskRouter.get(
	"/",
	async (
		req: Request<{}, {}, {}, AdminTaskListQuery>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const tasks = await getAdminTasks(req.query);
			res.status(200).json({ success: true, data: tasks });
		} catch (e) {
			next(e);
		}
	},
);

adminTaskRouter.patch(
	"/:taskId/status",
	async (
		req: Request<GetTaskByIdRequest, {}, AdminTaskListQuery>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const task = await updateAdminTaskStatus(
				req.params.taskId,
				req.body.status,
			);

			res.status(200).json({ success: true, data: { task } });
		} catch (e) {
			next(e);
		}
	},
);
