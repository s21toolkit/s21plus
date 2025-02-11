// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OperationHook = (reqBody: any, resBody: any) => Promise<void> | void
export interface OperationHookConfig {
	hook: OperationHook
	oneshot: boolean
}

const operationHooks: Map<string, OperationHook[]> = new Map()
const operationHookOneshots: Map<string, OperationHook[]> = new Map()

export function addOperationHook(
	operationName: string,
	config: OperationHookConfig,
) {
	const collection = config.oneshot ? operationHookOneshots : operationHooks

	collection[operationName] ??= []
	collection[operationName].push(config.hook)
}

async function modify(request: string, response: string) {
	const req = JSON.parse(request)
	const data = JSON.parse(response)
	const res = data?.data ?? data

	const oneshots = operationHookOneshots[req.operationName]
	if (oneshots) {
		for (const op of oneshots) {
			await op(req, res)
		}
		oneshots.length = 0
	}

	const hooks = operationHookOneshots[req.operationName]
	if (hooks) {
		for (const op of hooks) {
			await op(req, res)
		}
	}

	return JSON.stringify(data)
}

export const originalFetch = unsafeWindow.fetch
unsafeWindow.fetch = async function (url, options) {
	if (`${url}`.includes("sentry")) {
		console.warn(`Blocked ${url}`)
		return new Response()
	}

	const data = await originalFetch(url, options)
	if (!`${url}`.includes("graphql") || !options?.body) {
		return data
	}

	const origText = data.text
	data.text = async function () {
		return await modify(
			options.body?.toString() ?? "",
			await origText.call(this),
		)
	}

	data.json = async function () {
		return await modify(
			options.body?.toString() ?? "",
			await origText.call(this),
		)
	}

	return data
}
