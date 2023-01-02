import ResetPasswordForm from "@components/ResetPasswordForm"
import { REFRESH_TOKEN_KEY, REST_AUTH_URI, REST_BASE } from "@lib/constants"
import getTokens from "@lib/utils/getTokens"

const getUserEmail = async () => {
	const { tokens } = getTokens()

	if (tokens.refresh) {
		const body = JSON.stringify({ [REFRESH_TOKEN_KEY]: tokens.refresh })

		const customerResponse = await fetch(REST_AUTH_URI, {
			headers: { Authorization: `Bearer ${tokens.auth}`, "content-type": "application/json" },
			method: "POST",
			body,
		})

		const customerData: WP_AUTH_LoginResponseType = await customerResponse.json()

		return customerData?.data?.email
	}

	return null
}

const ResetPasswordPage = async () => {
	const detectedEmail = await getUserEmail()

	return (
		<>
			<ResetPasswordForm detectedEmail={detectedEmail} />
		</>
	)
}

export default ResetPasswordPage
