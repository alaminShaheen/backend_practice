import { AppError } from "../types/errors/AppError";
import {
	createTask,
	deleteUserTask,
	getTaskByUserId,
	getTasksByUserId,
	updateUserTaskTitle,
} from "../repositories/user.task.repository";
import { UpdateTaskRequest } from "../types/dtos/UpdateTaskRequest";
import { toTask, toTasks } from "../mappers/task.mapper";

export async function createUserTask(userId: string, title: unknown) {
	if (typeof title !== "string" || !title.trim()) {
		throw new AppError(400, "Please enter a valid title.");
	}

	const trimmedTitle = title.trim();

	if (trimmedTitle.length > 150) {
		throw new AppError(400, "Title must be less than 150 chars or less.");
	}
	const taskEntity = await createTask(userId, title);
	return toTask(taskEntity);
}

export async function getUserTasks(userId: string) {
	const taskEntities = await getTasksByUserId(userId);
	return toTasks(taskEntities);
}

export async function getUserTask(userId: string, taskId: string) {
	const taskEntity = await getTaskByUserId(userId, taskId);

	if (!taskEntity) {
		throw new AppError(404, "Task not found.");
	}

	return toTask(taskEntity);
}

export async function updateUserTask(
	userId: string,
	taskId: string,
	body: UpdateTaskRequest,
) {
	const updatedTaskEntity = await updateUserTaskTitle(userId, taskId, body);

	if (!updatedTaskEntity) {
		throw new AppError(404, "Task not found.");
	}

	return toTask(updatedTaskEntity);
}

export async function deleteTask(userId: string, taskId: string) {
	const deleteSuccessful = await deleteUserTask(userId, taskId);

	if (!deleteSuccessful) {
		throw new AppError(404, "Task not found.");
	}

	return deleteSuccessful;
}
