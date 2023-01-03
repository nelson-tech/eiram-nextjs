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
