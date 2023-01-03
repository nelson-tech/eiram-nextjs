type JWToken = {
	iss: string
	iat: number
	nbf: number
	exp: number
	data: {
		user: {
			id: string
		}
	}
}

type AuthMachineContextType = {
	token: string | null
	user: CLIENT_UserDataType
}

type WP_AUTH_LoginInputType = {
	username: string
	password: string
}

type WP_AUTH_LoginType = {
	action: "LOGIN"

	input?: WP_AUTH_LoginInputType | null | undefined
}
type WP_AUTH_CartType = {
	action: "CART"
	cartKey: string | null | undefined
}

type WP_AuthTokensType = {
	auth?: string | null | undefined
	refresh?: string | null | undefined
	user?: string | null | undefined
	cart?: string | null | undefined
	nonce?: string | null | undefined
}

type WP_RegisterUserInputType = {
	username: string
	name?: string
	first_name?: string
	last_name?: string
	email: string
	url?: string
	description?: string
	locale?: string
	nickname?: string
	slug?: string
	roles?: string
	password: string
	meta?: { [key: string]: string }[]
}

type WP_AUTH_RegisterType = {
	action: "REGISTER"
	input: WP_RegisterUserInputType
}

type WP_RegistrationResponseType = {
	id: number
	username: string
	name: string
	first_name: string
	last_name: string
	email: string
	url: string
	description: string
	link: string
	locale: string
	nickname: string
	slug: string
	roles: [string]
	registered_date: string
	capabilities: { read: boolean; customer: boolean }
	extra_capabilities: { customer: boolean }
	avatar_urls: {
		[key: string]: string
	}
	meta: { persisted_preferences: [] }
	acf: []
	is_super_admin: boolean
	woocommerce_meta: {
		activity_panel_inbox_last_read: string
		activity_panel_reviews_last_read: string
		homepage_layout: string
		homepage_stats: string
		task_list_tracked_started_tasks: string
		help_panel_highlight_shown: string
		android_app_banner_dismissed: string
	}
	_links: { self: [[Object]]; collection: [[Object]] }
}

type WP_Reset_ResponseBodyType = {
	code?: "bad_email" | "bad_request"
	data: {
		status: 200 | 500
	}
	message: string
}

type API_SetInputType = {
	action: "SET"
	newCookies: string
}

type API_AuthInputType =
	| (
			| WP_AUTH_LoginType
			| WP_AUTH_RegisterType
			| WP_AUTH_CartType
			| API_SetInputType
			| {
					action: "CHECKING" | "INIT" | "LOGOUT"
			  }
	  ) & {
			tokens?: WP_AuthTokensType
	  }

type WP_AUTH_LoginResponseType = {
	success: boolean
	statusCode: number
	code: string
	message: string
	data: WP_AUTH_UserDataType & {
		token: string
	}
}

type CLIENT_AuthTokensType = {
	authToken: string
	refreshToken?: string
	cartKey?: string
}

type API_AuthResponseType = {
	isAuth: boolean
	needsRefresh?: null | string
	tokens?: WP_AuthTokensType
	cart?: WC_CartType
	user?: CLIENT_UserDataType
}
