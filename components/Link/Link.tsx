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

const Link = ({ children, ...linkProps }: LinkPropsType) => {
  return <NextLink {...linkProps}>{children}</NextLink>
}

export default Link
