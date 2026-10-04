import { TaskEntity } from "../types/databaseEntities/TaskEntity";
import { Task } from "../types/Task";

export function toTask(entity: TaskEntity): Task {
	return {
		id: entity.id,
		title: entity.title,
		status: entity.status,
		userId: entity.user_id,
		createdAt: entity.created_at,
		updatedAt: entity.updated_at,
	};
}

export function toTasks(entities: TaskEntity[]): Task[] {
	return entities.map(toTask);
}
