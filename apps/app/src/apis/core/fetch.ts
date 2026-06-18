import queryString from "query-string";
import { getAuthToken, clearAuthToken } from "@/lib/auth/getAuthToken";
import { useAuthStore } from "@/stores/authStore";

export interface IRequestBodyObj {
  [key: string]: string | number | object | boolean | null | undefined;
}

export interface IRequestParamObj {
  [key: string]: string | undefined;
}

const defaultHeaders = (
  accessToken?: string,
  otherHeaders?: ResponseInit["headers"],
) => {
  return {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...otherHeaders,
  };
};

/**
 *  Resolve Firebase token here (COMMON)
 */
const resolveToken = async () => {
  const token = await getAuthToken();
  return token ?? undefined;
};

const handleResponse = async (res: Response, endpoint: string) => {
  if (res.status === 401 && !endpoint.includes("/auth/login") && !endpoint.includes("/auth/register")) {
    await clearAuthToken();
    useAuthStore.getState().logout();
  }
  return res;
};

export const FETCH = {
  get: async (
    endpoint: string,
    queryParam?: IRequestParamObj,
    otherHeaders?: ResponseInit["headers"],
  ) => {
    console.log("\x1b[34mGET: " + endpoint + "\x1b[0m");
    const query = queryParam ? `?${queryString.stringify(queryParam)}` : "";
    const token = await resolveToken();

    const res = await fetch(endpoint + query, {
      method: "GET",
      headers: defaultHeaders(token, {
        ...otherHeaders,
        "Content-Type": "application/json",
      }),
    });
    return handleResponse(res, endpoint);
  },

  post: async (
    endpoint: string,
    body: IRequestBodyObj | "",
    otherHeaders?: ResponseInit["headers"],
  ) => {
    console.log("\x1b[34mPOST: " + endpoint + "\x1b[0m");
    const token = await resolveToken();
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
      ...otherHeaders,
    };

    let res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    console.log("FETCH POST → Status:", res.status);

    // 🔁 Retry once if token expired
    if (res.status === 401) {
      const freshToken = await getAuthToken(true);

      res = await fetch(endpoint, {
        method: "POST",
        headers: defaultHeaders(freshToken ?? undefined, {
          ...otherHeaders,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(body),
      });
    }

    return handleResponse(res, endpoint);
  },

  postWithoutStringify: async (endpoint: string, body: FormData) => {
    const token = await resolveToken();

    const res = await fetch(endpoint, {
      method: "POST",
      headers: defaultHeaders(token),
      body,
    });
    return handleResponse(res, endpoint);
  },

  postMultipart: async (
    endpoint: string,
    formData: FormData,
    otherHeaders?: ResponseInit["headers"],
  ) => {
    console.log("\x1b[34mPOST MULTIPART: " + endpoint + "\x1b[0m");
    const token = await resolveToken();

    // Don't set Content-Type - let browser/RN set it with boundary
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...otherHeaders,
    };

    let res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: formData,
    });

    console.log("FETCH POST MULTIPART → Status:", res.status);

    // 🔁 Retry once if token expired
    if (res.status === 401) {
      const freshToken = await getAuthToken(true);

      res = await fetch(endpoint, {
        method: "POST",
        headers: {
          ...(freshToken ? { Authorization: `Bearer ${freshToken}` } : {}),
          ...otherHeaders,
        },
        body: formData,
      });

      console.log("FETCH POST MULTIPART (Retry) → Status:", res.status);
    }

    return handleResponse(res, endpoint);
  },

  put: async (endpoint: string, body?: IRequestBodyObj) => {
    const token = await resolveToken();

    const res = await fetch(endpoint, {
      method: "PUT",
      headers: defaultHeaders(token),
      body: JSON.stringify(body),
    });
    return handleResponse(res, endpoint);
  },

  delete: async (endpoint: string, body?: IRequestBodyObj) => {
    const token = await resolveToken();

    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: defaultHeaders(token),
      body: JSON.stringify(body),
    });
    return handleResponse(res, endpoint);
  },
};
