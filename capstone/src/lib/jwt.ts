import { TokenPayload } from "../types/TokenPayload";
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export function signAccessToken(payload: TokenPayload) {
	const options: SignOptions = {
		expiresIn: env.JWT_ACCESS_EXPIRATION_TIME as SignOptions["expiresIn"],
	};

	return jwt.sign(payload, env.JWT_SECRET, options);
}
