import {
	type NextFunction,
	type Request,
	type Response,
	Router,
} from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
	createUserTask,
	deleteTask,
	getUserTask,
	getUserTasks,
	updateUserTask,
} from "../services/user.task.service";
import { CreateTaskRequest } from "../types/dtos/CreateTaskRequest";
import { GetTaskByIdRequest } from "../types/dtos/GetTaskByIdRequest";
import { UpdateTaskRequest } from "../types/dtos/UpdateTaskRequest";

export const userTaskRouter = Router();

userTaskRouter.use(authenticate);

userTaskRouter.post(
	"/",
	async (
		req: Request<{}, {}, CreateTaskRequest>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const task = await createUserTask(req.user!.userId, req.body.title);
			res.status(200).json({ success: true, data: task });
		} catch (e) {
			next(e);
		}
	},
);

userTaskRouter.get(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const tasks = await getUserTasks(req.user!.userId);
			res.status(200).json({ success: true, data: { tasks } });
		} catch (e) {
			next(e);
		}
	},
);

userTaskRouter.get(
	"/:taskId",
	async (
		req: Request<GetTaskByIdRequest>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const task = await getUserTask(req.user!.userId, req.params.taskId);
			res.status(200).json({ success: true, data: task });
		} catch (e) {
			next(e);
		}
	},
);

userTaskRouter.patch(
	"/:taskId",
	async (
		req: Request<GetTaskByIdRequest, {}, UpdateTaskRequest>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const updatedTask = await updateUserTask(
				req.user!.userId,
				req.params.taskId,
				req.body,
			);
			res.status(200).json({ success: true, data: updatedTask });
		} catch (e) {
			next(e);
		}
	},
);

userTaskRouter.delete(
	"/:taskId",
	async (
		req: Request<GetTaskByIdRequest>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const updatedTask = await deleteTask(
				req.user!.userId,
				req.params.taskId,
			);
			res.status(200).json({
				success: true,
				message: "Task deleted successfully.",
			});
		} catch (e) {
			next(e);
		}
	},
);
