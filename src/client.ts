import { Authenticator } from "./authenticator";
import { Agent } from "https";
import { HomeListResult } from "./models/home-result";
import { Result } from "./models/result";
import fetch, { Headers, RequestInit } from "node-fetch";

const apiUrl = "https://api.millheat.com";

export interface AccessToken {
  /// The parsed access token
  payload: MillheatAccessToken;
  /// The access token
  access_token: string;
  /// The refresh token
  refresh_token: string;
  /// Date in local time, when the access token expires
  expireTime: Date;
  /// Date in local time, when the refresh token expires
  refresh_expireTime: Date;
}

export type MillCredential = {
  access_key: string;
  secret_token: string;
  username: string;
  password: string;
};

interface MillheatAccessToken {
  username: string;
  uid: number;
  account: string;
  accountId: number;
  type: string;
  exp: number;
  nbf: number;
  iss: string;
}

type Options = {
  timeout: number;
};

export class MillheatAPI {
  declare authenticator: Authenticator;
  declare credential: MillCredential;

  options: Options;
  agent = new Agent({ keepAlive: true });

  constructor(credential: MillCredential, options: Partial<Options> = {}) {
    this.options = {
      timeout: 30000,
      ...options,
    };
    this.credential = credential;
    this.authenticator = new Authenticator(credential, apiUrl, this.agent);
  }

  private async api<T>(
    input: string,
    init: RequestInit,
    request: any
  ): Promise<Result<T>> {
    const AbortController =
      globalThis.AbortController || (await import("abort-controller")).default;
    let headers = new Headers(init ? init.headers : undefined);
    let authenticationHeaders = await this.authenticator.authenticate();
    for (let [key, value] of authenticationHeaders) {
      headers.append(key, value);
    }

    let requestInit = {
      ...init,
      agent: this.agent,
      method: "POST",
      headers: headers,
      body: new URLSearchParams(request),
    };

    let cancelController = new AbortController();
    let cancelTimeout = setTimeout(() => {
      cancelController.abort();
    }, this.options.timeout);

    try {
      let response = await fetch(input, requestInit);
      if (response.status === 200) {
        let data = (await response.json()) as Result<T>;
        if (data.success) {
          return data;
        }
      }
      return Promise.reject(new Error("Unexpected error"));
    } catch (error) {
      return Promise.reject(error);
    } finally {
      clearTimeout(cancelTimeout);
    }
  }

  async getHomeList(): Promise<HomeListResult> {
    let response = await this.api<HomeListResult>(
      `${apiUrl}/uds/selectHomeList`,
      {},
      {}
    );
    if (response.success) {
      return response.data;
    }
    return Promise.reject(response.message);
  }
}
