import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import RecruiterresponseInputs from "../../../src/components/apps/recruiterresponse/recruiterresponseinputs";

import RecruiterresponseOutputs from "../../../src/components/apps/recruiterresponse/recruiterresponseoutputs";

import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [recruiterresponse, setRecruiterresponse] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <RecruiterresponseInputs
                  setRecruiterresponse={setRecruiterresponse}
                />
              </>
            }
            rightContent={
              <>
                <RecruiterresponseOutputs
                  recruiterresponse={recruiterresponse}
                />
              </>
            }
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Notes;
