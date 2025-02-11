// Magic! don't look!!!

export async function waitNotNull<T>(
	func: () => Promise<T | null> | T | null,
	timeout = 10000,
	interval = 1000,
) {
	return new Promise<NonNullable<T>>(async (res, rej) => {
		let time = timeout
		const v = await func()
		if (v) res(v)

		const i = setInterval(async () => {
			const c = await func()
			time -= interval
			if (time <= 0) {
				clearInterval(i)
				rej!()
			}
			if (!c) return

			clearInterval(i)
			res!(c)
		}, interval)
	})
}
