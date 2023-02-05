// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
	"@@xstate/typegen": true
	internalEvents: {
		"done.invoke.addItem": {
			type: "done.invoke.addItem"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.fetchCart": {
			type: "done.invoke.fetchCart"
			data: unknown
			__tip: "See the XState TS docs to learn how to strongly type this."
		}
		"done.invoke.passItemKey": {
			type: "done.invoke.passItemKey"
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
		"error.platform.fetchCart": { type: "error.platform.fetchCart"; data: unknown }
		"error.platform.passItemKey": { type: "error.platform.passItemKey"; data: unknown }
		"error.platform.removeItem": { type: "error.platform.removeItem"; data: unknown }
		"error.platform.updateCartItem": { type: "error.platform.updateCartItem"; data: unknown }
		"xstate.init": { type: "xstate.init" }
	}
	invokeSrcNameMap: {
		addItem: "done.invoke.addItem"
		fetchCart: "done.invoke.fetchCart"
		passItemKey: "done.invoke.passItemKey"
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
		clearItemLoading: "done.invoke.fetchCart" | "xstate.init"
		setCart: "done.invoke.fetchCart"
		setItemLoading: "done.invoke.passItemKey"
		setLoaded: "done.invoke.fetchCart" | "xstate.init"
		setLoading:
			| "ADDITEM"
			| "FETCHCART"
			| "REMOVEITEM"
			| "done.invoke.addItem"
			| "done.invoke.removeItem"
			| "done.invoke.updateCartItem"
	}
	eventsCausingDelays: {}
	eventsCausingGuards: {}
	eventsCausingServices: {
		addItem: "ADDITEM"
		fetchCart:
			| "FETCHCART"
			| "done.invoke.addItem"
			| "done.invoke.removeItem"
			| "done.invoke.updateCartItem"
		passItemKey: "UPDATEITEM"
		removeItem: "REMOVEITEM"
		updateCartItem: "done.invoke.passItemKey"
	}
	matchesStates:
		| "addingItem"
		| "cartLoaded"
		| "fetchingCart"
		| "removingItem"
		| "settingItemLoading"
		| "updatingCartItem"
	tags: never
}
