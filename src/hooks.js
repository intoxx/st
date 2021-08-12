import { minify } from "html-minifier-terser";
import { dev } from "$app/env";

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

export async function handle({ request, resolve }) {
	const response = await resolve(request);

	// Minify HTML output in production
	if (!dev && response.headers["content-type"] === "text/html")
		response.body = minify(response.body, minification_options);

	return response;
}
