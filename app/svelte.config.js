import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";
import { resolve } from "path";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter(),

		files: {
			assets: "static"
		},

		vite: {
			resolve: {
				alias: {
					$route: resolve("./src/route"),
					$api: resolve("./src/api"),
					$store: resolve("./src/store"),
					$css: resolve("./src/app.css")
				}
			},

			server: {
				hmr: {
					host: "localhost",
					// Internal port (inside the container)
					port: 3000,
					// External port (outside the container)
					clientPort: 3001,
					// ws : http, wss : https
					protocol: "ws"
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
