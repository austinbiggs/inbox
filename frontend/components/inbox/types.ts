export interface ThreadData {
  created_by: number;
  id: number;
  messages: {
    body: string;
    created_at: string;
    created_by: number;
    id: string;
    user: {
      id: number;
      image_url: string;
      name: string;
    }
  }[];
  threads_users: {
    user: {
      id: number;
      gif_url: string;
      name: string;
    };
  }[];
}
