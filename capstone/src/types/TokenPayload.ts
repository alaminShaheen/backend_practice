import { UserRole } from "./enums/UserRole";

export type TokenPayload = {
	userId: string;
	email: string;
	role: UserRole;
};
