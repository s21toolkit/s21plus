import { ensureNekoPoolLength, getNeko } from "./api/neko"
import { getCurrentUser } from "./utils/user"

async function digestText(message: string) {
	const msgUint8 = new TextEncoder().encode(message)
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("")
	return hashHex
}

function rocketAvatar(username: string) {
	return `https://rocketchat-student.21-school.ru/avatar/${username}`
}

async function isRocketAvatarExists(username: string) {
	const res = await fetch(rocketAvatar(username), { method: "HEAD" })
	return res.headers.get("content-type") !== "image/svg+xml"
}

const loginHashes = new Map()
export async function getGravatarUrl(username: string) {
	if (loginHashes.has(username)) {
		let avatar = await (await isRocketAvatarExists(username) ? rocketAvatar(username) : getNeko(username))
		return `https://gravatar.com/avatar/${loginHashes.get(username)}?s=512&d=${encodeURIComponent(avatar)}`
	}

	const email = `${username}@student.21-school.ru`
	const hash = await digestText(email)

	loginHashes.set(username, hash)

	return await getGravatarUrl(username)
}

async function findUsernameNearby(i: HTMLImageElement) {
	const u = await getCurrentUser()
	const grandparent = i.parentNode?.parentNode
	return (i.closest("[data-testid='UserMenuWidget.MoreInfoButton']") ? u.login : undefined) ??
		(
			i.closest("[data-testid='components.teamMembersList.teamUser']")
				? grandparent?.querySelector("[data-testid='components.teamMembersList.userLogin']")?.textContent
				: undefined
		) ??
		(grandparent?.parentNode?.querySelector("[data-testid='dashboard.personalInfo.name']")?.textContent) ??
		(grandparent?.parentNode?.querySelector("[data-testid='personalInfo.studentLogin']")?.textContent) ??
		(grandparent?.querySelector("[data-testid='Coalition.CoalitionList.Title.mvpLogin']")?.textContent) ??
		(grandparent?.querySelector("[data-testid='Coalition.MembersList.Member.loginDisplay']")?.textContent) ??
		(grandparent?.querySelector("[data-testid='Coalition.CoalitionList.Title.masterLogin']")?.textContent) ??
		(grandparent?.querySelector("[data-testid='Coalition.CoalitionList.Member.login']")?.textContent)
}

const observer = new MutationObserver(async (records) => {
	for (const m of records) {
		const img = m.target as HTMLImageElement

		if (img.src.includes("/noavatar")) {
			const username = await findUsernameNearby(img)
			console.log(img, username)
			if (!username) continue

			if(window.location.pathname === "/competition/tournament") {
				await ensureNekoPoolLength(50)
			}

			const url = await getGravatarUrl(username)

			observer.disconnect()
			img.src = url
			observe()
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

export async function observeNewAvatars() {
	observe()
}
