import * as React from "react";
import { MessagesContainer } from "./messages-container";
// import { Thread } from "./messages/types";
import styles from "./styles.module.scss";

const Inbox: React.FC = () => {
  return (
    <div className={styles.inbox}>
      <div className={styles.threads}>
        {/* <Threads /> */}
      </div>
      {/* Hardcoded for now */}
      <MessagesContainer threadId={174} />
    </div>
  );
};

export { Inbox };
