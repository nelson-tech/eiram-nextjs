import getClient from "@api/client"
import { GetCustomerDataDocument } from "@api/codegen/graphql"
import getTokensServer from "@lib/utils/getTokensServer"

import ResetPasswordForm from "@components/ResetPasswordForm"

const getUserEmail = async () => {
	const { tokens } = await getTokensServer()

	const client = getClient(tokens)

	const customerData = await client.request(GetCustomerDataDocument)

	return customerData.customer?.email
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
