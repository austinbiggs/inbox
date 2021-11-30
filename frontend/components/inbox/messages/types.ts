// TODO: Adjust these interfaces as necessary once we have real data
export interface Message {
  id: number;
  userId: number;
  message: string;
  timestamp: number;
}

export interface Thread {
  id: number;
  messages: Message[];
}
