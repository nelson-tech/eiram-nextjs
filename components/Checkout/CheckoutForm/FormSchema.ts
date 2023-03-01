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
  firstName: "First name is required.",
  lastName: "Last name is required.",
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
  firstName: string({ invalid_type_error: messages.firstName }).min(
    1,
    messages.firstName
  ),
  lastName: string({ invalid_type_error: messages.lastName }).min(
    1,
    messages.lastName
  ),
  company: string().nullable(),
  address1: string({ invalid_type_error: messages.address1 }).min(
    3,
    messages.address1
  ),
  address2: string().nullable(),
  city: string({ invalid_type_error: messages.city }).min(2, messages.city),
  state: string({ invalid_type_error: messages.state }).min(2, messages.state),
  postcode: string({ invalid_type_error: messages.postcode }).min(
    3,
    messages.postcode
  ),
  country: string({ invalid_type_error: messages.country }).min(
    2,
    messages.country
  ),
})

const truf = literal(true)
truf.value

const schema = discriminatedUnion("shipToDifferentAddress", [
  object({
    shipToDifferentAddress: literal(false),
    billing: contactSchema,
    customer_note: string().nullish(),
  }),
  object({
    shipToDifferentAddress: literal(true),
    billing: contactSchema,
    shipping: contactSchema,
    customer_note: string().nullish(),
  }),
])

export default schema
