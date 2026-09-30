import { AppError } from "../types/errors/AppError";
import {
	createTask,
	deleteUserTask,
	getTaskByUserId,
	getTasksByUserId,
	updateUserTaskTitle,
} from "../repositories/user.task.repository";
import { UpdateTaskRequest } from "../types/dtos/UpdateTaskRequest";

export async function createUserTask(userId: string, title: unknown) {
	if (typeof title !== "string" || !title.trim()) {
		throw new AppError(400, "Please enter a valid title.");
	}

	const trimmedTitle = title.trim();

	if (trimmedTitle.length > 150) {
		throw new AppError(400, "Title must be less than 150 chars or less.");
	}

	return createTask(userId, title);
}

export async function getUserTasks(userId: string) {
	return getTasksByUserId(userId);
}

export async function getUserTask(userId: string, taskId: string) {
	const task = await getTaskByUserId(userId, taskId);

	if (!task) {
		throw new AppError(404, "Task not found.");
	}

	return task;
}

export async function updateUserTask(
	userId: string,
	taskId: string,
	body: UpdateTaskRequest,
) {
	const updatedTask = updateUserTaskTitle(userId, taskId, body);

	if (!updatedTask) {
		throw new AppError(404, "Task not found.");
	}

	return updatedTask;
}

export async function deleteTask(userId: string, taskId: string) {
	const deleteSuccessful = await deleteUserTask(userId, taskId);

	if (!deleteSuccessful) {
		throw new AppError(404, "Task not found.");
	}

	return deleteSuccessful;
}
