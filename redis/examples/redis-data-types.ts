// string
// hash
// list
// set
// sorted_set
// ttl

import dotenv from 'dotenv';
import {createClient} from 'redis';


dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redis = createClient({url: redisUrl});

async function run() {
	// open connection to redis
	await redis.connect();
	console.log("Connected to Redis");
	console.log("ping", await redis.ping());

	// strings
	const stringKey = "demo:page_views";
	await redis.set(stringKey, "100");
	await redis.incr(stringKey);
	const pageViews = await redis.get(stringKey);
	console.log(pageViews);

	// hash
	// stores many small fields under one field
	const hashKey = "demo:user:profile"
	await redis.hSet(hashKey, {name: "Sakib", city: "Toronto"})
	const profile = await redis.hGetAll(hashKey);
	console.log(profile);

	// list
	// ordered collection of values
	// lPush - left push,
	// rPush - right push
	// lRange - get slice
	const listKey = "demo:messages";
	await redis.del(listKey);
	await redis.lPush(listKey, "hello");
	await redis.lPush(listKey, "hi from redis");
	const messages = await redis.lRange(listKey, 0, -1)
	console.log(messages);

	// set
	// stores only unique set of values
	const setKey = "demo:tags";
	await redis.sAdd(setKey, "sql")
	await redis.sAdd(setKey, "sql")
	await redis.sAdd(setKey, "html")
	const tagCount = await redis.sCard(setKey);
	const tags = await redis.sMembers(setKey);
	console.log(tagCount, tags);

	// sorted set

	const rankKey = "demo:leaderboard";

	await redis.zAdd(rankKey, {score: 100, value: "player_a"})
	await redis.zAdd(rankKey, {score: 200, value: "player_b"})
	const newScore = await redis.zIncrBy(rankKey, 50, "player_a")
	console.log(newScore);

	// give rank of player_b, 0 -> top rank
	const playerBRank = await redis.zRevRank(rankKey, "player_b");
	const playerARank = await redis.zRevRank(rankKey, "player_a");
	console.log({playerARank, playerBRank});

	// ttl -> Time to live

	const otpKey = "demo:otp"
	await redis.set(otpKey, "1234");
	await redis.expire(otpKey, 60);
	const ttl = await redis.ttl(otpKey);
	console.log(ttl);

	await redis.quit();
}

run().catch((error) => {
	console.error("Failed to connect to Redis", error);
	process.exit(1);
});