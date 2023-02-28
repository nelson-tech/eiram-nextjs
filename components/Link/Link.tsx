import { forwardRef } from "react"
import NextLink from "next/link"
import type { LinkProps } from "next/link"

// ####
// #### Types
// ####

export type LinkPropsType = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode
  } & React.RefAttributes<HTMLAnchorElement>

// ####
// #### Component
// ####

const Link = forwardRef(({ children, ...linkProps }: LinkPropsType) => {
  return <NextLink {...linkProps}>{children}</NextLink>
})

Link.displayName = "CustomLink"

export default Link
