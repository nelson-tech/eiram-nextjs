import { API_URL } from "@lib/constants"

type DynamicReturnType<T> = {
  data: T | null
}

const getCachedQuery = async <T extends unknown>(
  queryId: string
): Promise<DynamicReturnType<T>> => {
  const cachedResponse = await fetch(API_URL + `?queryId=${queryId}`, {
    headers: { "content-type": "application/json" },
    next: { revalidate: 60 },
  })

  const { data } = await cachedResponse.json()

  return { data }
}

export default getCachedQuery
