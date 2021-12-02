export interface ThreadData {
  created_by: number;
  id: string;
  messages: {
    body: string;
    created_at: string;
    created_by: number;
    id: string;
    user: {
      id: string;
      image_url: string;
      name: string;
    }
  }
}
