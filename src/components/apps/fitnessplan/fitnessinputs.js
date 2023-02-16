import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Form } from "reactstrap";

export default function FitnessInputs({ setFitnessplan }) {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const getFitnessPlan = (e) => {
    e.preventDefault();
    if (!age || !weight || !goal) return;

    setIsLoading(true);
    axios
      .post("/api/generate-fitness-plan", {
        age,
        weight,
        goal,
        email: session.user?.email,
      })
      .then((res) => {
        setFitnessplan(res.data.data[0].text);
        setAge("");
        setWeight("");
        setGoal("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="p-3 border-bottom">
      <Form>
        <div>
          <h1>Fitness Plan Creator</h1>
          <h4>
            Enter Your age, weight, and Goal Weight to get a customized fitness
            plan!
          </h4>
        </div>
      </Form>
      <form onSubmit={getFitnessPlan}>
        <label>
          Age:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Weight:
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <label>
          Goal:
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </label>
        <br></br>
        <br />
        <button type="submit">Generate Fitness Plan</button>
      </form>{" "}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
