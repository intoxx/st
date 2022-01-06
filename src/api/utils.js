/*
 * Custom API error, defaults to status : 500 and message : "Something went wrong"
 */
export class ApiError extends Error {
	constructor(status = 500, message = 'Something went wrong', ...params) {
		if (!Number.isInteger(status))
			throw new TypeError('status must be an integer');

		if (status < 100 || status > 511)
			throw new RangeError('status must be a valid HTTP return code');

		super(message, ...params);

		this.name = this.constructor.name;
		this.status = this.code = status;
	}

	toString() {
		return `status: ${this.status}, message: ${this.message}`;
	}
}
