import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import BookreviewInputs from "../../../src/components/apps/bookreview/bookreviewinputs";
import BookreviewOutputs from "../../../src/components/apps/bookreview/bookreviewoutputs";

import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [bookreview, setBookreview] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <BookreviewInputs setBookreview={setBookreview} />
              </>
            }
            rightContent={
              <>
                <BookreviewOutputs bookreview={bookreview} />
              </>
            }
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Notes;
