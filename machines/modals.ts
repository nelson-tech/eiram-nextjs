import { createMachine } from "xstate"

import type { Typegen0 } from "./modals.typegen"

interface ModalsContext {
  login: boolean
  shoppingCart: boolean
}

export const modalsMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsD2ECGAbWA6AxlqrJAMSoAOYAdgMoCWU1AktYqBcfQC72ptIQAD0QBaAIwAGSbmkAOAEwB2OQFY5ANg0AWJRoCcAGhABPRPplylkhQrniNk1ePEBmVQF8PxtJhy5YRhZqAHkqalJCYjB2EE5A3n5YkQRROwVcbQNbV205PILtYzNUvNxxBX0lXPzavM8vY2p0OFjfbDwokghY+J4+AVAUiTtM1W1xyYnp4rFx3A1K63FVVQ11cW1XRpB2-0CmVjCaXq5EweExdMzshRqC-KLTRBXLawVtSrX9CrUdvfggj652SYlckg0N30OQehVmqQqSgWlR0VQM4j0bi8XiAA */
  createMachine({
    context: { login: false, shoppingCart: false } as ModalsContext,
    tsTypes: {} as import("./modals.typegen").Typegen0,
    id: "modals",
    initial: "closed",
    predictableActionArguments: true,
    states: {
      closed: {
        on: {
          openLogIn: {
            target: "loginOpen",
          },
          openShoppingCart: {
            target: "shoppingCartOpen",
          },
          openMobileMenu: {
            target: "mobileMenuOpen",
          },
        },
      },
      loginOpen: {
        on: {
          close: {
            target: "closed",
          },
        },
      },
      shoppingCartOpen: {
        on: {
          close: {
            target: "closed",
          },
        },
      },
      mobileMenuOpen: {
        on: {
          close: {
            target: "closed",
          },
        },
      },
    },
  })
