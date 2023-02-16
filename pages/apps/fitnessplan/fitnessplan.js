import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import FitnessInputs from "../../../src/components/apps/fitnessplan/fitnessinputs";
import FitnessOutputs from "../../../src/components/apps/fitnessplan/fitnessoutputs";

import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [fitnessplan, setFitnessplan] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <FitnessInputs setFitnessplan={setFitnessplan} />
              </>
            }
            rightContent={
              <>
                <FitnessOutputs fitnessplan={fitnessplan} />
              </>
            }
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Notes;
