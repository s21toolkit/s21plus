import { mount } from "svelte"
import Button from "@/components/Button.svelte"

export function copySlugFromPopupToCpipboard(popup: Element) {
	return function () {
		const project = popup.querySelector(
			'a[href^="/project/"][href$="/about"]',
		)?.textContent
		if (!project) console.error("Cant get project info on", popup)

		const names = Array.from(
			popup.querySelectorAll('a[href^="/profile"]'),
		).map((e) => (e as HTMLLinkElement).href.split("/").pop()!.split("@")[0])

		const time = popup.querySelector("p")?.textContent?.split(", ")?.[1]
		if (!time) console.error("Cant get evaluation timeframe on", popup)

		navigator.clipboard.writeText(`${project} ${time} (${names.join(",")})`)
	}
}

// TODO: Restack button to bottom due to stupid react virtual DOM which reuses component obviously ignoring our button

export function injectSlugButton(popup: Element) {
	mount(Button, {
		target: popup,
		props: {
			text: "Copy slug!",
			clickedText: "Copied!",
			onclick: copySlugFromPopupToCpipboard(popup),
		},
	})
}
