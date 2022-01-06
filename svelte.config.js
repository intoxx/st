import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";
import { resolve } from "path";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",

		adapter: adapter(),

		files: {
			assets: "static"
		},

		vite: {
			resolve: {
				alias: {
					$routes: resolve("./src/routes"),
					$api: resolve("./src/api"),
				}
			}
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
