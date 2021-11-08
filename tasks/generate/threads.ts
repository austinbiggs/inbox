import { pluck, times, without } from "lodash";

interface Options {
  senderId: number;
}

const defaultOptions = {
  senderId: 3,
};

const userIds = [3, 4, 5, 8, 9, 10, 11, 12, 13, 14];
const senderId = 3;

const selectRecipients = () => {
  let recipients: number[] = [];

  // min + max
  const maximumRecipients = 5; // less than (and not equal);
  const minimumRecipients = 1; // no lower than (and may possibly equal)

  const possibleRecipients = without(userIds, senderId);
  const numberOfRecipients =
    Math.random() * (maximumRecipients - minimumRecipients) + maximumRecipients;

  times(numberOfRecipients, () => {
    const randomRecipient = Math.floor(
      Math.random() * possibleRecipients.length
    );

    recipients.push(randomRecipient);
  });

  return recipients;
};

const generateThreads = (options: Options = defaultOptions) => {
  // options
  // const { senderId } = options;

  const recipients = selectRecipients();
};

// create a thread - insert_threads_one
// select recipients
// create thread_users records for each recipient - insert_threads_users
// create 4-10 messages per thread
// - first message must be from sender -
// - rest of messages should go back and forth

export default generateThreads;
