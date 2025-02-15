function pathname() {
	return unsafeWindow.location.pathname.replace(/\/+$/, "")
}

export function injectNavigationHook(callback: (state: { oldpath: string, newpath: string }) => void) {
	let hash = pathname()

	const H = unsafeWindow.history
	const oldPushState = H.pushState
	H.pushState = function (...args) {
		if (typeof H.onpushstate == "function") {
			H.onpushstate(args[0])
		}
		return oldPushState.apply(H, args)
	}

	H.onpushstate = () => {
		const nhash = pathname()
		if (nhash === hash) return

		hash = nhash
		callback({ oldpath: hash, newpath: nhash })
	}

	unsafeWindow.addEventListener("popstate", H.onpushstate)

	// Call first time manually since page load doesent count as navigation
	callback({ oldpath: hash, newpath: pathname() })
}
