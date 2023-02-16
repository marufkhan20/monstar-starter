import { useState } from "react";
import { Card, CardBody } from "reactstrap";

import ProductreviewInputs from "../../../src/components/apps/productreview/productreviewinputs";
import ProductreviewOutputs from "../../../src/components/apps/productreview/productreviewoutputs";

import TwoColumn from "../../../src/components/twoColumn/TwoColumn";

const Notes = () => {
  const [productreview, setProductreview] = useState("");
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <ProductreviewInputs setProductreview={setProductreview} />
              </>
            }
            rightContent={
              <>
                <ProductreviewOutputs productreview={productreview} />
              </>
            }
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Notes;
