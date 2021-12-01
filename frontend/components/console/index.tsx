import * as React from "react";
import { Col, Container, Row, Toast } from "react-bootstrap";
import { Message } from "./types";
import { makeVar, useReactiveVar } from "@apollo/client";
import styles from "./styles.module.scss";

export const messagesVar = makeVar<Message[]>([]);

export const Console: React.FC = () => {
  const messages = useReactiveVar(messagesVar);
  const messagesLength = messages.length;

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottomOfMessages = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottomOfMessages();
  }, [messagesLength]);

  const handleClose = (uuid: Message["uuid"]) => {
    const updatedMessages = messages.filter((message) => message.uuid !== uuid);

    messagesVar(updatedMessages);
  };

  const renderMessage = (message: Message) => {
    const { data, emoji, title = "", uuid, variant } = message;

    return (
      <Toast
        className={styles.toast}
        key={uuid}
        onClose={() => handleClose(uuid)}
        bg={variant}
      >
        <Toast.Header>
          <strong className="me-auto">{`${emoji} ${title}`}</strong>
        </Toast.Header>
        {data && (
          <Toast.Body>
            <pre>{JSON.stringify(data, null, 4)}</pre>
          </Toast.Body>
        )}
      </Toast>
    );
  };

  const renderMessages = () => {
    if (messages.length === 0) {
      return;
    }

    return (
      <>
        {messages.map((message) => {
          return renderMessage(message);
        })}
        <div ref={messagesEndRef} />
      </>
    );
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={4} sm={4} md={5} lg={6} xl={6}>
          <div className={styles.toasts}>{renderMessages()}</div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
