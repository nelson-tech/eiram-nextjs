// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
	"@@xstate/typegen": true
	internalEvents: {
		"done.invoke.authChecker": {
			type: "done.invoke.authChecker"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.login": {
			type: "done.invoke.login"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.logout": {
			type: "done.invoke.logout"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.register": {
			type: "done.invoke.register"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"error.platform.authChecker": { type: "error.platform.authChecker"; data: unknown }
		"error.platform.login": { type: "error.platform.login"; data: unknown }
		"error.platform.logout": { type: "error.platform.logout"; data: unknown }
		"error.platform.register": { type: "error.platform.register"; data: unknown }
		"xstate.init": { type: "xstate.init" }
	}
	invokeSrcNameMap: {
		authChecker: "done.invoke.authChecker"
		login: "done.invoke.login"
		logout: "done.invoke.logout"
		register: "done.invoke.register"
	}
	missingImplementations: {
		actions: never
		delays: never
		guards: never
		services: never
	}
	eventsCausingActions: {
		setToken: "done.invoke.authChecker" | "done.invoke.login" | "done.invoke.register"
	}
	eventsCausingDelays: {}
	eventsCausingGuards: {}
	eventsCausingServices: {
		authChecker: "AUTHENTICATE"
		login: "LOGIN"
		logout: "LOGOUT"
		register: "REGISTER"
	}
	matchesStates:
		| "authenticating"
		| "loggedIn"
		| "loggedOut"
		| "loggingIn"
		| "loggingOut"
		| "registering"
	tags: never
}
