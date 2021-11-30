import { contains, random, times, without } from "underscore";

const userIds = [3, 4, 5, 8, 9, 10, 11, 12, 13, 14];

const selectRecipients = (randomSender = false) => {
  let recipients = [];
  let senderId = null;

  if (randomSender) {
    // randomly select a sender
    const senderIdKey = random(0, userIds.length - 1);
    senderId = userIds[senderIdKey];

    console.log("🌀 Random Sender", senderId);
  } else {
    senderId = 3; // Charmander

    console.log("🔥 Default Sender", senderId);
  }

  // min + max
  const maximumRecipients = 4;
  const minimumRecipients = 1;

  const possibleRecipients = without(userIds, senderId);
  const numberOfRecipients = random(minimumRecipients, maximumRecipients);

  console.log("🔍 Recipients Meta Data", {
    min: minimumRecipients,
    max: maximumRecipients,
    numberOfRecipients,
    possibleRecipients,
  });

  times(numberOfRecipients, () => {
    // select a random recipient from potential recipients
    let availableRecipients = possibleRecipients.filter(
      (id) => !contains(recipients, id)
    );

    // randomly select a recipient
    const recipientIdKey = random(0, possibleRecipients.length - 1);
    const recipientId = possibleRecipients[recipientIdKey];

    console.log("🔍 Recipient Meta Data", {
      availableRecipients,
      recipientIdKey,
      recipientId,
      recipients,
    });

    recipients.push(recipientId);
  });

  console.log("📨 Selected Recipients", recipients);

  return recipients;
};

export const generateThread = () => {
  console.log("🏁 Generating Thread");

  const recipients = selectRecipients();

  return recipients;
};

generateThread();

// create a thread - insert_threads_one
// select recipients
// create thread_users records for each recipient - insert_threads_users
// create 4-10 messages per thread
// - first message must be from sender -
// - rest of messages should go back and forth
