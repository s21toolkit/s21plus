import { fetchAvatars } from "./utils/avatars"
import calendarRoute from "./routes/calendar"
import indexRoute from "./routes/index"
import { injectNavigationHook } from "./utils/navigateHook"
import "./utils/user"

const routes: Record<string, { load: () => void, unload: () => void }> = {
	"/calendar": calendarRoute,
	"/": indexRoute,
	"": indexRoute,
}

injectNavigationHook(({ oldpath, newpath }) => {
	routes[oldpath]?.unload()
	routes[newpath]?.load()
})
