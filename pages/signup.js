import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Input, Row, Col, Button, message, Form } from "antd";
import Router from "next/router";

import { signUpWatcher, setUserError } from "../store/actions";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import Loading from "../components/Loading";

const SignIn = ({ error, user, isLoading, signUpWatcher, setUserError }) => {
  const onSignUp = (values) => {
    signUpWatcher(values);
  };

  useEffect(() => {
    if (!error) return;
    message.error(error);
  }, [error]);

  useEffect(() => {
    if (!user) return;
    Router.push("/");
  }, [user]);

  useEffect(() => {
    setUserError(null);
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Heading title="Register" />
      <div className="content-container">
        <Form onFinish={onSignUp}>
          <Row justify="center" align="center">
            <Col span={6}>
              <div className="form-group">
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="E-mail" />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </div>
              <div className="form-group">
                <Button type="primary" htmlType="submit" block>
                  Sign Up
                </Button>
              </div>
              <p
                className="form-link-label"
                onClick={() => {
                  setUserError(null);
                  Router.push("/signin");
                }}
              >
                Existing User? Sign In
              </p>
            </Col>
          </Row>
        </Form>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.loaderReducer.loader,
    error: state.authReducer.error,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = {
  signUpWatcher,
  setUserError,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
