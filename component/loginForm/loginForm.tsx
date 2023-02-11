"use client"

import { useEffect, MutableRefObject, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

import useAuth from "@lib/hooks/useAuth"
import LockClosedIcon from "component/icons/LockClosed"
import Link from "component/Link"

import LoadingSpinner from "component/LoadingSpinner"

type LoginFormProps = {
	firstFocusRef?: MutableRefObject<HTMLInputElement> | MutableRefObject<null> | null
	closeModal?: () => void
}

const LoginForm = ({ firstFocusRef, closeModal }: LoginFormProps) => {
	const [loading, setLoading] = useState(false)
	const params = useSearchParams()
	const redirect = params.get("redirect")
	const router = useRouter()

	const { processing, login, matches } = useAuth()

	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
			rememberMe: true,
		},
	})

	const onSubmit: SubmitHandler<{
		email: string
		password: string
		rememberMe: boolean
	}> = async (data) => {
		setLoading(true)

		const { email, password, rememberMe } = data
		if (email && password) {
			const input = {
				username: email,
				password,
			}

			const newState = await login(input, closeModal)
		}
		setLoading(false)
	}

	const ErrorField = ({ name }: { name: "email" | "password" | "rememberMe" }) => {
		return (
			<ErrorMessage
				errors={errors}
				name={name}
				render={({ message }) => <p className="text-red-main text-sm pt-2 pl-2">{message}</p>}
			/>
		)
	}

	useEffect(() => {
		if (matches("loggedIn") && router) {
			router.push(`/${redirect ?? ""}`)
		}
	}, [matches, router, redirect])

	const { ref, ...restEmail } = register("email", {
		required: "Valid email is required.",
	})

	return (
		<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="text-center text-3xl font-extrabold text-gray-700">
						Log in to your account
					</h2>
				</div>
				<form action="#" method="post" onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-2">
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								{" "}
								Email address{" "}
							</label>

							<input
								id="email-address"
								type="email"
								ref={(e) => {
									ref(e)
									firstFocusRef && e && (firstFocusRef.current = e)
								}}
								autoComplete="email"
								{...restEmail}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
								placeholder="Email address"
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								{" "}
								Password{" "}
							</label>
							<input
								id="password"
								type="password"
								autoComplete="current-password"
								{...register("password", {
									minLength: {
										value: 8,
										message: "Password must be 8-32 characters.",
									},
									maxLength: {
										value: 32,
										message: "Password must be 8-32 characters.",
									},
									required: "Password is required.",
								})}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
						</div>
					</div>

					<div className="pt-2">
						<ErrorField name="email" />
						<ErrorField name="password" />
					</div>

					<div className="text-sm text-center pt-2">
						<Link
							href={`/reset-password${redirect ? `?redirect=${redirect}` : ""}`}
							className="font-medium text-accent hover:text-highlight"
							title="Reset your password."
							onClick={() => closeModal && closeModal()}
						>
							Forgot your password?
						</Link>
					</div>

					<div className="pt-4">
						<button
							type="submit"
							title="Click to log in."
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight"
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								{processing ? (
									<LoadingSpinner size={5} color="white" />
								) : (
									<div className="h-5 w-5 text-gray-300 group-hover:text-white" aria-hidden="true">
										<LockClosedIcon type="solid" />
									</div>
								)}
							</span>
							Log in
						</button>
					</div>
				</form>
				<div className=" flex justify-center text-sm text-gray-600">
					<div>
						<span className="pr-1">Already have an account?</span>
					</div>
					<div onClick={() => closeModal && closeModal()}>
						<Link
							href={`/register${redirect ? `/${redirect}` : ""}`}
							title="Click to register."
							className="font-medium text-accent hover:text-highlight"
						>
							<span>Click here to register</span>
						</Link>
					</div>
					<span>.</span>
				</div>
			</div>
		</div>
	)
}

export default LoginForm
