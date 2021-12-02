import styles from "../styles/home.module.scss";

import { DocHead } from "../frontend/components/common/doc/head";
import { Inbox } from "../frontend/components/inbox";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import * as React from "react";

const Home = () => {
  return (
    <>
      <DocHead />

      <Container className={styles.container}>
        <Row>
          <Col></Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className={styles.title}>
              <Image
                src="/logo/logo.svg"
                alt="Logo"
                width={60}
                height={60}
                layout="fixed"
                priority
              />
              <h1>Messenger</h1>
            </div>

            <Inbox />
          </Col>
          <Col></Col>
        </Row>
      </Container>
      {/*<div className={styles.container}>*/}
      {/*  <main className={styles.main}>*/}
      {/*    <h1 className={styles.title}>Messenger</h1>*/}

      {/*    <Inbox />*/}
      {/*  </main>*/}
      {/*</div>*/}
    </>
  );
};

export default Home;
