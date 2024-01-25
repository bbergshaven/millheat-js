import fetch, { Headers, RequestInfo, RequestInit } from "node-fetch";
import type { AbortSignal } from "node-fetch/externals";
import { Result } from "./models/result";

export enum APIErrorCode {
  unauthorized = 401,
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
      case APIErrorCode.unauthorized:
        return "unauthorized";
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

  let requestInit = {
    ...init,
    body: request ? JSON.stringify(request) : undefined,
    method: request ? "POST" : "GET",
    signal: cancelController.signal as AbortSignal,
    headers: headers,
  };
  try {
    let response = await fetch(input, requestInit);
    if (response.status === 200) {
      let payload = (await response.json()) as Result<T>;
      return payload
    }
    return Promise.reject(new Error("Unexpected error"));
  } catch (error) {
    return Promise.reject(error);
  } finally {
    clearTimeout(cancelTimeout);
  }
}
