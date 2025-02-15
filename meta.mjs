import pkg from "./package.json" with { type: "json" }

const common = `
// ==UserScript==
// @name          ${pkg.name}
// @author        ${pkg.author}
// @description   ${pkg.description}
// @license       ${pkg.license}
// @version       ${pkg.version}
// @namespace     ${pkg.homepage}
// @match         ${pkg.homepage}/*
// @run-at        document-start
`

export const plain = `
${common}
// ==/UserScript==
`

export const proxy = `
${common}
// @grant         GM.xmlHttpRequest
// @connect       127.0.0.1
// ==/UserScript==

(async function () {
	GM.xmlHttpRequest({
		method: "GET",
		url: "http://127.0.0.1:9669/index.user.js",
		onload: function(response) {
			eval(response.responseText)
		},
	})
})()
`
