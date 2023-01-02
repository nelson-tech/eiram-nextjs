import { string, object, boolean, discriminatedUnion, literal } from "zod"

type OptionalStringFieldType = {
	optional: true
}

type MinStringFieldType = {
	min: number
	max?: number
	message: string
}

type MaxStringFieldType = {
	min?: number
	max: number
	message: string
}

type EmailStringFieldType = {
	message: string
}

type StringFieldType =
	| OptionalStringFieldType
	| MinStringFieldType
	| MaxStringFieldType
	| EmailStringFieldType

type FormInputRequirementsType = {
	[key: string]: StringFieldType
}

const messages = {
	email: "Valid email is required.",
	phone: "Phone number is required (5-17 characters long).",
	first_name: "First name is required.",
	last_name: "Last name is required.",
	address1: "Valid address is required.",
	city: "City is required.",
	state: "State is required.",
	postcode: "Postcode is required.",
	country: "Country is required.",
}

const contactSchema = object({
	email: string({
		required_error: messages.email,
		invalid_type_error: messages.email,
	}).email({
		message: messages.email,
	}),
	phone: string({ invalid_type_error: messages.phone })
		.min(5, messages.phone)
		.max(17, messages.phone),
	first_name: string({ invalid_type_error: messages.first_name }).min(1, messages.first_name),
	last_name: string({ invalid_type_error: messages.last_name }).min(1, messages.last_name),
	company: string().nullable(),
	address_1: string({ invalid_type_error: messages.address1 }).min(3, messages.address1),
	address_2: string().nullable(),
	city: string({ invalid_type_error: messages.city }).min(2, messages.city),
	state: string({ invalid_type_error: messages.state }).min(2, messages.state),
	postcode: string({ invalid_type_error: messages.postcode }).min(3, messages.postcode),
	country: string({ invalid_type_error: messages.country }).min(2, messages.country),
})

const truf = literal(true)
truf.value

const schema = discriminatedUnion("shipToDifferentAddress", [
	object({
		shipToDifferentAddress: literal(false),
		billing_address: contactSchema,
		customer_note: string().nullish(),
	}),
	object({
		shipToDifferentAddress: literal(true),
		billing_address: contactSchema,
		shipping_address: contactSchema,
		customer_note: string().nullish(),
	}),
])

export default schema
