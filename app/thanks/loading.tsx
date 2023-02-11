import LoadingSpinner from "components/LoadingSpinner"

const ThanksPageLoading = () => {
	return (
		<>
			<div className="h-screen w-full flex items-center justify-center">
				<LoadingSpinner size={32} />
			</div>
		</>
	)
}

export default ThanksPageLoading
