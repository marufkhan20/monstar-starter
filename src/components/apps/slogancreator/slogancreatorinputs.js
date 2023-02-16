import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form } from "reactstrap";

export default function SlogancreatorInputs({ setSlogan }) {
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const getSlogan = (e) => {
    e.preventDefault();
    if (!brand || !product) return;

    setIsLoading(true);
    axios
      .post("/api/generate-slogan-creator", {
        brand,
        product,
        email: session.user?.email,
      })
      .then((res) => {
        setSlogan(res.data.data[0].text);
        setBrand("");
        setProduct("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="p-3 border-bottom">
      <Form>
        <div>
          <h1>Brand Slogan Creator</h1>
          <h4>Enter brand and product to recieve a slogan for your brand!</h4>
        </div>
      </Form>
      <form>
        <label>
          Brand or Make:
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Product or Model:
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <button onClick={getSlogan}>Submit</button>
      </form>{" "}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
