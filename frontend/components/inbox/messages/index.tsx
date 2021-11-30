import * as React from 'react';
import { Message } from '../message';
import { Message as MessageType } from './types';

interface Props {
  messages: MessageType[];
}

const Messages = ({ messages }: Props): JSX.Element => {
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null)
  
  const scrollToBottomOfMessages = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const messagesAsString = `${messages}`

  React.useEffect(() => {
    scrollToBottomOfMessages()
  }, [messagesAsString])

  return (
    <>
      {messages.map(message => (
        <Message 
          id={message.id}
          message={message.message}
          timestamp={message.timestamp}
          userId={message.userId}
          key={`message-${message.id}`}
        />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
}

export { Messages };
