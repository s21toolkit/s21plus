import { enchant } from "./enchantedNickname";
import { задумчивый_господин, перестать_думать } from "./задумчивый_господин";

export default {
	async load() {
		задумчивый_господин()
		enchant()
	},
	async unload() {
		перестать_думать()
	}
}
