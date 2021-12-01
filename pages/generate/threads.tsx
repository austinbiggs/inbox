import * as React from "react";
import { contains, random, times, without } from "underscore";

import { Console, messagesVar } from "./console";
import { Message } from "./console/types";

const userIds = [3, 4, 5, 8, 9, 10, 11, 12, 13, 14];

const GenerateThreads: React.FC = () => {
  // actions
  const addMessage = (message: Message) => {
    // console.log("addMessage", [...messages(), message]);

    messagesVar([...messagesVar(), message]);
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
    // const [] = null;

    // select recipients
    // create thread_users records for each recipient - insert_threads_users
    // create 4-10 messages per thread

    return recipients;
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
