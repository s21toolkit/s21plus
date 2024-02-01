import { calendarRoute } from "./routes/calendar"
import { injectNavigationHook } from "./utils/navigateHook"

const routes = {
	"/calendar": calendarRoute,
}

injectNavigationHook((url: string) => {
	routes[new URL(url).pathname]?.()
})
