import { User } from "../User";

export type UserEntity = Pick<User, "email" | "id" | "role"> & {
	created_at: Date;
};

export type UserEntityWithPassword = UserEntity & {
	password_hash: string | null;
}