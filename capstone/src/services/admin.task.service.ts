import { AdminTaskListQuery } from "../types/queries/AdminTaskListQuery";
import { TaskStatus } from "../types/enums/TaskStatus";
import { AppError } from "../types/errors/AppError";
import {
	findAllTasks,
	updateTaskStatus,
} from "../repositories/admin.task.repository";
import { Task } from "../types/Task";
import { toTask, toTasks } from "../mappers/task.mapper";

export async function getAdminTasks(
	query: AdminTaskListQuery,
): Promise<Task[]> {
	const searchQuery = query.search?.trim() || undefined;
	const statusQuery = query.status?.trim() || undefined;

	if (
		statusQuery &&
		!Object.values(TaskStatus).includes(statusQuery as TaskStatus)
	) {
		throw new AppError(
			400,
			"Task status must be one of the following: 'OPEN', 'IN PROGRESS', 'RESOLVED'",
		);
	}
	const taskEntities = await findAllTasks({
		status: statusQuery,
		search: searchQuery,
	});
	return toTasks(taskEntities);
}

export async function updateAdminTaskStatus(
	taskId: string,
	status: unknown,
): Promise<Task> {
	if (
		typeof status !== "string" ||
		!Object.values(TaskStatus).includes(status as TaskStatus)
	) {
		throw new AppError(
			400,
			"Task status must be one of the following: 'OPEN', 'IN PROGRESS', 'RESOLVED'",
		);
	}

	const task = await updateTaskStatus(taskId, status as TaskStatus);

	if (!task) {
		throw new AppError(404, "Task not found!");
	}

	return toTask(task);
}
