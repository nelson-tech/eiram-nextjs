import type { NextApiHandler } from "next/types"

const Revalidate: NextApiHandler = async (req, res) => {
  const body = await req.body
  let data: { key: string; path: string } | null
  try {
    data = JSON.parse(body)
  } catch (error) {
    data = null
  }

  // Check for secret to confirm this is a valid request
  if (data?.key !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" })
  }

  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    if (data?.path) {
      await res.revalidate(data?.path)
      return res.json({ revalidated: true })
    }
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating")
  }
}

export default Revalidate
