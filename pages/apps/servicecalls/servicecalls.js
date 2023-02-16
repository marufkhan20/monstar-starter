import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import ServicecallsInputs from "../../../src/components/apps/servicecalls/servicecallsinputs";
import ServicecallsOutputs from "../../../src/components/apps/servicecalls/servicecallsoutputs";

import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [servicecall, setServicecall] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <ServicecallsInputs setServicecall={setServicecall} />
              </>
            }
            rightContent={
              <>
                <ServicecallsOutputs servicecall={servicecall} />
              </>
            }
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Notes;
