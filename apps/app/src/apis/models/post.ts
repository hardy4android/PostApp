export interface Post {
  id: string;
  title: string;
  created_at: string;
  user?: {
    id: string;
    email: string;
  };
}

export interface ListPostsResponse {
  success: boolean;
  data?: Post[];
  count?: number;
  error?: string;
}

export interface CreatePostResponse {
  success: boolean;
  data?: Post;
  error?: string;
}
