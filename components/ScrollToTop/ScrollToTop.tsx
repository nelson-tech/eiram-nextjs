"use client"

import { Transition } from "@headlessui/react"
import { ArrowUpIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false)

	const toggleVisibility = () => {
		if (window.pageYOffset > 200) {
			setIsVisible(true)
		} else {
			setIsVisible(false)
		}
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility)

		return () => {
			window.removeEventListener("scroll", toggleVisibility)
		}
	}, [])

	return (
		<>
			<Transition
				show={isVisible}
				enter="transition-opacity duration-400"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-400"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div
					className="fixed w-8 h-8 bottom-0 right-0 mr-6 mb-6 group rounded-full overflow-hidden animate-[pulse_2s_ease-in-out_infinite]"
					title="Scroll to top"
					onClick={scrollToTop}
				>
					<div className="w-full h-full flex justify-center items-center cursor-pointer transition-all bg-gray-300 group-hover:bg-accent">
						<ArrowUpIcon className="h-6 w-6 text-white" />
					</div>
				</div>
			</Transition>
		</>
	)
}

export default ScrollToTop
