export type IconProps = {
  type?: "outline" | "solid"
  size?: number
  styling?: string
}

const IconComponent = ({
  size = 6,
  styling = "",
  children,
}: IconProps & { children: JSX.Element }) => {
  return (
    <div
      style={{ width: `${size / 4}rem`, height: `${size / 4}rem` }}
      className={styling}
    >
      {children}
    </div>
  )
}

export default IconComponent
