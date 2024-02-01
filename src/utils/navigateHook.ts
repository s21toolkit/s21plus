function pathnameHash() {
	return unsafeWindow.location.pathname.replace("/", "")
}

export function injectNavigationHook(callback) {
	let hash = pathnameHash()

	const H = unsafeWindow.history
	const oldPushState = H.pushState
	H.pushState = function (...args) {
		if (typeof H.onpushstate == "function") {
			H.onpushstate(args[0])
		}
		return oldPushState.apply(H, args)
	}

	H.onpushstate = () => {
		if (pathnameHash() === hash) return

		hash = pathnameHash()
		callback(unsafeWindow.location.href)
	}

	unsafeWindow.addEventListener("popstate", H.onpushstate)

	// Call first time manually since page load doesent count as navigation
	callback(unsafeWindow.location.href)
}
