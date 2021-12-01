import * as React from "react";
import { Col, Container, Row, Toast } from "react-bootstrap";
import { Message, Props } from "./types";

export const Console: React.FC<Props> = (props: Props) => {
  const { messages = [] } = props;

  const renderMessage = (message: Message) => {
    const { body, emoji, time = null, title = "" } = message;

    return (
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{`${emoji} ${title}`}</strong>
          <small>{time}</small>
        </Toast.Header>
        <Toast.Body>{body}</Toast.Body>
      </Toast>
    );
  };

  const renderMessages = () => {
    return messages.map((message) => renderMessage(message));
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          {renderMessages()}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
