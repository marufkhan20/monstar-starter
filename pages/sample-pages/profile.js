import React, { useState } from "react";

import { Row, Col, Card } from "reactstrap";
import BreadCrumbs from "../../src/layouts/breadcrumbs/BreadCrumbs";
import UserProfile from "../../src/components/dashboards/classyDashboard/UserProfile";
import Timeline from "../../src/components/dashboards/classyDashboard/Timeline";

const Profile = () => {
  return (
    <>
      <BreadCrumbs />
      <Row>
        <Col xs="12" md="12" lg="4">
          <UserProfile />
        </Col>
        <Col xs="12" md="12" lg="8">
          <Timeline />
        </Col>
      </Row>
    </>
  );
};

export default Profile;
