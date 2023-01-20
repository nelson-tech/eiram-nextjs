"use client"

import NextImage from "next/image"
import Modal from "@components/modal"
import { XMarkIcon } from "@heroicons/react/20/solid"

type LightboxPropsType = {
	open: boolean
	close: () => void
	slide: string | undefined
}

const Lightbox = ({ open, close, slide }: LightboxPropsType) => {
	return (
		<Modal
			open={open}
			closeModal={close}
			panelStyle="inline-block h-screen w-screen overflow-hidden shadow-xl rounded-2xl"
		>
			<>
				<div
					onClick={close}
					className="absolute right-4 bg-gray-500 rounded-md m-4 z-50 cursor-pointer hover:bg-white text-white hover:text-black"
				>
					<XMarkIcon className="h-8 w-8 " />
				</div>
				<NextImage
					fill
					src={slide}
					// loading="eager"
					// placeholder="blur"
					alt={""}
					className=" object-contain rounded-lg overflow-hidden"
					sizes={"100vw"}
				/>
			</>
		</Modal>
	)
}

export default Lightbox
