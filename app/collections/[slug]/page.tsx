import type { Metadata } from "next/types"

import type { RankMathPostTypeSeo } from "@api/codegen/graphql"
import getCollectionBySlug from "@lib/server/getCollectionBySlug"
import getCollections from "@lib/server/getCollections"
import parseMetaData from "@lib/utils/parseMetaData"

import Collection from "components/Collection"

type CollectionPageParamsType = { params: { slug: string } }

const CollectionPage = async ({ params }: CollectionPageParamsType) => {
  const collection = await getCollectionBySlug(params.slug)

  return collection ? (
    <Collection collection={collection} />
  ) : (
    <>
      <div />
    </>
  )
}

export default CollectionPage

export const revalidate = 60 // revalidate this page every 60 seconds

export async function generateStaticParams() {
  const collections = await getCollections()

  return (
    collections?.map((collection) => ({
      slug: collection.slug,
    })) ?? []
  )
}

export async function generateMetadata({
  params,
}: CollectionPageParamsType): Promise<Metadata> {
  const collection = params?.slug
    ? await getCollectionBySlug(params.slug)
    : null

  const metaData = parseMetaData(
    collection?.seo as RankMathPostTypeSeo,
    collection?.title ?? undefined
  )

  return metaData
}
