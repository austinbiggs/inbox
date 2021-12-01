// TODO: Adjust these interfaces as necessary once we have real data
export interface User {
  id: number;
  avatar: string;
}

export interface Message {
  id: number;
  // userId: number;
  message: string;
  timestamp: string;
  user: User;
}

export interface Thread {
  id: number;
  messages: Message[];
}
