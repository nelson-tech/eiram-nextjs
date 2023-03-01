import { forwardRef, Ref } from "react"
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

const Link = forwardRef(
  (
    { children, ...linkProps }: LinkPropsType,
    ref: Ref<HTMLAnchorElement> | undefined
  ) => {
    return (
      <NextLink {...linkProps} ref={ref}>
        {children}
      </NextLink>
    )
  }
)

Link.displayName = "CustomLink"

export default Link
