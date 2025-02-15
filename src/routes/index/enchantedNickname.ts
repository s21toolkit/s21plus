import EnchantedText from '@/components/EnchantedText.svelte'
import { mount } from 'svelte'

const TEST_ID = "dashboard.personalInfo.name"

const observer = new MutationObserver((records) => {
	for (const r of records) {
		if (!r.addedNodes.length) continue

		for (const n of Array.from(r.addedNodes)) {
			const target = n as HTMLElement
			if (target.dataset?.testid === TEST_ID) {
				const nick = target.textContent!

				target.innerHTML = ""

				mount(EnchantedText, {
					intro: false,
					anchor: target,
					target: target.parentNode! as Element,
					props: {
						text: nick,
						dataset: {
							testid: TEST_ID,
						}
					},
				})

				target.remove()
				observer.disconnect()
			}
		}
	}
})

export async function enchant() {
	observer.observe(document.body, {
		subtree: true,
		childList: true,
	})
}
