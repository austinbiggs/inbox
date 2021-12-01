import * as React from "react";
import { Col, Container, Row, Toast } from "react-bootstrap";
import { Message, Props } from "./types";
import { makeVar, useReactiveVar } from "@apollo/client";
import styles from "./styles.module.scss";

export const messagesVar = makeVar<Message[]>([]);

export const Console: React.FC<Props> = () => {
  const messages = useReactiveVar(messagesVar);

  const renderMessage = (message: Message) => {
    const { data, emoji, title = "" } = message;

    return (
      <Toast className={styles.toast}>
        <Toast.Header>
          <strong className="me-auto">{`${emoji} ${title}`}</strong>
        </Toast.Header>
        <Toast.Body>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </Toast.Body>
      </Toast>
    );
  };

  const renderMessages = () => {
    if (messages.length === 0) {
      return;
    }

    console.log({ messages });

    return messages.map((message) => {
      return renderMessage(message);
    });
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <div className={styles.toasts}>{renderMessages()}</div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
