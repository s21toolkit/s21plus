import { calendarRoute } from "./routes/calendar"
import { indexRoute } from "./routes/index"
import { injectNavigationHook } from "./utils/navigateHook"

const routes = {
	"/calendar": calendarRoute,
	"/": indexRoute,
}

injectNavigationHook((url: string) => {
	routes[new URL(url).pathname]?.()
})
