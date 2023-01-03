export const AUTH_TOKEN_KEY: string = `auth_token`
export const REFRESH_TOKEN_KEY: string = `refresh_token`
export const CART_NONCE_KEY: string = `cart_nonce`
export const CART_TOKEN_KEY: string = `cart_key`
export const USER_TOKEN_KEY: string = `user_token`
export const CLIENT_MUTATION_KEY: string = `clientMutation`
export const LOGGED_OUT_KEY: string = `logged-out-time`
export const SHOULD_LOGOUT_KEY: string = `should-logout`

export const API_BASE: string = "https://" + process.env.NEXT_PUBLIC_API_HOST
export const REST_BASE: string = API_BASE + "/wp-json"
export const REST_WP: string = REST_BASE + "/wp/v2"
export const REST_AUTH_URI = REST_BASE + "/jwt-auth/v1/token"
export const REST_MENU: string = REST_BASE + "/menus/v1"
export const REST_CART: string = REST_BASE + "/wc/store/v1"

export const FRONTEND_BASE = process.env.NEXT_PUBLIC_FRONTEND_HOST
export const AUTH_ENDPOINT = FRONTEND_BASE + "/api/auth"
export const CART_ENDPOINT: string = FRONTEND_BASE + "/api/cart"
export const STRIPE_ENDPOINT = FRONTEND_BASE + "/api/stripe"
;("https://api.eiramknitwear.com/wc/v3/products")
