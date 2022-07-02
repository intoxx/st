#!/usr/bin/env sh
set -e
cd "$(dirname "$0")"

podman run \
	--rm \
	--pod new:st \
	--name app \
	-p 3000:3000 \
	-v ../app/src:/usr/app/src:Z \
	-v ../app/static:/usr/app/static:Z \
	-v ../app/tests:/usr/app/tests:Z \
	-v ../app/playwright.config.ts:/usr/app/playwright.config.ts:Z \
	-v ../app/svelte.config.js:/usr/app/svelte.config.js:Z \
	-v ../app/postcss.config.cjs:/usr/app/postcss.config.cjs:Z \
	-v ../app/tsconfig.json:/usr/app/tsconfig.json:Z \
	-v ../app/tailwind.config.cjs:/usr/app/tailwind.config.cjs:Z \
	st:latest
