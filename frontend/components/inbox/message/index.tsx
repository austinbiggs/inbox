import classNames from "classnames";
import * as React from "react";
import { Message as MessageData } from "../messages/types";

import styles from "./styles.module.scss";
import { formattedTimeFromTimestamp } from './utils';
import Image from "next/image";

const CURRENT_USER_ID = 3; // First user ID in the users table

const Message = ({
  message,
  timestamp,
  user
}: MessageData): JSX.Element => {
  const sentOrReceived = user.id === CURRENT_USER_ID;

  // TODO: (adam) Rename some of these classes. They don't really make sense anymore
  return (
    <div className={classNames(styles.thread, sentOrReceived ? styles['thread-sent'] : '')}>
      <div className={classNames(styles['avatar-container'], sentOrReceived ? styles['avatar-container-sent'] : '')}>
        <Image
          src={user.avatar}
          alt="Avatar"
          className={styles.avatar}
          width={50}
          height={50}
          priority
        />
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
