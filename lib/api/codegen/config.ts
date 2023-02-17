import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_URL,
  documents: ["lib/api/gql/**/*.ts", "lib/api/gql/**/*.gql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "lib/api/codegen/": {
      config: { dedupeFragments: true, fragmentMasking: false },
      preset: "gql-tag-operations-preset",
      plugins: [],
    },
    // "lib/api/codegen/schema.ts": {
    //   plugins: ["typescript", "typescript-operations"],
    // },
    // "lib/api/codegen/graphql.ts": {
    //   plugins: [
    //     "typescript",
    //     "typescript-operations",
    //     "typescript-graphql-request",
    //   ],
    //   config: {
    //     rawRequest: true,
    //   },
    // },
  },
}

export default config
