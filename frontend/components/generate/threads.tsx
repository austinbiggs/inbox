import * as React from "react";
import { contains, random, times, without, uniqueId } from "underscore";
import { add, formatISO } from "date-fns";

import { Console, messagesVar } from "../console";
import { Message } from "../console/types";
import { useInsertThreadMutation } from "./graphql/hooks/insert-thread";
import {
  Messages_Insert_Input,
  Threads_Users_Insert_Input,
} from "../../gql/types";
import { useInsertThreadUsersMutation } from "./graphql/hooks/insert-thread-users";
import { SEED_MESSAGES } from "./constants";
import { useInsertMessagesMutation } from "./graphql/hooks/insert-messages";

interface Props {
  live?: boolean;
}

const userIds = [3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15];

const GenerateThreads: React.FC<Props> = (props) => {
  // props
  const { live = false } = props;

  // hooks
  const [insertThread] = useInsertThreadMutation();
  const [insertThreadUsers] = useInsertThreadUsersMutation();
  const [insertMessages] = useInsertMessagesMutation();

  // actions
  const addMessage = (message: Message) => {
    messagesVar([...messagesVar(), { ...message, uuid: uniqueId() }]);
  };

  // handlers
  const selectRecipients = (randomSender = false) => {
    let recipients: number[] = [];
    let senderId: number = null;

    if (randomSender) {
      // randomly select a sender
      const senderIdKey = random(0, userIds.length - 1);
      senderId = userIds[senderIdKey];

      addMessage({ emoji: "🌀", title: "Random Sender", data: { senderId } });
    } else {
      senderId = 3; // Charmander

      addMessage({ emoji: "🔥", title: "Default Sender", data: { senderId } });
    }

    // min + max
    const maximumRecipients = 4;
    const minimumRecipients = 1;

    const possibleRecipients = without(userIds, senderId);
    const numberOfRecipients = random(minimumRecipients, maximumRecipients);

    // uncomment for recipients details
    // addMessage({
    //   emoji: "🔍",
    //   title: "Recipients Meta Data",
    //   data: {
    //     min: minimumRecipients,
    //     max: maximumRecipients,
    //     numberOfRecipients,
    //     possibleRecipients,
    //   },
    // });

    times(numberOfRecipients, () => {
      // select a random recipient from potential recipients
      let availableRecipients = possibleRecipients.filter(
        (id) => !contains(recipients, id)
      );

      // randomly select a recipient
      const recipientIdKey = random(0, availableRecipients.length - 1);
      const recipientId = availableRecipients[recipientIdKey];

      // uncomment for recipient details
      // addMessage({
      //   emoji: "🔍",
      //   title: "Recipient Meta Data",
      //   data: { availableRecipients, recipientIdKey, recipientId, recipients },
      // });

      recipients.push(recipientId);
    });

    addMessage({
      emoji: "📨",
      title: "Selected Recipients",
      data: { recipients },
    });

    return {
      senderId,
      recipients,
    };
  };

  const generateThread = () => {
    addMessage({
      emoji: "🏁",
      title: "Generating Thread",
    });

    const { recipients, senderId } = selectRecipients();

    // create a thread - insert_threads_one
    insertThread({
      variables: { senderId },
    })
      .then((result) => {
        const threadResult = result?.data?.insert_threads_one;

        addMessage({
          emoji: "✅",
          title: "Thread Created",
          data: threadResult,
          variant: "success",
        });

        generateThreadUsers(threadResult.id, recipients, senderId);
      })
      .catch((error) => {
        console.log(error);

        addMessage({
          emoji: "⚠️",
          title: "Thread not created!",
          data: { error },
          variant: "warning",
        });
      });
  };

  const generateThreadUsers = (
    threadId: number,
    recipients: number[],
    senderId: number
  ) => {
    const threadUsers: Threads_Users_Insert_Input[] = [
      senderId,
      ...recipients,
    ].map((recipient) => {
      return { thread_id: threadId, user_id: recipient };
    });

    // create thread_users records for each recipient - insert_threads_users
    insertThreadUsers({
      variables: { threadUsers },
    })
      .then((result) => {
        const threadUsersResult = result?.data?.insert_threads_users;

        addMessage({
          emoji: "✅",
          title: "Thread Users Created",
          data: threadUsersResult,
          variant: "success",
        });

        generateThreadMessages(threadId, recipients, senderId);
      })
      .catch((error) => {
        console.log(error);

        addMessage({
          emoji: "⚠️",
          title: "Thread Users not created!",
          data: { error },
          variant: "warning",
        });
      });
  };

  const generateThreadMessages = (
    threadId: number,
    recipients: number[],
    senderId: number
  ) => {
    let threadMessages: Messages_Insert_Input[] = [];
    let lastCreatedBy: number = null;

    // randomly select some messages
    const numberOfMessages = random(2, 6);
    times(numberOfMessages, (index) => {
      // select a random message from potential messages
      let availableMessages = SEED_MESSAGES.filter(
        (message) => !contains(threadMessages, message)
      );

      // randomly select a message
      const messageKey = random(0, availableMessages.length - 1);
      let message: Messages_Insert_Input = {
        body: availableMessages[messageKey],
        status: "sent",
        thread_id: threadId,
      };

      // uncomment for message details
      // addMessage({
      //   emoji: "🔍",
      //   title: "Message Meta Data",
      //   data: { availableMessages, messageKey, message, threadMessages },
      // });

      // first message from thread sender
      // remaining messages should be randomized
      let createdBy = null;
      let recipientIdKey = null;
      let availableRecipients: number[] = [];
      if (index === 0) {
        createdBy = senderId;
      } else {
        // select a random recipient from potential recipients
        availableRecipients = [...recipients, senderId].filter(
          (id) => id !== lastCreatedBy
        );

        // randomly select a recipient
        recipientIdKey = random(0, availableRecipients.length - 1);
        createdBy = availableRecipients[recipientIdKey];
      }

      const createdAt = formatISO(add(new Date(), { minutes: index }));

      message = { ...message, created_by: createdBy, created_at: createdAt };

      // uncomment for message sender details
      addMessage({
        emoji: "🔍",
        title: "Message Sender Meta Data",
        data: { availableRecipients, recipientIdKey, message },
      });

      lastCreatedBy = createdBy;
      threadMessages.push(message);
    });

    insertMessages({ variables: { messages: threadMessages } })
      .then((result) => {
        const threadMessagesResult = result?.data?.insert_messages;

        addMessage({
          emoji: "✅",
          title: "Thread Messages Created",
          data: threadMessagesResult,
          variant: "success",
        });

        // infinitely generate threads every X seconds
        if (live) {
          addMessage({
            emoji: "⌛",
            title: "Waiting 10 seconds",
          });

          setTimeout(() => {
            generateThread();
          }, 10000);
        }
      })
      .catch((error) => {
        console.log(error);

        addMessage({
          emoji: "⚠️",
          title: "Thread Messages not created!",
          data: { error },
          variant: "warning",
        });
      });
  };

  // hooks
  React.useEffect(() => {
    generateThread();
  }, []);

  // render
  return <Console />;
};

export { GenerateThreads };
