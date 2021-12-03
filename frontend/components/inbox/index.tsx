import * as React from "react";
import { Col, Row } from "react-bootstrap";

import { MessagesContainer } from "./messages-container";
import { Threads } from "./threads";
import styles from "./styles.module.scss";
import { ThreadData } from "./types";
import { makeVar } from "@apollo/client";

interface Props {
  threadData: ThreadData[];
}

export const selectedThreadVar = makeVar<number | null>(null);

const Inbox = ({ threadData }: Props): JSX.Element => {
  return (
    <div className={styles.inbox}>
      <Row>
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <Threads threadData={threadData} />
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
          <MessagesContainer />
        </Col>
      </Row>
    </div>
  );
};

export { Inbox };
