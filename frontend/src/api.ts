/* eslint-disable max-classes-per-file */
import { API_URL } from "./constants";

const CONTENT_TYPE = "Content-Type";
const APPLICATION_JSON = "application/json";

function safeParseJson<T, ErrorRes>(
  json: string,
  fallback: (error: unknown) => ErrorRes
) {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    return fallback(e);
  }
}

function queryParamsToQueryString(queryParams: {
  [key: string]: boolean | number | string | string[];
}) {
  if (!queryParams) {
    return "";
  }

  const searchParams = new URLSearchParams();
  Object.entries(queryParams).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      const filteredValues = v.filter((value) => typeof value !== "undefined");
      if (filteredValues.length === 1) {
        searchParams.append(`${k}[]`, filteredValues[0] ?? "");
      } else {
        filteredValues.forEach((d) => {
          searchParams.append(k, d ?? "");
        });
      }
    } else if (typeof v !== "undefined") {
      searchParams.append(k, String(v ?? ""));
    }
  });
  return searchParams.toString();
}

export const DEFAULT_HEADERS = Object.freeze({
  Accept: APPLICATION_JSON,
});

type Config<ResponseType extends "json" | "text"> = {
  queryParams?: {
    [key: string]: boolean | string | number | string[];
  };
  body?: any;
  headers?: any;
  responseType?: ResponseType;
};

type InferredConfig<T> = Config<
  T extends string ? "text" : T extends object ? "json" : "text" | "json"
>;

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

class CustomAppResponse<T> {
  status: number;

  constructor(public readonly response: Response, public readonly data: T) {
    this.response = response;
    this.status = response.status;
    this.data = data;
  }
}

export class CustomHttpError<T> extends Error {
  constructor(
    message: string,
    readonly response: CustomAppResponse<T> | null,
    readonly originalError?: unknown
  ) {
    super(message);
    this.response = response;
    this.originalError = originalError;
  }
}

export const api = (() => {
  const headers: { [key: string]: string } = {
    ...DEFAULT_HEADERS,
    [CONTENT_TYPE]: APPLICATION_JSON,
  };

  function setAuthToken(token: string) {
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      delete headers.Authorization;
    }
  }

  async function request<T>(
    path: string,
    method: Method,
    config: InferredConfig<T> = {}
  ) {
    let response: Response;
    let textData: string;

    const {
      queryParams,
      body,
      headers: headersOverride,
      responseType = "json",
    } = config;

    try {
      const query = queryParamsToQueryString(queryParams as any);
      const parsedPath = path.startsWith("/") ? path : `/${path}`;
      console.log("Sending API Request to", parsedPath);

      response = await fetch(
        `${API_URL}${parsedPath}${query ? `?${query}` : query}`,
        {
          method,
          headers: { ...headers, ...headersOverride },
          body,
        }
      );
      textData = await response.text();
      if (!response.ok) {
        const data = safeParseJson<unknown, typeof textData>(
          textData,
          () => textData
        );
        const customResponse = new CustomAppResponse(response, data);
        throw new CustomHttpError(
          `Failed making request to '${path}', status code: ${response.status}, response: '${textData}'`,
          customResponse
        );
      }
      let data;
      if (responseType === "json") {
        data = JSON.parse(textData) as T;
      } else {
        data = textData as T;
      }
      return new CustomAppResponse(response, data);
    } catch (e) {
      throw e;
    }
  }

  function get<T>(path: string, config?: Omit<InferredConfig<T>, "body">) {
    return request<T>(path, "GET", config);
  }

  function post<T>(path: string, config?: InferredConfig<T>) {
    return request<T>(path, "POST", config);
  }

  function put<T>(path: string, config?: InferredConfig<T>) {
    return request<T>(path, "PUT", config);
  }

  function patch<T>(path: string, config?: InferredConfig<T>) {
    return request<T>(path, "PATCH", config);
  }

  function del<T>(path: string, config?: InferredConfig<T>) {
    return request<T>(path, "DELETE", config);
  }

  function isError<T = unknown>(error: unknown): error is CustomHttpError<T> {
    return error instanceof CustomHttpError;
  }

  return {
    request,
    get,
    post,
    patch,
    put,
    del,
    setAuthToken,
    isError,
  };
})();
