import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Input, Row, Col, Button, message, Form } from "antd";
import Router from "next/router";

import { signInWatcher, setUserError } from "../store/actions";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import Loading from "../components/Loading";

const SignIn = ({ error, user, isLoading, signInWatcher, setUserError }) => {
  const onSignIn = (values) => {
    signInWatcher(values);
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
      <Heading title="Login" />
      <div className="content-container">
        <Form onFinish={onSignIn}>
          <Row justify="center" align="center">
            <Col span={6}>
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
                  <Input placeholder="email" />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="password" />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item>
                  <Button type="primary" block htmlType="submit">
                    Sign In
                  </Button>
                </Form.Item>
              </div>
              <p
                className="form-link-label"
                onClick={() => {
                  setUserError(null);
                  Router.push("/signup");
                }}
              >
                New User? Sign Up
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
  signInWatcher,
  setUserError,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
