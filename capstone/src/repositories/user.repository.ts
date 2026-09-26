import {
	UserEntity,
	UserEntityWithPassword,
} from "../types/databaseEntities/userEntity";
import { pool } from "../db/database";

export async function findUserByEmail(
	email: string,
): Promise<UserEntity | null> {
	const result = await pool.query<UserEntity>(
		"SELECT id, email, role, created_at FROM users WHERE email = $1",
		[email],
	);
	return result.rows[0] ?? null;
}

export async function createUser(
	passwordHash: string,
	email: string,
): Promise<UserEntity> {
	const result = await pool.query<UserEntity>(
		`
			INSERT INTO users (email, password_hash)
			VALUES ($1, $2)
			RETURNING id, email, role, created_at
		`,
		[email, passwordHash],
	);
	return result.rows[0];
}

export async function findUserByEmailWithPassword(email: string): Promise<UserEntityWithPassword | null> {
	const result = await pool.query<UserEntityWithPassword>(
		`
	SELECT id, email, role, password_hash, created_at FROM users WHERE email = $1
	`,
		[email],
	);
	return result.rows[0] ?? null;
}
