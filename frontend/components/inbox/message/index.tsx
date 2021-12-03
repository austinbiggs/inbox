import classNames from "classnames";
import * as React from "react";
import { Message as MessageData } from "../messages/types";

import styles from "./styles.module.scss";
import { formattedTimeFromTimestamp } from "./utils";
import { Avatar } from "../../../../components";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const CURRENT_USER_ID = 3; // First user ID in the users table

type Props = Omit<MessageData, "threadId">;

const Message = ({ message, timestamp, user }: Props): JSX.Element => {
  const sentOrReceived = user.id === CURRENT_USER_ID;

  // TODO: (adam) Rename some of these classes. They don't really make sense anymore
  return (
    <div
      className={classNames(
        styles.thread,
        sentOrReceived ? styles["thread-sent"] : ""
      )}
    >
      <div
        className={classNames(
          styles["avatar-container"],
          sentOrReceived ? styles["avatar-container-sent"] : ""
        )}
      >
        {/* @ts-ignore */}
        <Avatar
          size="sm"
          className={classNames(
            styles.avatar,
            styles[user?.name.toLowerCase()],
            "rounded-circle"
          )}
        >
          <OverlayTrigger overlay={<Tooltip>{user?.name}</Tooltip>}>
            {/* @ts-ignore */}
            <Avatar.Image
              src={user?.avatar}
              className={styles.image}
              alt={user?.name}
            />
          </OverlayTrigger>
        </Avatar>
        <h6>{formattedTimeFromTimestamp(timestamp)}</h6>
      </div>
      <div className={styles["message-container"]}>
        <p
          className={classNames(
            styles.message,
            sentOrReceived ? styles["sent-message"] : styles["received-message"]
          )}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export { Message };
