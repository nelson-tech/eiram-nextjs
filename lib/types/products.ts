import {
  ProductVariation,
  SimpleProduct,
  VariableProduct,
} from "@api/codegen/graphql"

export type AttributeType = {
  name: string | null | undefined
  id: string
  variations: ProductVariation[]
}

export type FullProduct = SimpleProduct & VariableProduct
