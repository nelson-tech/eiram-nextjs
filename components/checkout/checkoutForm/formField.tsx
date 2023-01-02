"use client"

import { ReactNode } from "react"
import { ErrorMessage } from "@hookform/error-message"
import { RegisterOptions, UseFormRegister } from "react-hook-form"

// ####
// #### Types
// ####

type PropsType = {
	register: UseFormRegister<any>
	registerOptions?: RegisterOptions
	errors: any
	name: string
	label: string | ReactNode
	type: string
	autoComplete?: string
	containerStyle?: string
	labelStyle?: string
	inputStyle?: string
	errorStyle?: string
	labelAfter?: boolean
	textArea?: boolean
	textAreaRows?: number
	textAreaStyle?: string
}

// Styles
export const containerStyling = "col-span-full"
export const labelStyling = "block text-sm font-medium text-gray-700"
export const inputStyling =
	"mt-1 block w-full border-gray-300 border-b p-2 rounded-md shadow-sm outline-none focus:ring-blue-main focus:border-blue-main sm:text-sm"
export const errorStyling = "block text-red-main text-sm pt-2 pl-1"
export const textAreaStyling = inputStyling

// ####
// #### Component
// ####

const FormField = ({
	register,
	registerOptions,
	errors,
	name,
	label,
	type,
	autoComplete,
	containerStyle,
	labelStyle,
	inputStyle,
	errorStyle,
	labelAfter,
	textArea,
	textAreaRows,
	textAreaStyle,
}: PropsType) => {
	// Styles
	const containerStyling = containerStyle ?? "col-span-full"
	const labelStyling = labelStyle ?? "block text-sm font-medium text-gray-700"
	const inputStyling =
		inputStyle ??
		"mt-1 block w-full border-gray-300 border-b p-2 rounded-md shadow-sm outline-none focus:ring-blue-main focus:border-blue-main sm:text-sm"
	const errorStyling = errorStyle ?? "block text-red-main text-sm pt-2 pl-1"
	const textAreaStyling = textAreaStyle ?? inputStyling
	return (
		<>
			<div className={containerStyling}>
				{!labelAfter && (
					<label htmlFor={name} className={labelStyling}>
						{label}
					</label>
				)}
				{textArea ? (
					<textarea
						rows={textAreaRows ?? 5}
						id={name}
						{...register(name, registerOptions)}
						className={inputStyling}
					/>
				) : (
					<input
						type={type}
						id={name}
						autoComplete={autoComplete}
						{...register(name, registerOptions)}
						className={inputStyling}
					/>
				)}
				{labelAfter && (
					<label htmlFor={name} className={labelStyling}>
						{label}
					</label>
				)}

				<ErrorMessage
					errors={errors}
					name={name}
					render={({ message }) => <p className={errorStyling}>{message}</p>}
				/>
			</div>
		</>
	)
}

export default FormField
