import LoadingSpinner from "component/LoadingSpinner"

const ShopLoading = () => {
	return (
		<>
			<div className="h-screen w-full flex items-center justify-center">
				<LoadingSpinner size={32} />
			</div>
		</>
	)
}

export default ShopLoading
