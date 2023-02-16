import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form } from "reactstrap";

export default function EssayInputs({ setEssayoutline }) {
  const [essaytitle, setEssaytitle] = useState("");
  const [essaykeywords, setEssaykeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const getEssayOutline = (e) => {
    e.preventDefault();
    if (!essaytitle || !essaykeywords) return;

    setIsLoading(true);
    axios
      .post("/api/generate-essay-outline", {
        essaytitle,
        essaykeywords,
        email: session.user?.email,
      })
      .then((res) => {
        setEssayoutline(res.data.data[0].text);
        setEssaytitle("");
        setEssaykeywords("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="p-3 border-bottom">
      <Form>
        <div>
          <h1>Essay Outline Creator</h1>
          <h4>Enter in a title and some keywords to get your Essay Outline</h4>
        </div>
      </Form>
      <form onSubmit={getEssayOutline}>
        <label>
          Title:
          <input
            type="text"
            value={essaytitle}
            onChange={(e) => setEssaytitle(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Keywords:
          <input
            type="text"
            value={essaykeywords}
            onChange={(e) => setEssaykeywords(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <button type="submit">Generate Essay Outline</button>
      </form>{" "}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
