"use client"

import { Children, cloneElement, Fragment, MutableRefObject, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"

type ModalInputType = {
	closeModal: () => void
	open: boolean
	children: JSX.Element
	panelStyle?: string
}

const Modal = ({ closeModal, open, children, panelStyle }: ModalInputType) => {
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
							enter="duration-150 ease-out"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="duration-200 ease-in"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							as={Fragment}
						>
							<div className="fixed inset-0 bg-black bg-opacity-50" />
						</Transition.Child>
						{/* This element is to trick the browser into centering the modal contents. */}
						<span className="inline-block h-screen align-middle" aria-hidden="true">
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="duration-150 ease-out"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="duration-200 ease-in"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel
								className={
									panelStyle ??
									"inline-block w-full min-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
								}
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
