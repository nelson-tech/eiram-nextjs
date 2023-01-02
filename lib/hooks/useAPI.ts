import type { ReadonlyRequestCookies } from "next/dist/server/app-render"
import type { RequestCookies } from "next/dist/server/web/spec-extension/cookies"

import { AUTH_TOKEN_KEY, REST_MENU } from "@lib/constants"
import isServer from "@lib/utils/isServer"

type UseAPIParamsType = {
	ctx?: AuthMachineContextType
	cookies?: RequestCookies | ReadonlyRequestCookies
	method?: "POST" | "GET"
	credentials?: "include" | "omit" | "same-origin"
	url: string
	body?: RequestInit["body"]
}

const useAPI = () => {
	const fetchAPI = async ({
		ctx,
		cookies,
		method = "GET",
		credentials = "include",
		url,
		body,
	}: UseAPIParamsType) => {
		try {
			const headers = { "content-type": "application/json" }

			let authToken: string | null = null

			if (!isServer) {
				// Do auth checks on client

				authToken = ctx?.token
			} else if (cookies) {
				// Do auth checks on server

				authToken = cookies.get(AUTH_TOKEN_KEY)?.value
			}

			authToken && (headers["Authorization"] = `Bearer ${authToken}`)

			const fetchArgs: RequestInit = {
				method: method ?? "GET",
				credentials: credentials ?? "include",
				headers,
			}

			fetchArgs.method === "POST" && (fetchArgs["body"] = JSON.stringify(body))

			const response: Response = await fetch(url, {
				...fetchArgs,
			})

			return response
		} catch (error) {
			console.warn("Error during fetch", error)
		}
	}

	const fetchMenu = async () => {
		return fetchAPI({ url: REST_MENU + "/menus/main" })
	}

	const fetchCart = async () => {}

	return { fetchAPI, fetchMenu, fetchCart }
}

export default useAPI
