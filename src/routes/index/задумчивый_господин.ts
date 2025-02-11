import { waitNotNull } from "@/utils/waitNotNull";

export function задумчивый_господин() {
	waitNotNull(() =>
		document.querySelector("img[alt=\"decorative image\"]") as HTMLImageElement, 60000, 200
	).then(e => e.src = "https://static.wikia.nocookie.net/surrealmemes/images/a/a0/Moyai.png")
}
