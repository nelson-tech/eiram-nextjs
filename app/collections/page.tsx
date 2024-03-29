import getCollections from "@lib/server/getCollections"
import { SEO_TITLE } from "@lib/constants"

import Link from "components/Link"
import Image from "components/Image"

const CollectionsPage = async () => {
  const collections = await getCollections()

  return (
    <div className="max-w-7xl m-auto p-8 mb-8">
      {collections && collections.length > 0 && (
        <>
          {" "}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 tracking-wide">
              Collections
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2 md:mx-8 lg:mx-16 mt-12">
            {collections.map((collection) => {
              const coverImage = collection.gallery?.media?.coverimage

              if (coverImage?.sourceUrl)
                return (
                  <div
                    key={collection.id}
                    className="relative mx-auto cursor-pointer group w-full rounded-lg overflow-hidden"
                    style={{ height: "600px" }}
                    title={collection?.title ?? ""}
                  >
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="absolute  w-full h-full"
                    >
                      <Image
                        src={coverImage.sourceUrl}
                        alt={coverImage.altText ?? ""}
                        priority
                        width={464}
                        height={550}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden z-10">
                        <div className="flex items-center w-full h-full bg-black bg-opacity-80 opacity-0 group-hover:opacity-80 transition-all">
                          <div
                            className="border border-white my-auto w-full mx-8 flex justify-center items-center"
                            style={{ height: "550px" }}
                          >
                            <h2 className="text-white text-4xl text-center uppercase">
                              {collection?.title}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default CollectionsPage

export const revalidate = 60 // revalidate this page every 60 seconds

export const metadata = {
  title: `Collections ${SEO_TITLE}`,
  description:
    "Curated collections of innovative knitwear designs worn by various models in various locations.",
  keywords: [
    "Collections",
    "Seasonal",
    "Fashion",
    "Eiram",
    "Knitwear",
    "Wool",
    "Fashion",
  ],
}
