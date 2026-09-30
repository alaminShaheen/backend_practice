import { UserRole } from "./enums/UserRole";

export type User = {
	id: string;
	email: string;
	role: UserRole;
	createdAt: Date;
}