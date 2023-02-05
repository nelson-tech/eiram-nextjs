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
		"error.platform.authChecker": { type: "error.platform.authChecker"; data: unknown }
		"error.platform.login": { type: "error.platform.login"; data: unknown }
		"error.platform.logout": { type: "error.platform.logout"; data: unknown }
		"xstate.init": { type: "xstate.init" }
	}
	invokeSrcNameMap: {
		authChecker: "done.invoke.authChecker"
		login: "done.invoke.login"
		logout: "done.invoke.logout"
	}
	missingImplementations: {
		actions: never
		delays: never
		guards: never
		services: never
	}
	eventsCausingActions: {
		setToken: "done.invoke.authChecker" | "done.invoke.login" | "done.invoke.logout"
	}
	eventsCausingDelays: {}
	eventsCausingGuards: {}
	eventsCausingServices: {
		authChecker: "AUTHENTICATE"
		login: "LOGIN"
		logout: "LOGOUT"
	}
	matchesStates: "authenticating" | "loggedIn" | "loggedOut" | "loggingIn" | "loggingOut"
	tags: never
}
