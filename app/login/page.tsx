import AuthChecker from "@components/AuthChecker"
import LoginForm from "@components/loginForm"

const LoginPage = () => {
	return (
		<>
			<AuthChecker forceGuest redirect="/shop" />
			<LoginForm />
		</>
	)
}

export default LoginPage
