// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
	"@@xstate/typegen": true
	internalEvents: {
		"done.invoke.openAlert": {
			type: "done.invoke.openAlert"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"error.platform.openAlert": { type: "error.platform.openAlert"; data: unknown }
		"xstate.init": { type: "xstate.init" }
	}
	invokeSrcNameMap: {
		openAlert: "done.invoke.openAlert"
	}
	missingImplementations: {
		actions: never
		delays: never
		guards: never
		services: never
	}
	eventsCausingActions: {
		setAlert: "done.invoke.openAlert"
	}
	eventsCausingDelays: {}
	eventsCausingGuards: {}
	eventsCausingServices: {
		openAlert: "OPEN"
	}
	matchesStates: "alertOpen" | "closed" | "openingAlert"
	tags: never
}
