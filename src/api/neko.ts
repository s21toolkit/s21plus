import { seededRandom } from "@/utils/random"

const nekosAvatarPool: string[] = []
export async function ensureNekoPoolLength(amount: number) {
	while (nekosAvatarPool.length < amount) {
		const fetchAmount = Math.min(Math.max(amount, 20))
		nekosAvatarPool.push(
			...await fetch(`https://nekos.best/api/v2/neko?amount=${fetchAmount}`)
				.then(e => e.json())
				.then(e => e.results.map((n: { url: string }) => n.url))
		)
	}
}

export async function getNeko(username: string) {
	await ensureNekoPoolLength(2)
	return nekosAvatarPool[Math.trunc(seededRandom(username) * nekosAvatarPool.length)]!
}
