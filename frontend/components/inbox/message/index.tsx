import * as React from "react";

import styles from "./styles.module.css";

const Message: React.FC = () => {
  const threads = [1, 2, 3, 5, 6, 7, 8, 9, 10];

  const renderMessages = () => {
    const renderMessage = (message: any) => {
      return (
        <div key={`message-${message}`} className={styles.message}>
          Lorem Ipsum Set Dolor Amet
        </div>
      );
    };

    return threads.map((message) => renderMessage(message));
  };

  return <div className={styles.messages}>{renderMessages()}</div>;
};

export { Message };
