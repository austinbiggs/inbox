// TODO: Adjust these interfaces as necessary once we have real data
export interface User {
  id: number;
  avatar: string;
  name: string;
}

export interface Message {
  id: string;
  message: string;
  timestamp: string;
  user: User;
  threadId: number;
}

export interface Thread {
  id: number;
  messages: Message[];
}
