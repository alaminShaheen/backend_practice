import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";

const app = createApp();

const server = app.listen(env.PORT, () => {
	const addr = server.address();
	if (addr && typeof addr === "object") {
		const host =
			addr.address === "::" || addr.address === "0.0.0.0"
				? "localhost"
				: addr.address;
		const protocol = host === "localhost" ? "http" : "https";
		logger.info(
			`Server is now running on ${protocol}://${host}:${addr.port}`,
		);
	}
});
