import { FETCH } from "../core/fetch";
import { API_ROUTES } from "../endpoints/apiRoutes";
import { AuthResponse } from "../models/auth";

const BASE_URL = process.env.EXPO_PUBLIC_API || "http://localhost:8002";

export const authService = {
  login: async (email: string, password: string): Promise<{ ok: boolean; status: number; data: AuthResponse }> => {
    const res = await FETCH.post(`${BASE_URL}${API_ROUTES.LOGIN}`, { email, password });
    const data = await res.json().catch(() => ({ success: false, error: "Invalid response from server" }));
    console.log("\x1b[32mAUTH LOGIN → Response:\x1b[0m", JSON.stringify(data, null, 2));
    return { ok: res.ok, status: res.status, data };
  },
  register: async (email: string, password: string): Promise<{ ok: boolean; status: number; data: AuthResponse }> => {
    const res = await FETCH.post(`${BASE_URL}${API_ROUTES.REGISTER}`, { email, password });
    const data = await res.json().catch(() => ({ success: false, error: "Invalid response from server" }));
    console.log("\x1b[32mAUTH REGISTER → Response:\x1b[0m", JSON.stringify(data, null, 2));
    return { ok: res.ok, status: res.status, data };
  },
};
