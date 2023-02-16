import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form } from "reactstrap";

export default function EventemailInputs({ setEventemail }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [agenda, setAgenda] = useState("");
  const [attendees, setAttendees] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const getEventEmail = (e) => {
    e.preventDefault();
    if (!title || !date || !location || !agenda || !attendees) return;

    setIsLoading(true);
    axios
      .post("/api/generate-event-email", {
        title,
        date,
        location,
        agenda,
        attendees,
        email: session.user?.email,
      })
      .then((res) => {
        setEventemail(res.data.data[0].text);
        setTitle("");
        setDate("");
        setLocation("");
        setAgenda("");
        setAttendees("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="p-3 border-bottom">
      <Form>
        <div>
          <h1>Groupt Event Email Creator</h1>
          <h4>
            Enter In the details of the event and the email will be generated!
          </h4>
        </div>
      </Form>
      <form onSubmit={getEventEmail}>
        <label>
          Event Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Date:
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Agenda Topics:
          <input
            type="text"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Attendees:
          <input
            type="text"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <button type="submit">Generate Event Email</button>
      </form>{" "}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
