import { Stripe, loadStripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null>
const getStripe = () => {
  if (!stripePromise) {
    const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY

    stripePromise = loadStripe(stripePublicKey ?? "")
  }
  return stripePromise
}

export default getStripe
