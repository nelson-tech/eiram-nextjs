// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
	"@@xstate/typegen": true
	internalEvents: {
		"done.invoke.addItem": {
			type: "done.invoke.addItem"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.clearCart": {
			type: "done.invoke.clearCart"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.fetchCart": {
			type: "done.invoke.fetchCart"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.passRemoveKey": {
			type: "done.invoke.passRemoveKey"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.passUpdateKey": {
			type: "done.invoke.passUpdateKey"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.removeItem": {
			type: "done.invoke.removeItem"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.updateCartItem": {
			type: "done.invoke.updateCartItem"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"error.platform.addItem": { type: "error.platform.addItem"; data: unknown }
		"error.platform.clearCart": { type: "error.platform.clearCart"; data: unknown }
		"error.platform.fetchCart": { type: "error.platform.fetchCart"; data: unknown }
		"error.platform.passRemoveKey": { type: "error.platform.passRemoveKey"; data: unknown }
		"error.platform.passUpdateKey": { type: "error.platform.passUpdateKey"; data: unknown }
		"error.platform.removeItem": { type: "error.platform.removeItem"; data: unknown }
		"error.platform.updateCartItem": { type: "error.platform.updateCartItem"; data: unknown }
		"xstate.init": { type: "xstate.init" }
	}
	invokeSrcNameMap: {
		addItem: "done.invoke.addItem"
		clearCart: "done.invoke.clearCart"
		fetchCart: "done.invoke.fetchCart"
		passRemoveKey: "done.invoke.passRemoveKey"
		passUpdateKey: "done.invoke.passUpdateKey"
		removeItem: "done.invoke.removeItem"
		updateCartItem: "done.invoke.updateCartItem"
	}
	missingImplementations: {
		actions: never
		delays: never
		guards: never
		services: never
	}
	eventsCausingActions: {
		clearRemoveLoading: "done.invoke.removeItem"
		clearUpdateLoading: "done.invoke.updateCartItem"
		setCart:
			| "done.invoke.addItem"
			| "done.invoke.clearCart"
			| "done.invoke.fetchCart"
			| "done.invoke.removeItem"
			| "done.invoke.updateCartItem"
		setLoaded:
			| "done.invoke.addItem"
			| "done.invoke.clearCart"
			| "done.invoke.fetchCart"
			| "done.invoke.removeItem"
			| "done.invoke.updateCartItem"
			| "xstate.init"
		setLoading: "ADDITEM" | "CLEARCART" | "FETCHCART" | "error.platform.clearCart"
		setRemoveLoading: "done.invoke.passRemoveKey"
		setUpdateLoading: "done.invoke.passUpdateKey"
	}
	eventsCausingDelays: {}
	eventsCausingGuards: {}
	eventsCausingServices: {
		addItem: "ADDITEM"
		clearCart: "CLEARCART"
		fetchCart: "FETCHCART" | "error.platform.clearCart"
		passRemoveKey: "REMOVEITEM"
		passUpdateKey: "UPDATEITEM"
		removeItem: "done.invoke.passRemoveKey"
		updateCartItem: "done.invoke.passUpdateKey"
	}
	matchesStates:
		| "addingItem"
		| "cartLoaded"
		| "clearingCart"
		| "fetchingCart"
		| "removingItem"
		| "settingRemoveLoading"
		| "settingUpdateLoading"
		| "updatingCartItem"
	tags: never
}
