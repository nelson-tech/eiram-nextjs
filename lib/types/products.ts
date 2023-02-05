import { ProductVariation } from "@api/codegen/graphql"

export type AttributeType = {
	name: string | null | undefined
	id: string
	variations: ProductVariation[]
}
