import { FETCH } from "../core/fetch";
import { API_ROUTES } from "../endpoints/apiRoutes";
import { ListPostsResponse, CreatePostResponse } from "../models/post";

const BASE_URL = process.env.EXPO_PUBLIC_API || "http://localhost:8002";

export const postsService = {
  fetchPosts: async (): Promise<{ ok: boolean; status: number; data: ListPostsResponse }> => {
    const res = await FETCH.get(`${BASE_URL}${API_ROUTES.POSTS}`);
    const data = await res.json().catch(() => ({ success: false, error: "Invalid response from server" }));
    console.log("\x1b[32mPOSTS FETCH → Response:\x1b[0m", JSON.stringify(data, null, 2));
    return { ok: res.ok, status: res.status, data };
  },
  createPost: async (title: string): Promise<{ ok: boolean; status: number; data: CreatePostResponse }> => {
    const res = await FETCH.post(`${BASE_URL}${API_ROUTES.POSTS}`, { title });
    const data = await res.json().catch(() => ({ success: false, error: "Invalid response from server" }));
    console.log("\x1b[32mPOSTS CREATE → Response:\x1b[0m", JSON.stringify(data, null, 2));
    return { ok: res.ok, status: res.status, data };
  },
};
