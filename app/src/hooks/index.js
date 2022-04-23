import { dev } from '$app/env';
import { minify } from 'html-minifier-terser';
import { ApiError } from '$api/utils.js';

const minification_options = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	html5: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: true,
	minifyURLs: true,
	removeAttributeQuotes: true,
	removeComments: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true
};

/*
 * Runs on every request.
 * To pass data to endpoints, populate request.locals object.
 */
export async function handle({ event, resolve }) {
	//try {
	//	const response = await resolve(event);

	//	// Minify HTML output in production
	//	if (!dev && response.headers.get("content-type")?.startsWith("text/html")) {
	//		return new Response(
	//			await minify(await response.text(), minification_options),
	//			response
	//		);
	//	}

	//	return response;
	//} catch (e) {
	//	console.error(e);
	//	return await handle_error(e);
	//}

	const response = await resolve(event);

	// Minify HTML output in production
	if (!dev && response.headers.get('content-type')?.startsWith('text/html')) {
		return new Response(await minify(await response.text(), minification_options), response);
	}

	return response;
}

/*
 * Return proper status, headers and body depending of the error.
 */
export async function handleError({ error, event }) {
	console.error(error);

	let status = 500;
	const { message = 'Something went wrong' } = error;
	const headers = { 'Content-Type': 'application/json' };

	if (error instanceof ApiError) status = error.status;

	return {
		status,
		headers,
		body: JSON.stringify({
			status,
			message
		})
	};
}

/*
 * Expose safe data to the client.
 */
export function getSession(event) {
	return {};
}
