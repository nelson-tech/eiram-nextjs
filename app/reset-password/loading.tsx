import LoadingSpinner from "components/LoadingSpinner"

const ResetPasswordPageLoading = () => {
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingSpinner size={32} />
      </div>
    </>
  )
}

export default ResetPasswordPageLoading
