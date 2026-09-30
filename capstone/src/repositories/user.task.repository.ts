import { TaskEntity } from "../types/databaseEntities/TaskEntity";
import { pool } from "../db/database";
import { UpdateTaskRequest } from "../types/dtos/UpdateTaskRequest";

export async function createTask(
	userId: string,
	title: string,
): Promise<TaskEntity> {
	const result = await pool.query<TaskEntity>(
		`
		INSERT INTO support_tasks (title, user_id)
		VALUES ($1, $2)
		RETURNING user_id, title, created_at, status, id
	`,
		[title, userId],
	);
	return result.rows[0];
}

export async function getTasksByUserId(userId: string): Promise<TaskEntity[]> {
	const result = await pool.query<TaskEntity>(
		`
			SELECT *
			FROM support_tasks
			WHERE user_id = $1
			ORDER BY created_at`,
		[userId],
	);

	return result.rows;
}

export async function getTaskByUserId(
	userId: string,
	taskId: string,
): Promise<TaskEntity | null> {
	const result = await pool.query<TaskEntity>(
		`
			SELECT *
			FROM support_tasks
			WHERE id = $1
			  AND user_id = $2
		`,
		[taskId, userId],
	);

	return result.rows[0] ?? null;
}

export async function updateUserTaskTitle(
	userId: string,
	taskId: string,
	data: UpdateTaskRequest,
): Promise<TaskEntity | null> {
	const result = await pool.query<TaskEntity>(
		`
		UPDATE support_tasks
		SET title      = $1,
			updated_at = NOW()
		WHERE id = $2
		  AND user_id = $3
		RETURNING *
	`,
		[data.title, taskId, userId],
	);
	return result.rows[0] ?? null;
}

export async function deleteUserTask(
	userId: string,
	taskId: string,
): Promise<boolean> {
	const result = await pool.query(
		`
	DELETE FROM support_tasks WHERE id = $1 AND user_id = $2`,
		[taskId, userId],
	);

	return (result.rowCount ?? 0) > 0;
}
