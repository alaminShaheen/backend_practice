import dotenv from "dotenv";
import {createClient} from "redis";


dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redis = createClient({url: redisUrl});

const cacheKey = "demo:products";
const cacheTtlInSeconds = 60 // cache will expire in 60 seconds

let dbProducts = ["keyboard", "mouse", "laptop"];

async function run() {
	await redis.connect();

	// first request - cache miss
	let cached = await redis.get(cacheKey);

	if (cached) {
		console.log("Cache hit", cached);
		console.log("data: ", JSON.parse(cached));
	} else {
		console.log("Cache miss")
		const products = dbProducts
		// set in redis with expiration timer
		await redis.setEx(cacheKey, cacheTtlInSeconds, JSON.stringify(products));
	}

	// stale cache problem
	dbProducts = dbProducts.concat("monitor");
	const staleCache = await redis.get(cacheKey);
	console.log({cached: JSON.parse(staleCache || ""), dbProducts})

	// cache invalidation
	// invalidate cache when db entity is updated or deleted
	await redis.del(cacheKey);
	console.log("Cache deleted successfully");
	const emptyCache = await redis.get(cacheKey);
	if (!emptyCache) {
		await redis.setEx(cacheKey, cacheTtlInSeconds, JSON.stringify(dbProducts));
		const freshCache = await redis.get(cacheKey);
		console.log({freshCache: JSON.parse(freshCache || ""), dbProducts});
	}

	await redis.quit()
}

run().catch(console.error);