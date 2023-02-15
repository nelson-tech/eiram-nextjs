import PressGallery from "components/Press"
import getPress from "@lib/server/getPress"

const PressPage = async () => {
	const press = await getPress()

	return (
		<>
			<div className="max-w-7xl m-auto p-8 mb-8">
				{press && press?.length > 0 && (
					<>
						<div className="text-center">
							<h2 className="text-4xl font-bold text-gray-900 tracking-wide">Press</h2>
						</div>

						<PressGallery press={press} />
					</>
				)}
			</div>
		</>
	)
}

export default PressPage

export const revalidate = 60 // revalidate this page every 60 seconds

export const metadata = {
	title: "Press",
	description:
		"A collection of appearances of Eiram's innovative knitwear in various press articles.",
	keywords: ["Press", "Eiram", "Knitwear", "Wool", "Fashion", "Shopping"],
}
