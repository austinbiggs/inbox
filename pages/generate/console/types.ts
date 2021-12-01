export type Props = {
  // action: () => any;
  messages: Message[];
};

export type Message = {
  emoji: string;
  body: string;
  title?: string;
  time?: string;
};
