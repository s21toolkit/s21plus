import { waitNotNull } from "@/utils/waitNotNull"

type PopupCallback = (popup: HTMLElement) => void
export const onpopup = new Set<PopupCallback>()

const observer = new MutationObserver((mutationList) => {
	if (mutationList[0]!.addedNodes.length === 0) return

	let nestedView: HTMLElement = mutationList[0]!.addedNodes[0]! as HTMLElement
	while (nestedView.childNodes.length === 1) {
		nestedView = nestedView.childNodes[0]! as HTMLElement
	}

	for (const listener of onpopup) {
		listener(nestedView)
	}
})

export async function injectPopupWatcher() {
	console.log("Popup watcher injected")
	const view = await waitNotNull<Node>(() =>
		document
			.evaluate(
				"/html/body/div/div[5]/div",
				document,
				null,
				XPathResult.ANY_TYPE,
				null,
			)
			.iterateNext(),
	)

	observer.observe(view, {
		childList: true,
	})
	console.log("Observing for popups on", view)
}

export function addOnpopupListener(listener: PopupCallback) {
	onpopup.add(listener)
}
