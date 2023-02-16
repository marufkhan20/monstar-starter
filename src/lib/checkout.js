import { loadStripe } from "@stripe/stripe-js";

export async function checkout({ lineItems }) {
  let stripePromise = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        "pk_live_51MQxQcDyXoZGMmKwp2zEVUdMVTzJl6bewthLzVHswEoHSP8hHbtmPm1xKUg13BhBik5HJqJtA77qn7gdH8VdKACb00iHnU1Bh1"
      );
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
}
