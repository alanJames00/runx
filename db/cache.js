const Redis = require("./redis");
const sha256 = require("sha256");

// create an instance of redis
const redis = new Redis();

async function cacheResult({ inputObj, outputObj }) {
	// stringify and hash the inputObjtr
	const inputHash = sha256(JSON.stringify(inputObj));
	await redis.set(inputHash, JSON.stringify(outputObj));
}

async function fetchCacheResult({ inputObj }) {
	const inputHash = sha256(JSON.stringify(inputObj));
	const result = await redis.get(inputHash);
	const outputObj = JSON.parse(result);
	console.log(outputObj);
	return outputObj;
}

module.exports = {
	cacheResult,
	fetchCacheResult,
};
