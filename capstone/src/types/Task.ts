import { TaskStatus } from "./enums/TaskStatus";

export type Task = {
	id: string;
	title: string;
	status: TaskStatus;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};
