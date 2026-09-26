import "dotenv/config";
import { z } from "zod";
import process from "node:process";

const EnvSchema = z.object({
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	PORT: z.coerce.number().int().positive().default(4000),
	LOG_LEVEL: z.string().default("info"),
	DATABASE_URL: z.url({
		error: "DATABASE_URL must be a valid connection URL",
	}),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
	console.error("Invalid environment:\n" + z.prettifyError(parsed.error));
	process.exit(1);
}

export const env = parsed.data;
