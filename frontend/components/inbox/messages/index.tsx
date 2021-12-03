import * as React from 'react';
import { Message } from '../message';
import { formattedRelativeTimeFromTimestamp } from '../message/utils';
import styles from './styles.module.scss';
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

  const relativeDateMap = new Map<string, string>()

  messages.forEach(message => {
    const relativeDate = formattedRelativeTimeFromTimestamp(message.timestamp)
    if (!Array.from(relativeDateMap.values()).includes(relativeDate)) {
      relativeDateMap.set(message.id, relativeDate)
    }
  })

  return (
    <>
      {messages.map(message => (
        <div key={`message-${message.id}`}>
          {relativeDateMap.has(message.id) && (
            <p className={styles['relative-date-header']}>{relativeDateMap.get(message.id)}</p>
          )}
          <Message
            id={message.id}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
}

export { Messages };
