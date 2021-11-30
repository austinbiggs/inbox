import * as React from "react";
import { MessageBox } from "./message-box";

import styles from "./styles.module.css";
import { Threads } from "./threads";

const Inbox: React.FC = () => {
  return (
    <div className={styles.inbox}>
      <div className={styles.threads}>
        <Threads />
      </div>
      <MessageBox />
      <div className={styles.messages}></div>
    </div>
  );
};

export { Inbox };
