import fetch, { Headers, RequestInfo, RequestInit } from "node-fetch";
import type { AbortSignal } from "node-fetch/externals";
import { Result } from "./models/result";

export enum APIErrorCode {
  systemError = 101,
  udsError = 102,
  accessKeyError = 201,
  userError = 221,
  authorizationError = 222,
  applicationError = 223,
  tokenError1 = 241,
  tokenError2 = 242,
  accountError = 243,
  deviceError1 = 303,
  deviceError2 = 304,
}

export class APIError extends Error {
  code: APIErrorCode;
  message: string;

  constructor(apiError: APIErrorResponse) {
    super(apiError.message);
    Object.setPrototypeOf(this, APIError.prototype);
    this.name = "APIError";
    this.code = apiError.errorCode;
    this.message = apiError.message;
  }

  toString() {
    return `APIError(code: ${this.code} type: ${this.type} : ${this.message}`;
  }

  get type() {
    switch (this.code) {
      case APIErrorCode.systemError:
        return "system error";
      case APIErrorCode.udsError:
        return "uds error";
      case APIErrorCode.accessKeyError:
        return "access_key is wrong";
      case APIErrorCode.userError:
        return "user is not exist";
      case APIErrorCode.authorizationError:
        return "authorization_code is invalid";
      case APIErrorCode.applicationError:
        return "application account has lapsed";
      case APIErrorCode.tokenError1:
        return "refresh_token is wrong, or expired";
      case APIErrorCode.tokenError2:
        return "refresh_token is wrong";
      case APIErrorCode.accountError:
        return "application account has lapsed";
      case APIErrorCode.deviceError1:
        return "the device is not yours";
      case APIErrorCode.deviceError2:
        return "cannot find device info";
      default:
        return "unknown";
    }
  }
}

export interface APIMethod {
  parameters: {} | null;
  resultType: {};
}

export interface APIErrorResponse {
  errorCode: APIErrorCode | number;
  statusCode: number;
  success: boolean;
  message: string;
}

export async function execute<T extends APIMethod>(
  input: RequestInfo,
  init: RequestInit,
  request: T["parameters"],
  timeout: number
): Promise<T["resultType"]> {
  const AbortController =
    globalThis.AbortController || (await import("abort-controller")).default;

  let cancelController = new AbortController();
  let cancelTimeout = setTimeout(() => {
    cancelController.abort();
  }, timeout);

  let headers = new Headers(init.headers);
  let params = new URLSearchParams();
  if (request) {
    for (let [key, value] of Object.entries(request)) {
      params.append(key, `${value}`);
    }
  }

  let requestInit = {
    ...init,
    body: new URLSearchParams(params),
    method: "POST",
    signal: cancelController.signal as AbortSignal,
    headers: headers,
  };
  try {
    let response = await fetch(input, requestInit);
    if (response.status === 200) {
      let payload = (await response.json()) as Result<T>;
      if (payload.success) {
        return payload.data;
      } else if (payload.errorCode) {
        return Promise.reject(new APIError(payload));
      }
    }
    return Promise.reject(new Error("Unexpected error"));
  } catch (error) {
    return Promise.reject(error);
  } finally {
    clearTimeout(cancelTimeout);
  }
}
