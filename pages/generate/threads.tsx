import * as React from "react";
import { contains, random, times, without, uniqueId } from "underscore";

import { Console, messagesVar } from "./console";
import { Message } from "./console/types";
import { useInsertThreadMutation } from "./graphql/hooks/insert-thread";
import {
  Messages_Insert_Input,
  Threads_Users_Insert_Input,
} from "../../frontend/gql/types";
import { useInsertThreadUsersMutation } from "./graphql/hooks/insert-thread-users";
import { SEED_MESSAGES } from "./constants";
import { useInsertMessagesMutation } from "./graphql/hooks/insert-messages";

const userIds = [3, 4, 5, 8, 9, 10, 11, 12, 13, 14];

const GenerateThreads: React.FC = () => {
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
    const threadUsers: Threads_Users_Insert_Input[] = recipients.map(
      (recipient) => {
        return { thread_id: threadId, user_id: recipient };
      }
    );

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
    sender: number
  ) => {
    let threadMessages: Messages_Insert_Input[] = [];
    let lastCreatedBy = null;

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
        thread_id: threadId,
      };

      // first message from thread sender
      // remaining messages should go back and forth
      let createdBy = null;
      if (index === 0) {
        createdBy = 3; // REPLACE WITH SENDER ID
      } else {
      }

      message = { ...message, created_by: createdBy };
      lastCreatedBy = createdBy;

      // uncomment for message details
      // addMessage({
      //   emoji: "🔍",
      //   title: "Message Meta Data",
      //   data: { availableMessages, messageKey, message, threadMessages },
      // });

      threadMessages.push(message);
    });

    console.log({ numberOfMessages, threadMessages });

    // create 4-10 messages per thread
  };

  // hooks
  React.useEffect(() => {
    generateThread();
  }, []);

  // render
  return <Console />;
};

// generateThread();

// create a thread - insert_threads_one
// select recipients
// create thread_users records for each recipient - insert_threads_users
// create 4-10 messages per thread
// - first message must be from sender -
// - rest of messages should go back and forth

export default GenerateThreads;
