"use client"

import { Fragment, useEffect } from "react"
import { Transition } from "@headlessui/react"

import { ErrorAlert, InfoAlert, SuccessAlert, WarningAlert } from "./Alert"

import useAlerts from "@lib/hooks/useAlerts"

// ####
// #### Component
// ####

const Alerts = () => {
  const { context: alert, matches, send, openAlert } = useAlerts()

  const onClose = () => {
    send("CLOSE")
  }

  useEffect(() => {
    if (matches("alertOpen")) {
      setTimeout(() => {
        onClose()
      }, alert.timeout)
    }
  })

  return (
    <div
      aria-live="assertive"
      className="fixed z-50 inset-0 flex px-4 py-6 pointer-events-none sm:p-6 items-start"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={matches("alertOpen")}
          as={Fragment}
          enter="transition ease-out duration-500"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-500"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          // className="fixed right-0 top-0 pr-8 w-fit z-50"
        >
          <div
            className={`${
              alert.kind === "info"
                ? `bg-gray-50 text-green-600`
                : alert.kind === "success"
                ? `bg-green-50 text-green-600`
                : alert.kind === "error"
                ? `bg-red-50 text-red-main`
                : alert.kind === "warning"
                ? `bg-yellow-50 text-yellow-700`
                : ""
            } relative my-2 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto overflow-hidden`}
            role="alert"
          >
            {alert.kind === "info" && (
              <InfoAlert
                primary={alert.primary}
                secondary={alert.secondary}
                kind={alert.kind}
                onClose={() => onClose()}
              />
            )}
            {alert.kind === "success" && (
              <SuccessAlert
                primary={alert.primary}
                secondary={alert.secondary}
                kind={alert.kind}
                onClose={() => onClose()}
              />
            )}
            {alert.kind === "error" && (
              <ErrorAlert
                primary={alert.primary}
                secondary={alert.secondary}
                kind={alert.kind}
                onClose={() => onClose()}
              />
            )}
            {alert.kind === "warning" && (
              <WarningAlert
                primary={alert.primary}
                secondary={alert.secondary}
                kind={alert.kind}
                onClose={() => onClose()}
              />
            )}
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default Alerts
