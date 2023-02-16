import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form } from "reactstrap";

export default function MoviescriptInputs({ setMoviescript }) {
  const [movietitle, setMovietitle] = useState("");
  const [writer, setWriter] = useState("");
  const [locations, setLocations] = useState("");
  const [characters, setCharacters] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const getMovieScript = (e) => {
    e.preventDefault();
    if (!movietitle || !writer || !locations || !characters) return;

    setIsLoading(true);
    axios
      .post("/api/generate-movie-script", {
        movietitle,
        writer,
        locations,
        characters,
        email: session.user?.email,
      })
      .then((res) => {
        setMoviescript(res.data.data[0].text);
        setMovietitle("");
        setWriter("");
        setLocations("");
        setCharacters("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="p-3 border-bottom">
      <Form>
        <div>
          <h1>Movie Script Creator</h1>
          <h4>
            Enter in the Title, Writer, Characters, and Scene Locations to get
            your Movie Script!
          </h4>
        </div>
      </Form>
      <form onSubmit={getMovieScript}>
        <label>
          Movie Title:
          <input
            type="text"
            value={movietitle}
            onChange={(e) => setMovietitle(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Writer:
          <input
            type="text"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Locations:
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Characters:
          <input
            type="text"
            value={characters}
            onChange={(e) => setCharacters(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <button type="submit">Generate Movie Script</button>
      </form>{" "}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
