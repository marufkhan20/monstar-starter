import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form } from "reactstrap";

export default function BookreviewInputs({ setBookreview }) {
  const [booktitle, setBooktitle] = useState("");
  const [bookauthor, setBookauthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const getBookReview = (e) => {
    e.preventDefault();
    if (!booktitle || !bookauthor) return;

    setIsLoading(true);
    axios
      .post("/api/generate-book-review", {
        booktitle,
        bookauthor,
        email: session.user?.email,
      })
      .then((res) => {
        setBookreview(res.data.data[0].text);
        setBooktitle("");
        setBookauthor("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="p-3 border-bottom">
      <Form>
        <div>
          <h1>Book Review Creator</h1>
          <h4>Enter a popular Book Title and Author and get your review!</h4>
        </div>
      </Form>
      <form onSubmit={getBookReview}>
        <label>
          Book Title:
          <input
            type="text"
            value={booktitle}
            onChange={(e) => setBooktitle(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Author:
          <input
            type="text"
            value={bookauthor}
            onChange={(e) => setBookauthor(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <button type="submit">Generate Book Review</button>
      </form>{" "}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
