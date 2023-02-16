import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form } from "reactstrap";

export default function RecruiterresponseInputs({ setRecruiterresponse }) {
  const [name, setName] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [interested, setInterested] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const getRecruiterresponse = (e) => {
    e.preventDefault();
    if (!name || !jobtitle || !interested || !contact) return;

    setIsLoading(true);
    axios
      .post("/api/generate-recruiter-response", {
        name,
        jobtitle,
        interested,
        contact,
        email: session.user?.email,
      })
      .then((res) => {
        setRecruiterresponse(res.data.data[0].text);
        setName("");
        setJobtitle("");
        setInterested("");
        setContact("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="p-3 border-bottom">
      <Form>
        <div>
          <h1>Recruiter Response Email Creator</h1>
          <h4>
            Enter a Recruiter Name, Job Title, Interest, and Contact Info and
            get your response!
          </h4>
        </div>
      </Form>
      <form onSubmit={getRecruiterresponse}>
        <label>
          Recruiter Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Job Title:
          <input
            type="text"
            value={jobtitle}
            onChange={(e) => setJobtitle(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Interested - Yes or No:
          <input
            type="text"
            value={interested}
            onChange={(e) => setInterested(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Contact Info - Phone or Email:
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <button type="submit">Generate Recruiter Response Email</button>
      </form>{" "}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
