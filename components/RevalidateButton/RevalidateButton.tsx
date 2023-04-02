"use client"

import getClient from "@api/client"
import { GetViewerDocument } from "@api/codegen/graphql"
import Modal from "components/Modal"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const RevalidateButton = () => {
  const client = getClient()
  const path = usePathname()

  const [admin, setAdmin] = useState(false)
  const [key, setKey] = useState("")
  const [checked, setChecked] = useState(false)
  const [formShowing, setFormShowing] = useState(false)
  const [response, setResponse] = useState<any>()

  useEffect(() => {
    if (client && !checked) {
      client.request(GetViewerDocument).then((data) => {
        if (data.viewer?.roles?.nodes) {
          data.viewer.roles.nodes.map((role) => {
            role.name === "administrator" && setAdmin(true)
          })
        }
      })
      setChecked(true)
    }
  }, [client, setAdmin, checked, setChecked])

  return admin ? (
    <>
      <div
        className="fixed w-8 h-8 bottom-0 left-0 ml-6 mb-6 group rounded-full overflow-hidden animate-[pulse_2s_ease-in-out_infinite]"
        title="Scroll to top"
        onClick={() => setFormShowing(true)}
      >
        <div className="w-full h-full flex justify-center items-center cursor-pointer transition-all bg-gray-300 group-hover:bg-accent">
          <div className="h-6 w-6 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </div>
      </div>
      <Modal
        open={formShowing}
        closeModal={() => setFormShowing(false)}
        panelStyle="rounded-md"
      >
        <div className="">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              console.log("Form", key, path)
              fetch("/api/revalidate", {
                method: "POST",
                body: JSON.stringify({ path, key }),
              }).then(async (r) => {
                const text = await r.text()
                try {
                  const json = JSON.parse(text)
                  if (json.revalidated) {
                    setResponse("Success")
                  } else {
                    setResponse(json.message)
                  }
                } catch (error) {
                  setResponse(text)
                }
              })
            }}
          >
            <label>Revalidation key: </label>
            <input
              className="form-input rounded block mt-4 focus:border-highlight"
              name="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <button
              type="submit"
              className="w-full text-center bg-accent text-white hover:bg-highlight p-4 rounded-sm block mt-4"
            >
              Revalidate
            </button>
          </form>
          <div className="block p-4 text-center">{response}</div>
        </div>
      </Modal>
    </>
  ) : (
    <></>
  )
}

export default RevalidateButton
