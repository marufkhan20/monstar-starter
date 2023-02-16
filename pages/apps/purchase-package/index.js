import { getSession } from "next-auth/react";
import { checkout } from "../../../src/lib/checkout";

const PurchasePackage = () => {
  return (
    <div className="flex items-center justify-center h-full flex-col">
      <h2 className="purchase-heading">Purchase Plan</h2>
      <div className="grid grid-cols-3 gap-30 w-70 ">
        <div className="package-box">
          <h3>Silver Plan</h3>
          <ul>
            <li>10K Tokens / Mo</li>
            <li>$14.99</li>
          </ul>
          {/* <a href="https://buy.stripe.com/14k6q12DP2eafIYcMM">Buy Now</a> */}
          <button
            onClick={() =>
              checkout({
                lineItems: [
                  {
                    price: "price_1Mbp12DyXoZGMmKwe2fX4pYJ",
                    quantity: 1,
                  },
                ],
              })
            }
          >
            Buy Now
          </button>
        </div>
        <div className="package-box">
          <h3>Add More Tokens</h3>
          <ul>
            <li>5K Tokens / Mo</li>
            <li>$6.99</li>
          </ul>
          <a href="https://buy.stripe.com/14kdSt4LX9GC1S8eUW">Buy Now</a>
        </div>
        <div className="package-box">
          <h3>Gold Plan</h3>
          <ul>
            <li>20K Tokens / Mo</li>
            <li>$24.99</li>
          </ul>
          <a href="https://buy.stripe.com/bIY4hTdit6uq0O48wx">Buy Now</a>
        </div>
      </div>
    </div>
  );
};

export default PurchasePackage;

export async function getServerSideProps({ req }) {
  const session = await getSession({
    req,
  });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/loginformik",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
