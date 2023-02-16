import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form } from "reactstrap";

export default function ServicecallsInputs({ setServicecall }) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [resdescription, setResdescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const getServiceCall = (e) => {
    e.preventDefault();
    if (!name || !time || !number || !description || !resdescription) return;

    setIsLoading(true);
    axios
      .post("/api/generate-service-calls", {
        name,
        time,
        number,
        description,
        resdescription,
        email: session.user?.email,
      })
      .then((res) => {
        setServicecall(res.data.data[0].text);
        setName("");
        setTime("");
        setNumber("");
        setDescription("");
        setResdescription("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="p-3 border-bottom">
      <Form>
        <div>
          <h1>Customer Service Call Creator</h1>
          <h4>
            Enter In the details of the customer and the issue to generate the
            Service Call!
          </h4>
        </div>
      </Form>
      <form onSubmit={getServiceCall}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Time:
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Number:
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Describe Issue:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Resolution Description:
          <input
            type="text"
            value={resdescription}
            onChange={(e) => setResdescription(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <button type="submit">Generate Service Call</button>
      </form>{" "}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
