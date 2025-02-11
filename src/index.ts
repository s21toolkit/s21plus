import { calendarRoute } from "./routes/calendar"
import { indexRoute } from "./routes/index"
import { fetchAvatars } from "./utils/avatars"
import { injectNavigationHook } from "./utils/navigateHook"
import "./utils/user"

const routes = {
	"/calendar": calendarRoute,
	"/": indexRoute,
}

injectNavigationHook((url: string) => {
	routes[new URL(url).pathname]?.()
	fetchAvatars()
})
