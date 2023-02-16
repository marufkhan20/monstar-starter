import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form } from "reactstrap";

export default function ProductreviewInputs({ setProductreview }) {
  const [product, setProduct] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const getProductReview = (e) => {
    e.preventDefault();
    if (!product || !keywords) return;

    setIsLoading(true);
    axios
      .post("/api/generate-product-review", {
        product,
        keywords,
        email: session.user?.email,
      })
      .then((res) => {
        setProductreview(res.data.data[0].text);
        setProduct("");
        setKeywords("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="p-3 border-bottom">
      <Form>
        <div>
          <h1>Product Review Creator</h1>
          <h4>Enter a popular Product and Keywords and get your review!</h4>
        </div>
      </Form>
      <form onSubmit={getProductReview}>
        <label>
          Product:
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Keywords:
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <button type="submit">Generate Product Review</button>
      </form>{" "}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
