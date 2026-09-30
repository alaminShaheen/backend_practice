import { Task } from "../Task";

export type UpdateTaskRequest = Partial<Pick<Task, "title">>;
