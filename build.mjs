import { execSync } from "child_process"
import { writeFileSync } from "fs"
import * as esbuild from "esbuild"
import sveltePlugin from "esbuild-svelte"
import { sveltePreprocess } from "svelte-preprocess"
import { plain, proxy } from "./meta.mjs"

const dev = process.env.ENVIRONMENT === "development"

const ctx = await esbuild.context({
	entryPoints: ["src/index.ts"],
	logLevel: "info",
	format: "iife",
	target: "es6",
	bundle: true,
	minify: !dev,
	outdir: "./build",
	outExtension: {
		".js": ".user.js",
	},
	banner: {
		js: plain,
	},
	plugins: [
		sveltePlugin({
			compilerOptions: {
				css: "injected",
				dev,
			},
			preprocess: sveltePreprocess({
				typescript: true,
			}),
		}),
	],
})

writeFileSync("./build/index.proxy.user.js", proxy)

setTimeout(
	() => execSync("xdg-open http://127.0.0.1:9669/index.proxy.user.js"),
	300,
)
await Promise.all([
	ctx.watch(),
	ctx.serve({ host: "127.0.0.1", port: 9669, servedir: "./build" }),
])
