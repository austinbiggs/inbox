import styles from "../styles/home.module.scss";

import { DocHead } from "../frontend/components/common/doc/head";
import { Inbox } from "../frontend/components/inbox";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import * as React from "react";
import { GetServerSideProps } from "next";
import { gql } from "@apollo/client";
import { client } from "../frontend/gql/client/index";
import { ThreadData } from "components/inbox/types";

interface Props {
  threadData: ThreadData[];
}

const Home = ({ threadData }: Props) => {
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

            <Inbox threadData={threadData} />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query GetThreads {
        threads {
          created_by
          id
          messages {
            body
            created_at
            created_by
            id
            user {
              id
              image_url
              name
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      threadData: data.threads,
    } as Props,
  };
};

export default Home;
