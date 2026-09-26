import { UserAuthRequest } from "../types/dtos/UserAuthRequest";
import { AppError } from "../types/errors/AppError";
import { MIN_PASSWORD_LENGTH } from "../constants/app.constants";
import {
	createUser,
	findUserByEmail,
	findUserByEmailWithPassword,
} from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { UserAuthResponse } from "../types/dtos/UserAuthResponse";
import { signAccessToken } from "../lib/jwt";

export async function registerUser(data: UserAuthRequest): Promise<void> {
	if (!data.email || !data.password) {
		throw new AppError(400, "Email and password is required");
	}

	if (data.password.length < MIN_PASSWORD_LENGTH) {
		throw new AppError(
			400,
			`Passwords must be a minimum of ${MIN_PASSWORD_LENGTH} characters`,
		);
	}

	const normalizedEmail = data.email.toLowerCase().trim();
	const existingUser = await findUserByEmail(normalizedEmail);

	if (existingUser) {
		throw new AppError(400, "User with email already exists.");
	}

	const passwordHash = await bcrypt.hash(data.password, 10);

	await createUser(passwordHash, normalizedEmail);
}

export async function loginUser(
	data: UserAuthRequest,
): Promise<UserAuthResponse> {
	if (!data.email || !data.password) {
		throw new AppError(400, "Email and password is required");
	}

	const normalizedEmail = data.email.toLowerCase().trim();
	const existingUser = await findUserByEmailWithPassword(normalizedEmail);

	if (!existingUser?.password_hash) {
		throw new AppError(400, "Invalid email or password.");
	}

	const isPasswordValid = bcrypt.compare(
		data.password,
		existingUser.password_hash,
	);

	if (!isPasswordValid) {
		throw new AppError(400, "Invalid email or password.");
	}

	const accessToken = signAccessToken({
		userId: existingUser.id,
		email: existingUser.email,
		role: existingUser.role,
	});

	return { accessToken };
}
