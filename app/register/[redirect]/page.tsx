import AuthChecker from "@components/AuthChecker"
import RegisterForm from "@components/RegisterForm"

const RegisterPageWithRedirect = async ({ params }: { params: { redirect: string } }) => {
	return (
		<>
			<AuthChecker forceGuest redirect="/shop" />
			<RegisterForm redirect={params.redirect} />
		</>
	)
}

export default RegisterPageWithRedirect
