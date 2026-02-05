import sha256 from "sha256";
import Redis from "./redisClient";

// create an instance of redis
const redis = new Redis();

type TSetResultInput = {
	code: string;
	runtime: string;
	stdin: string;
}

async function setResult(input: TSetResultInput, output: any, expiry = 0) {
	// stringify and hash the inputObject
	const inputHash = sha256(JSON.stringify(input));
	await redis.set(inputHash, JSON.stringify(output), expiry);
}

type TGetResultInput = {
	code: string;
	runtime: string;
	stdin: string;
}

async function getResult(input: TGetResultInput) {
	const inputHash = sha256(JSON.stringify(input));

	const result = await redis.get(inputHash);
	const outputObj = JSON.parse(result);
	return outputObj;
}

export default {
	setResult,
	getResult,
};
