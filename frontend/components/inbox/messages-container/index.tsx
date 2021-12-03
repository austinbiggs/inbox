import { maybe } from "@perfective/common/maybe";
import classNames from "classnames";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { MessageBox } from "../message-box";
import { Messages } from "../messages";
import { Message, User } from "../messages/types";
import { useInsertMessageMutation } from "./graphql/hooks/insert-message";
import { useStreamMessagesSubscription } from "./graphql/hooks/stream-messages";
import styles from "./styles.module.scss";

interface Props {
  threadId: number;
}

const CURRENT_USER_ID = 3; // First user ID in the users table

const MessagesContainer = ({ threadId }: Props): JSX.Element => {
  const { data } = useStreamMessagesSubscription({
    variables: {
      threadId,
    },
  });

  const [insertMessageMutation] = useInsertMessageMutation();

  const [localMessages, setLocalMessages] = React.useState<
    Message[] | undefined
  >(undefined);

  let userData: User | undefined;

  const messages = maybe(data)
    .pick("messages")
    .to((messages) =>
      messages.map<Message>((message) => ({
        id: message.id,
        message: message.body,
        timestamp: message.created_at,
        user: {
          id: message.created_by,
          avatar: message.user.image_url,
        },
      }))
    )
    .run((messages) => {
      const currentUserMessage = messages.filter(
        (message) => message?.user?.id === CURRENT_USER_ID
      )[0];
      userData = {
        ...currentUserMessage?.user,
      };
    })
    .or(undefined);

  if (
    (localMessages === undefined && messages !== undefined) ||
    (messages !== undefined && localMessages?.length < messages.length)
  ) {
    setLocalMessages(messages);
  }

  const updateMessages = (newMessage: string): void => {
    const messageId = uuidv4();

    setLocalMessages([
      ...messages,
      {
        id: messageId,
        message: newMessage,
        timestamp: new Date().toISOString(),
        user: {
          ...userData,
        },
      },
    ]);

    insertMessageMutation({
      variables: {
        message: {
          body: newMessage,
          created_by: CURRENT_USER_ID, // hardcoded for now
          status: "sent",
          thread_id: threadId,
          id: messageId,
        },
      },
    });
  };

  return (
    <div className={classNames(styles.container, "shadow", "p-3")}>
      <div className={styles.messages}>
        {localMessages && <Messages messages={localMessages} />}
      </div>
      <MessageBox updateMessages={updateMessages} />
    </div>
  );
};

export { MessagesContainer };
