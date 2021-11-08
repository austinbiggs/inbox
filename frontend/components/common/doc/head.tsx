import * as React from "react";
import Head from "next/head";

const DocHead: React.FC = () => {
  return (
    <Head>
      <title>Inbox by Austin Biggs</title>
      <meta name="description" content="Inbox by Austin Biggs" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export { DocHead };
