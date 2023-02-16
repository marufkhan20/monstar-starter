import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

export default function Home({ fitnessplan }) {
  return (
    <>
      <div className="p-3 border-bottom">
        <Form>
          <div>
            <h2>AI Generated Fitness Plan:</h2>
          </div>
        </Form>
      </div>
      {fitnessplan && <div className="p-3">{fitnessplan}</div>}
    </>
  );
}
