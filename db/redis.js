// exports a redis compliant kv store instance

class Redis {
	constructor() {
		this.store = {};
	}

	// set key value pair
	set(key, value, expiry) {
		if (expiry == undefined || expiry == 0) {
			this.store[key] = {
				value: value,
				expiresAt: 0,
			};
		}
		this.store[key] = {
			value: value,
			expiresAt: Date.now() + expiry * 1000,
		};
	}

	// get key value pair
	get(key) {
		// check if expired
		const currentTime = Date.now();
		const valueObj = this.store[key];
		if (valueObj == undefined) return null;

		if (valueObj.expiresAt == 0) {
			return valueObj.value;
		}

		if (currentTime > valueObj.expiresAt) {
			return null;
		}

		return valueObj.value;
	}

	// delete key value pair
	delete(key) {
		this.store[key] = undefined;
	}
}

module.exports = Redis;
