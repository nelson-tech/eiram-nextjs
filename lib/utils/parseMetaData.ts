import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import type { TemplateString } from "next/dist/lib/metadata/types/metadata-types"
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

import type {
  RankMathPostTypeSeo,
  RankMathProductTypeSeo,
} from "@api/codegen/graphql"

const parseMetaData = (
  seo: RankMathPostTypeSeo | RankMathProductTypeSeo,
  title?: string
) => {
  const metaData: Metadata = {
    title: title ?? seo?.title,
    description: seo?.description,
    keywords: seo?.focusKeywords as string[] | null | undefined,
    openGraph: {
      ...(seo?.openGraph as OpenGraph),
      title: seo?.openGraph?.title as unknown as TemplateString,
      type: "website" as any,
    },
  }

  return metaData
}

export default parseMetaData
