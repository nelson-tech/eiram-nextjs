import getClient from "@api/client"
import { GetCustomerDataDocument } from "@api/codegen/graphql"
import getTokensServer from "@lib/utils/getTokensServer"

import ResetPasswordForm from "component/ResetPasswordForm"

const getCustomerEmail = async () => {
	const { tokens } = await getTokensServer()

	const client = getClient(tokens)

	const customerData = await client.request(GetCustomerDataDocument)

	return customerData.customer?.email
}

const ResetPasswordPage = async () => {
	const detectedEmail = await getCustomerEmail()

	return (
		<>
			<ResetPasswordForm detectedEmail={detectedEmail} />
		</>
	)
}

export default ResetPasswordPage

export const metadata = {
	title: "Reset Password",
	description: "Reset your password easily with your email address if you've forgotten it.",
	keywords: ["Reset Password", "Account", "Shop", "Eiram", "Knitwear", "Wool", "Fashion"],
}
