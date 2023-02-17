type AlertType = "info" | "warning" | "error" | "success"

type AlertState = {
  kind?: "info" | "warning" | "error" | "success"
  icon?: React.ReactNode
  primary?: string
  secondary?: string
  onClose?: Function
  timeout?: number
}

// type AlertState = {
// 	primary: string
// 	secondary: string
// 	type: AlertType
// 	timeout: number
// }
