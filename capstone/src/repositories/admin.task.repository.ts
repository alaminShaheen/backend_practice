import { AdminTaskListQuery } from "../types/queries/AdminTaskListQuery";
import { TaskEntity } from "../types/databaseEntities/TaskEntity";
import { pool } from "../db/database";
import { TaskStatus } from "../types/enums/TaskStatus";

export async function findAllTasks(
	filters: AdminTaskListQuery,
): Promise<TaskEntity[]> {
	const conditions = [] as string[];
	const values = [] as unknown[];

	let paramIndex = 1;

	if (filters.search) {
		conditions.push(`title ILIKE $${paramIndex}`);
		values.push(`%${filters.search}%`);
		paramIndex++;
	}

	if (filters.status) {
		conditions.push(`status = $${paramIndex}`);
		values.push(filters.status);
	}

	const whereClause =
		conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

	const result = await pool.query<TaskEntity>(
		`
		SELECT *
		FROM support_tasks ${whereClause}
		ORDER BY created_at DESC
	`,
		values,
	);

	return result.rows;
}

export async function updateTaskStatus(
	taskId: string,
	status: TaskStatus,
): Promise<TaskEntity> {
	const res = await pool.query<TaskEntity>(
		`
	UPDATE support_tasks SET status = $1 WHERE id = $2 RETURNING *`,
		[status, taskId],
	);

	return res.rows[0] ?? null;
}
