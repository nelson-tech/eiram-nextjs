import {
  Customer,
  LoginInput,
  RegisterCustomerInput,
  ResetUserPasswordInput,
  SendPasswordResetEmailInput,
} from "@lib/api/codegen/graphql"

export type CLIENT_Tokens_Type = {
  auth: string | null | undefined
  refresh: string | null | undefined
  cart: string | null | undefined
  customer: string | null | undefined
}

export type AuthMachine_Type = {
  tokens: CLIENT_Tokens_Type | null
  customer: Customer | null
}

type AuthCallbackWithName = (
  success: boolean,
  firstName?: string | null | undefined
) => void

export type AuthLoginEvent_Type = {
  input: LoginInput
  callback: AuthCallbackWithName
}

export type AuthLogoutEvent_Type = {
  callback: (success: boolean) => void
}

export type AuthRegisterEvent_Type = {
  input: RegisterCustomerInput
  callback: AuthCallbackWithName
}

export type AuthSendResetEmailEvent_Type = {
  input: SendPasswordResetEmailInput
  callback: (success: boolean) => void
}

export type AuthResetPasswordEvent_Type = {
  input: Exclude<ResetUserPasswordInput, "clientMutationId">
  callback: AuthCallbackWithName
}

export type AuthUpdateCustomerEvent_Type = {
  customer: Customer
}
