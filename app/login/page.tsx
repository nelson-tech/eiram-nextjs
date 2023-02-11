import AuthChecker from "component/AuthChecker"
import LoginForm from "component/loginForm"

const LoginPage = ({ searchParams }: { searchParams?: { redirect: string } }) => {
	return (
		<>
			<AuthChecker forceGuest redirect={`/${searchParams.redirect ?? "shop"}`} />
			<LoginForm />
		</>
	)
}

export default LoginPage

export const metadata = {
	title: "Login",
	description: "Login to your account to check the status of your order.",
	keywords: ["Login", "Account", "Eiram", "Knitwear", "Fashion", "Shopping"],
}
