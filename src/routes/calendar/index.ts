import { addOnpopupListener, ejectPopupWatcher, injectPopupWatcher } from "./popupWatcher"
import { injectSlugButton } from "./slug/onpopup"

export default {
	async load() {
		await injectPopupWatcher()

		addOnpopupListener(injectSlugButton)
	},
	async unload() {
		ejectPopupWatcher()
	}
}
