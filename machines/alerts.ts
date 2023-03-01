import { assign, createMachine } from "xstate"

import type { Typegen0 } from "./alerts.typegen"

interface AlertsContext {
  login: boolean
  shoppingCart: boolean
}

const defaultState: AlertState = {
  primary: "",
  secondary: "",
  kind: "success",
  timeout: 2000,
}

export const alertsMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsD2ECGAbWA6AxlqrJAMSoAOYAdgMoCWU1AktYqBcfQC72ptIQAD0QBaAIwAGSbmkAOAEwB2OQFY5ANg0AWJRoCcAGhABPRPplylkhQrniNk1ePEBmVQF8PxtJhy5YRhZqAHkqalJCYjB2EE5A3n5YkQRROwVcbQNbV205PILtYzNUvNxxBX0lXPzavM8vY2p0OFjfbDwokghY+J4+AVAUiTtM1W1xyYnp4rFx3A1K63FVVQ11cW1XRpB2-0CmVjCaXq5EweExdMzshRqC-KLTRBXLawVtSrX9CrUdvfggj652SYlckg0N30OQehVmqQqSgWlR0VQM4j0bi8XiAA */
  createMachine(
    {
      context: defaultState,
      tsTypes: {} as import("./alerts.typegen").Typegen0,
      id: "alerts",
      initial: "closed",
      predictableActionArguments: true,
      states: {
        closed: {
          on: {
            OPEN: {
              target: "openingAlert",
            },
          },
        },
        alertOpen: {
          on: {
            OPEN: {
              target: "openingAlert", // Allows for overriding already open alert
            },
            CLOSE: {
              target: "closed",
            },
          },
        },
        openingAlert: {
          invoke: {
            src: "openAlert",
            id: "openAlert",
            onDone: [{ actions: ["setAlert"], target: "alertOpen" }],
          },
        },
      },
      schema: {
        services: {} as {
          openAlert: {
            data: AlertState
          }
        },
      },
    },
    {
      actions: {
        setAlert: assign((ctx, { data }) => {
          return { ...defaultState, ...data }
        }),
      },
      services: {
        openAlert: async (ctx, event: AlertState) => {
          return event
        },
      },
    }
  )
