import useClient from "@api/client"
import { GetCustomerDataDocument } from "@api/codegen/graphql"
import getTokensServer from "@lib/utils/getTokensServer"

import ResetPasswordForm from "@components/ResetPasswordForm"

const getUserEmail = async () => {
	const { tokens } = await getTokensServer()

	const client = useClient(tokens)

	const userData = await client.request(GetCustomerDataDocument)

	return userData.customer?.email
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
