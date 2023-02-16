import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";

import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import RightBg from "../../src/assets/images/bg/login-bg-right.svg";
import LeftBg from "../../src/assets/images/bg/login-bgleft.svg";
import AuthLogo from "../../src/layouts/logo/AuthLogo";

const RegisterFormik = () => {
  const initialValues = {
    UserName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const navigate = useRouter();

  const validationSchema = Yup.object().shape({
    UserName: Yup.string().required("UserName is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
  });

  // handle submit
  const submitHandler = async (values) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch(`http://localhost:3000/api/auth/register`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate.push(`http://localhost:3000/auth/loginformik`);
        }
      });
  };

  return (
    <div className="loginBox">
      <div className="position-absolute start-0 bottom-0">
        <Image src={LeftBg} alt="left" />
      </div>
      <div className="position-absolute end-0 top">
        <Image src={RightBg} alt="right" />
      </div>
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            <Card>
              <CardBody className="p-4 m-1">
                <h4 className="mb-0 fw-bold">Register</h4>
                <small className="pb-4 d-block">
                  Already have an account?{" "}
                  <Link href="/auth/loginformik">Login</Link>
                </small>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(fields) => {
                    // eslint-disable-next-line no-alert
                    submitHandler(fields);
                  }}
                  render={({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="firstName">User Name</Label>
                        <Field
                          name="UserName"
                          type="text"
                          className={`form-control ${
                            errors.UserName && touched.UserName
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="UserName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control${
                            errors.email && touched.email ? " is-invalid" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${
                            errors.password && touched.password
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                        <Field
                          name="confirmPassword"
                          type="password"
                          className={`form-control${
                            errors.confirmPassword && touched.confirmPassword
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup inline className="form-check">
                        <Field
                          type="checkbox"
                          name="acceptTerms"
                          id="acceptTerms"
                          className={`form-check-input ${
                            errors.acceptTerms && touched.acceptTerms
                              ? " is-invalid"
                              : ""
                          }`}
                        />
                        <Label
                          htmlFor="acceptTerms"
                          className="form-check-label"
                        >
                          Accept Terms & Conditions
                        </Label>
                        <ErrorMessage
                          name="acceptTerms"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2">
                          Register
                        </Button>
                        <Button type="reset" color="secondary">
                          Reset
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
                <div>
                  <button className="google-btn">
                    <FcGoogle />
                    <span>Sign Up with Google</span>
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

RegisterFormik.layout = "Blank";

export default RegisterFormik;

export async function getServerSideProps({ req }) {
  const session = await getSession({
    req,
  });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}