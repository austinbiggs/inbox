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
import { selectedThreadVar } from "../index";
import { useReactiveVar } from "@apollo/client";

const CURRENT_USER_ID = 3; // First user ID in the users table

const MessagesContainer = (): JSX.Element => {
  const selectedThread = useReactiveVar(selectedThreadVar);

  const { data, loading } = useStreamMessagesSubscription({
    variables: {
      threadId: selectedThread,
    },
  });

  // console.log({selectedThread});

  const [insertMessageMutation] = useInsertMessageMutation();

  const [localMessages, setLocalMessages] = React.useState<
    Message[] | undefined
  >(undefined);

  // const [previousThreadId, setPreviousThreadId] = React.useState<number | undefined>(selectedThread)

  let userData: User | undefined;

  const messages = maybe(data)
    .pick("messages")
    .to((messages) =>
      messages.map<Message>((message) => ({
        id: message?.id,
        message: message?.body,
        timestamp: message?.created_at,
        user: {
          id: message?.created_by,
          avatar: message?.user?.image_url,
          name: message?.user?.name,
        },
        threadId: message.thread_id,
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

  // console.log("messages", { messages }, { localMessages });

  if (
    (localMessages === undefined && messages !== undefined) ||
    (messages !== undefined &&
      (localMessages?.length < messages.length ||
        messages[0].threadId !== localMessages?.[0].threadId))
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
        threadId: selectedThread,
      },
    ]);

    insertMessageMutation({
      variables: {
        message: {
          body: newMessage,
          created_by: CURRENT_USER_ID, // hardcoded for now
          status: "sent",
          thread_id: selectedThread,
          id: messageId,
        },
      },
    });
  };

  return (
    <div className={classNames(styles.container, "shadow", "p-3")}>
      <div className={styles.messages}>
        {!loading && localMessages && <Messages messages={localMessages} />}
      </div>
      <MessageBox updateMessages={updateMessages} />
    </div>
  );
};

export { MessagesContainer };
