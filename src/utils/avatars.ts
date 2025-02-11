import { getCurrentUser } from "./user"

async function digestText(message: string) {
	const msgUint8 = new TextEncoder().encode(message)
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("")
	return hashHex
}

const loginHashes = new Map()
export async function getGravatarUrl(username: string) {
	if (loginHashes.has(username)) {
		return `https://gravatar.com/avatar/${loginHashes.get(username)}?s=512&d=something`
	}

	const email = `${username}@student.21-school.ru`
	const hash = await digestText(email)

	loginHashes.set(username, hash)

	return await getGravatarUrl(username)
}

function wrapError(i: HTMLImageElement, gravatarUrl: string) {
	i.onerror = async () => {
		i.dataset.nomatch = "true"
		i.src = i.dataset.oldsrc!
		const data = await fetch("https://nekos.best/api/v2/neko").then(e => e.json())
		i.src = data.results[0].url
		delete i.dataset.oldsrc
	}
	i.dataset.oldsrc = i.src
	i.src = gravatarUrl
}

export async function fetchAvatars() {
	const images = Array.from(document.querySelectorAll('img.MuiAvatar-img')) as HTMLImageElement[]

	const u = await getCurrentUser()
	for (const i of images) {
		if (i.dataset.nomatch) continue
		if (i.closest("[data-testid='UserMenuWidget.MoreInfoButton']")) {
			wrapError(i, await getGravatarUrl(u.login))
			continue
		}

		if (i.closest("[data-testid='components.teamMembersList.teamUser']")) {
			const login = i.parentNode?.parentNode?.querySelector("[data-testid='components.teamMembersList.userLogin']")?.textContent
			if (login) wrapError(i, await getGravatarUrl(login))
			continue
		}

		const hopefullyRoot = i.parentNode?.parentNode?.parentNode
		const name =
			hopefullyRoot?.querySelector("[data-testid='dashboard.personalInfo.name']")?.textContent ??
			hopefullyRoot?.querySelector("[data-testid='personalInfo.studentLogin']")?.textContent
		if (name) {
			wrapError(i, await getGravatarUrl(name))
			continue
		}
	}

	setTimeout(fetchAvatars, 1000)
}
