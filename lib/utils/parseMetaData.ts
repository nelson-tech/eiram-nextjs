import { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { TemplateString } from "next/dist/lib/metadata/types/metadata-types"

import { RankMathPostTypeSeo, RankMathProductTypeSeo } from "@api/codegen/graphql"

const parseMetaData = (seo: RankMathPostTypeSeo | RankMathProductTypeSeo, title?: string) => {
	const metaData: Metadata = {
		title: title ?? seo?.title,
		description: seo?.description,
		keywords: seo?.focusKeywords,
		openGraph: {
			...seo?.openGraph,
			title: seo?.openGraph?.title as unknown as TemplateString,
			type: "website",
		},
	}

	return metaData
}

export default parseMetaData
