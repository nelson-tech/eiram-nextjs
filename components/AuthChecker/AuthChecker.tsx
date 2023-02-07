"use client"

import useAuth from "@lib/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type AuthCheckerInputType = {
	forceGuest?: boolean
	redirect: string
}

const AuthChecker = ({ forceGuest = false, redirect }: AuthCheckerInputType) => {
	const { isAuth, processing } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!processing && isAuth == forceGuest) {
			router.push(redirect)
		}
	}, [isAuth, router, processing, redirect])

	return <></>
}

export default AuthChecker
