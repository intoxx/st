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

		routes: (filepath) => {
			// Ignore route lib folder
			if (filepath.endsWith("/lib") || filepath.includes("/lib/"))
				return false;

			// Default regex
			return !/(?:(?:^_|\/_)|(?:^\.|\/\.)(?!well-known))/.test(filepath);
		},

		vite: {
			resolve: {
				alias: {
					$api: resolve("./src/api"),
					$route: resolve("./src/routes"),
					$store: resolve("./src/stores"),
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
