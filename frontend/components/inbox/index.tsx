import * as React from "react";
import { MessageBox } from "./message-box";
import { Messages } from "./messages";
import { Thread } from "./messages/types";

import styles from "./styles.module.scss";
// import { Threads } from "./threads";

const MOCK_THREAD: Thread = {
  id: 0,
  messages: [
    {
      id: 0,
      message: "Hey man, what's up?",
      userId: 2,
      timestamp: 1638303482120,
    },
    {
      id: 1,
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet.",
      userId: 2,
      timestamp: 1638303544948
    },
    {
      id: 2,
      message: "Yo yo, what up",
      userId: 1,
      timestamp: 1638303573808
    }
  ]
}

const Inbox: React.FC = () => {
  const [messages, setMessages] = React.useState(MOCK_THREAD.messages)

  const updateMessages = (newMessage: string): void => {
    setMessages(
      [
        ...messages,
        {
          id: messages.length,
          message: newMessage,
          timestamp: new Date().valueOf(),
          userId: 1
        }
      ]
    )
  }

  console.log({messages});

  return (
    <div className={styles.inbox}>
      <div className={styles.threads}>
        {/* <Threads /> */}
      </div>
      <div className={styles.messages}>
        <Messages messages={messages} />
      </div>
      <MessageBox updateMessages={updateMessages} />
    </div>
  );
};

export { Inbox };
