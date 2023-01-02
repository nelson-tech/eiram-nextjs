import AuthChecker from "@components/AuthChecker"
import RegisterForm from "@components/RegisterForm"

const RegisterPage = () => {
	return (
		<>
			<AuthChecker forceGuest redirect="/shop"></AuthChecker>
			<RegisterForm />
		</>
	)
}

export default RegisterPage
