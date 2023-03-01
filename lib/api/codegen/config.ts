import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_URL,
  documents: ["lib/api/gql/**/*.ts", "lib/api/gql/**/*.gql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "lib/api/codegen/": {
      preset: "client",
      presetConfig: {
        dedupeFragments: true,
        fragmentMasking: false,
        nonOptionalTypename: true,
        enumsAsTypes: true,
      },
    },
  },
}

export default config
