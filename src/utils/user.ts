import { addOperationHook } from "./gqlInterceptor"
import { waitNotNull } from "./waitNotNull"

let userCache: { login: string, avatarUrl: string } | undefined
addOperationHook("getCurrentUser", {
	oneshot: true,
	hook(_, resp) {
		userCache = resp.user.getCurrentUser
	}
})

export function getCurrentUser() {
	return waitNotNull(() => userCache, 10000, 100)
}
