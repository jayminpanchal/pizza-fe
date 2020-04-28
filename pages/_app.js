import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";

import { configureStore } from "../store";
import "antd/dist/antd.css";
import "../css/app.css";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
      },
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}

export default withRedux(configureStore)(MyApp);
