import {
	AddToCartInput,
	RemoveItemsFromCartInput,
	UpdateItemQuantitiesInput,
} from "@api/codegen/graphql"

export type AddToCartEventType = {
	input: AddToCartInput
	callback: () => void
}

export type UpdateCartItemEventType = { input: UpdateItemQuantitiesInput }

export type RemoveCartItemEventType = { input: RemoveItemsFromCartInput }
