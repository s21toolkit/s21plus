const observer = new MutationObserver((records) => {
	for (const r of records) {
		const img = r.target as HTMLImageElement;

		if (img.src.includes('/thinker-')) {
			observer.disconnect()
			img.src = "https://static.wikia.nocookie.net/surrealmemes/images/a/a0/Moyai.png"
		}
	}
})

function observe() {
	observer.observe(document.body, {
		subtree: true,
		attributes: true,
		attributeFilter: ["src"],
	})
}

let oldwidth = window.visualViewport?.width
export function задумчивый_господин() {
	observe()

	// On width change reobserve
	window.addEventListener("resize", () => {
		const newwidth = window.visualViewport?.width
		if(oldwidth !== newwidth) {
			oldwidth = newwidth
			observe()
		}
	})
}

export function перестать_думать() {
	observer.disconnect()
}
