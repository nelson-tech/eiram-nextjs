import LoadingSpinner from "component/LoadingSpinner"

const LoginLoading = () => {
	return (
		<>
			<div className="h-screen w-full flex items-center justify-center">
				<LoadingSpinner size={32} />
			</div>
		</>
	)
}

export default LoginLoading