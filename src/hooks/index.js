import { dev } from "$app/env";
import { minify } from "html-minifier-terser";
import { handle_error } from "./utils.js";

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
export async function handle({ request, resolve }) {
	try {
		const response = await resolve(request);

		// Minify HTML output in production
		if (!dev && response.headers["content-type"] === "text/html")
			response.body = await minify(response.body, minification_options);

		return response;
	} catch (e) {
		console.error(e);
		return await handle_error(e);
	}
}

/*
 * Expose safe data to the client.
 */
export function getSession(request) {
	return {};
}
