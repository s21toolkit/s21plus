import { addOnpopupListener, injectPopupWatcher } from "./popupWatcher"
import { injectSlugButton } from "./slug/onpopup"

export async function calendarRoute() {
	await injectPopupWatcher()

	addOnpopupListener(injectSlugButton)
}
