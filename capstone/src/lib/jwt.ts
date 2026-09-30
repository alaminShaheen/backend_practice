import { TokenPayload } from "../types/TokenPayload";
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../types/errors/AppError";

export function signAccessToken(payload: TokenPayload) {
	const options: SignOptions = {
		expiresIn: env.JWT_ACCESS_EXPIRATION_TIME as SignOptions["expiresIn"],
	};

	return jwt.sign(payload, env.JWT_SECRET, options);
}


export function verifyAccessToken(token: string) {
	try {
		return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
	} catch (error) {
		console.log(error, token);
		throw new AppError(401, "Invalid or expired access token");
	}

}