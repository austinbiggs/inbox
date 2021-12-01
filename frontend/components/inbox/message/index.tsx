import classNames from "classnames";
import * as React from "react";
import { Message as MessageData } from "../messages/types";

import styles from "./styles.module.scss";
import { formattedTimeFromTimestamp } from './utils';

const CURRENT_USER_ID = 1;

const Message = ({
  // id,
  message,
  timestamp,
  userId
}: MessageData): JSX.Element => {
  // const threads = [1, 2, 3, 5, 6, 7, 8, 9, 10];

  // const renderMessages = () => {
  //   const renderMessage = (message: any) => {
  //     return (
  //       <div key={`message-${message}`} className={styles.message}>
  //         Lorem Ipsum Set Dolor Amet
  //       </div>
  //     );
  //   };

  //   return threads.map((message) => renderMessage(message));
  // };

  // return <div className={styles.messages}>{renderMessages()}</div>;
  const sentOrReceived = userId === CURRENT_USER_ID;

  // TODO: (adam) Rename some of these classes. They don't really make sense anymore
  return (
    <div className={classNames(styles.thread, sentOrReceived ? styles['thread-sent'] : '')}>
      <div className={classNames(styles['avatar-container'], sentOrReceived ? styles['avatar-container-sent'] : '')}>
        <img src={`https://loremflickr.com/50/50?random=${userId}`} alt="avatar" className={styles.avatar} />
        {/* For some reason the Avatar component isn't behaving. Look into this later */}
        {/* <Avatar >
          <Avatar.Image src={`https://loremflickr.com/50/50?random=${thread % 2}`} alt="avatar" className={styles.avatar} />
        </Avatar> */}
        <p>{formattedTimeFromTimestamp(timestamp)}</p>
      </div>
      <div className={styles['message-container']}>
        <p className={classNames(styles.message, sentOrReceived ? styles['sent-message'] : styles['received-message'])}>
          {message}
        </p>
      </div>
    </div>
  )
};

export { Message };
