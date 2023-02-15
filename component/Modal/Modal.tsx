"use client"

import { Children, cloneElement, CSSProperties, Fragment, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"

type ModalInputType = {
	closeModal: () => void
	open: boolean
	children: JSX.Element
	panelStyle?: string
	panelCSS?: CSSProperties
}

const Modal = ({ closeModal, open, children, panelStyle, panelCSS }: ModalInputType) => {
	const firstFocusRef = useRef(null)
	return (
		<>
			<Transition appear show={open} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-40 overflow-y-auto"
					open={open}
					onClose={closeModal}
					initialFocus={firstFocusRef}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							enter="duration-300 ease-out"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="duration-500 ease-in"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							as={Fragment}
						>
							<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300" />
						</Transition.Child>
						{/* This element is to trick the browser into centering the modal contents. */}
						<span className="inline-block h-screen align-middle" aria-hidden="true">
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="duration-300 ease-out"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="duration-300 ease-in"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel
								className={
									panelStyle ??
									"inline-block min-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
								}
								style={panelCSS}
							>
								{/* Dialog Content Goes Here */}
								{Children.map(children, (child) => {
									return cloneElement(child, {
										firstFocusRef,
										closeModal,
									})
								})}
								{/* Dialog Content Ends Here */}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default Modal
