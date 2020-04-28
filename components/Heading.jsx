import React from "react";
import Head from "next/head";

const Heading = ({ title }) => {
  return (
    <div className="page-heading">
      <Head>
        <title>{title} | Yummy Pizza</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>{title}</h1>
    </div>
  );
};

export default Heading;
