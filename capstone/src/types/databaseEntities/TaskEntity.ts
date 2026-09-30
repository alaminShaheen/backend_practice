import { User } from "../User";
import { Task } from "../Task";

export type TaskEntity = Pick<Task, "id" | "status" | "title"> & {
	created_at: Date;
	updated_at: Date;
	user_id: string;
};