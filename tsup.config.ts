// eslint-disable-next-line import/no-unresolved
import { userscript } from "esbuild-plugin-userscript"
import sveltePlugin from "esbuild-svelte"
import preprocess from "svelte-preprocess"
import { defineConfig } from "tsup"
import pkg from "@root/package.json" assert { type: "json" }

const dev = process.env.ENVIRONMENT === "development"

const metadata = {
	name: pkg.name,
	author: pkg.author,
	description: pkg.description,
	license: pkg.license,
	version: pkg.version,
	namespace: "https://edu.21-school.ru",
	match: "https://edu.21-school.ru/*",
	"run-at": "document-body",
	connect: [],
	grant: ["GM.addStyle"],
}

// eslint-disable-next-line import/no-default-export
export default defineConfig({
	entry: ["src/index.ts"],
	format: "iife",
	target: "es6",
	bundle: true,
	outDir: "build",
	minify: !dev,
	clean: !dev,
	outExtension: () => {
		return { js: ".user.js", dts: ".user.dts" }
	},
	injectStyle(css) {
		return `
		GM.addStyle(\`\n${css.slice(1, -1)}\`)
		`
	},
	esbuildPlugins: [
		sveltePlugin({
			preprocess: preprocess({
				typescript: true,
			}),
		}),
		userscript({
			metadata,
			proxy: dev
				? {
						port: 8080,
						metadata,
						targets: () => true,
					}
				: undefined,
		}),
	],
})
