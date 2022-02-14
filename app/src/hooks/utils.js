import { ApiError } from "$api/utils";

/*
 * Return proper status, headers and body depending of the error.
 */
export function handle_error(e) {
	let status = 500;
	const headers = { "Content-Type": "application/json" };
	const { message = "Something went wrong" } = e;

	if (e instanceof ApiError)
		status = e.status;

	return {
		status,
		headers,
		body: JSON.stringify({
			status,
			message,
		})
	};
}

