import type { Metadata } from "next/types"
import type { ImageProps } from "next/image"
import parse, { attributesToProps } from "html-react-parser"
import { HTMLReactParserOptions, Element } from "html-react-parser"

import getClient from "@api/client"
import { GetPageSlugsDocument } from "@api/codegen/graphql"
import type { RankMathPostTypeSeo } from "@api/codegen/graphql"
import getPageBySlug from "@lib/server/getPageBySlug"
import parseMetaData from "@lib/utils/parseMetaData"

import Link from "components/Link"
import Image from "components/Image"

type OtherPageParamsType = { params: { slug: string } }

const OtherPage = async ({ params }: OtherPageParamsType) => {
  const pageData = await getPageBySlug(params?.slug)

  const options: HTMLReactParserOptions = {
    replace: item => {
      if (item instanceof Element && item.name === "img") {
        const { loading, ...props } = attributesToProps(
          item.attribs,
        ) as unknown as ImageProps

        return <Image {...{ ...props, alt: props.alt ?? "" }} priority />
      }
    },
  }

  return (
    <div className="sm:px-16 py-8 max-w-7xl mx-auto text-gray-900">
      <h2 className="text-4xl font-bold tracking-wide pb-8 text-center">
        {pageData?.title ?? "Oops..."}
      </h2>
      {pageData?.content ? (
        <div className="wp-container">{parse(pageData.content, options)}</div>
      ) : (
        <div className="text-center">
          <p>The page requested could not be found.</p>
          <p>
            Click{" "}
            <Link
              href="/"
              className="underline text-accent hover:text-highlight"
            >
              here
            </Link>{" "}
            to go to the homepage, or{" "}
            <Link
              href="/shop"
              className="underline text-accent hover:text-highlight"
            >
              visit our shop
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  )
}

export const revalidate = 60 // revalidate this page every 60 seconds

export default OtherPage

export async function generateStaticParams() {
  const client = getClient()

  const data = await client.request(GetPageSlugsDocument)

  return (
    data?.pages?.nodes?.map(page => ({
      slug: page.slug,
    })) ?? []
  )
}

export async function generateMetadata({
  params,
}: OtherPageParamsType): Promise<Metadata> {
  const pageData = await getPageBySlug(params?.slug)

  const seo = pageData?.seo || null

  const metaData = parseMetaData(seo as RankMathPostTypeSeo)

  return metaData
}
