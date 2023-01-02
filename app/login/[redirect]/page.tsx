import AuthChecker from "@components/AuthChecker"
import LoginForm from "@components/loginForm"

const LoginWithRedirect = async ({ params }: { params: { redirect: string } }) => {
	return (
		<>
			<AuthChecker forceGuest redirect="/shop" />
			<LoginForm redirect={params.redirect} />
		</>
	)
}

export default LoginWithRedirect
