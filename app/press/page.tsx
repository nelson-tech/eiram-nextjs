import PressGallery from "@components/Press"
import getPress from "@lib/server/getPress"

const PressPage = async () => {
	const press = await getPress()

	return (
		<>
			<div className="max-w-7xl m-auto p-8 mb-8">
				{press && press?.length > 0 && (
					<>
						<div className="text-center">
							<h2 className="text-4xl font-bold uppercase text-gray-500 font-sans tracking-wide">
								Press
							</h2>
						</div>

						<PressGallery press={press} />
					</>
				)}
			</div>
		</>
	)
}

export default PressPage
