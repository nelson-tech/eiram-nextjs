import LoadingSpinner from "component/LoadingSpinner"

const PageLoading = () => {
	return (
		<>
			<div className="h-screen w-full flex items-center justify-center">
				<LoadingSpinner size={32} />
			</div>
		</>
	)
}

export default PageLoading
