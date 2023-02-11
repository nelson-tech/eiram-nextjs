import AuthChecker from "@components/AuthChecker"
import RegisterForm from "@components/RegisterForm"

const RegisterPage = ({ searchParams }: { searchParams?: { redirect: string } }) => {
	return (
		<>
			<AuthChecker forceGuest redirect={`/${searchParams.redirect ?? "shop"}`}></AuthChecker>
			<RegisterForm />
		</>
	)
}

export default RegisterPage

export const metadata = {
	title: "Register",
	description:
		"Register for a free account to today. An account makes it easy to see the status of your order and to track the shipment when it's available.",
	keywords: ["Register", "Account", "Shop", "Eiram", "Knitwear", "Wool", "Fashion"],
}
