import { API_URL } from "@lib/constants"

type ReturnDataType<T> = {
	data: T | null
}

const getCachedQuery = async <T extends unknown>(queryId: string): Promise<ReturnDataType<T>> => {
	const cachedResponse = await fetch(API_URL + `?queryId=${queryId}`, {
		headers: { "content-type": "application/json" },
	})
	const { data } = await cachedResponse.json()

	return { data }
}

export default getCachedQuery
