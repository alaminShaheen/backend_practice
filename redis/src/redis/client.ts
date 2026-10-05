import {createClient} from 'redis';


const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';


export const redisClient = createClient({url: redisUrl});

redisClient.on("connect", () => {
	console.log("Redis client is connected");
});

redisClient.on("ready", () => {
	console.log("Redis client is ready");
})

redisClient.on("error", (err) => {
	console.log("Redis client error", err);
})

redisClient.on("end", () => {
	console.log("Redis client ended");
})

export async function connectRedis() {
	if (!redisClient.isOpen) {
		await redisClient.connect();
	}

	const pong = await redisClient.ping();
	console.log("redis ping response", pong);
}

export async function disconnectRedis() {
	if (redisClient.isOpen) {
		await redisClient.quit();
	}
}