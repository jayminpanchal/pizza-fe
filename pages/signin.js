import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input, Row, Col, Button, message } from "antd";
import Router from "next/router";

import { signInWatcher, setUserError } from "../store/actions";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const SignIn = ({ error, user, isLoading, signInWatcher, setUserError }) => {
  const [email, setEmail] = useState("jayminpanchal10@gmail.com");
  const [password, setPassword] = useState("123123");

  const onSignIn = () => {
    signInWatcher({ email, password });
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
      <div className="content-container">
        <Row justify="center" align="center">
          <Col span={6}>
            <div className="form-group">
              <Input
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <Button type="primary" onClick={onSignIn} block>
                Sign In
              </Button>
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
