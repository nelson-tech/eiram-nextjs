import { setCookie as cookieSetter } from "cookies-next"
import { OptionsType } from "cookies-next/lib/types"
import { decodeToken } from "./decodeJwt"

const setCookie = (
  key: string | null | undefined,
  token: string | null | undefined,
  options?: OptionsType,
  referenceExpiration?: string | null | undefined
) => {
  if (key && token) {
    const cookieOptions: OptionsType = {
      expires: new Date(decodeToken(referenceExpiration ?? token).exp * 1000),
      ...options,
    }

    cookieSetter(key, token, cookieOptions)
  }
}

export default setCookie
