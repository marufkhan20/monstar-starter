import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form } from "reactstrap";

export default function SocialmediaInputs({ setSocialmedia }) {
  const [subject, setSubject] = useState("");
  const [keywords, setKeywords] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const getSocialMedia = (e) => {
    e.preventDefault();
    if (!subject || !keywords || !hashtags) return;

    setIsLoading(true);
    axios
      .post("/api/generate-social-media", {
        subject,
        keywords,
        hashtags,
        email: session.user?.email,
      })
      .then((res) => {
        setSocialmedia(res.data.data[0].text);
        setSubject("");
        setKeywords("");
        setHashtags("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="p-3 border-bottom">
      <Form>
        <div>
          <h1>Social Media Post Creator</h1>
          <h4>
            Enter the subject, keywords, and hastags, and get your perfect post!
          </h4>
        </div>
      </Form>
      <form onSubmit={getSocialMedia}>
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
        <label>
          Hashtags:
          <input
            type="text"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <button type="submit">Generate Social Media Post</button>
      </form>{" "}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
