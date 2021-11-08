import * as React from "react";

import styles from "./styles.module.css";

const Message: React.FC = () => {
  const threads = [1, 2, 3, 5, 6, 7, 8, 9, 10];

  return threads.map((message) => {
    return (
      <div key={`message-${message}`} className={styles.thread}>
        Lorem Ipsum Set Dolor Amet
      </div>
    );
  });
};

export { Message };
