"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const useNavigationEvent = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		// Path and/or searchParams has changed
		document.getElementById("top").scrollIntoView()
	}, [pathname, searchParams])
}

export default useNavigationEvent
