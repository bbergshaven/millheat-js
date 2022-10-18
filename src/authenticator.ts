import { AccessToken, MillCredential } from "./client";
import fetch from "node-fetch";
import { type Agent } from "https";
import { Result } from "./models/result";

type AuthorizationCode = {
  authorization_code: string;
};

interface TokenPayload {
  access_token: string;
  refresh_token: string;
  expireTime: number;
  refresh_expireTime: number;
}

type AuthenticatorStatus =
  | {
      type: "initial";
    }
  | {
      type: "authenticating";
      result: Promise<AccessToken>;
    }
  | {
      type: "authenticated";
      accessToken: AccessToken;
    }
  | {
      type: "failed";
      error: unknown;
    };

export class Authenticator {
  private status: AuthenticatorStatus = { type: "initial" };

  constructor(
    private credentials: MillCredential,
    private apiURL: string,
    private agent?: Agent
  ) {}

  async authenticate() {
    let accessToken = await this.retrieveAccessToken();
    return [["access_token", `${accessToken.access_token}`]];
  }

  private async retrieveAccessToken(): Promise<AccessToken> {
    switch (this.status.type) {
      case "authenticating":
        return await this.status.result;
      case "authenticated":
        if (new Date() < this.status.accessToken.expireTime) {
          return this.status.accessToken;
        }
    }
    let result = this.refresh();
    this.status = { type: "authenticating", result };
    try {
      let accessToken = await result;
      this.status = { type: "authenticated", accessToken };
      return accessToken;
    } catch (error) {
      this.status = { type: "failed", error };
      return Promise.reject(error);
    }
  }

  private async refresh() {
    let authCodeResponse = await fetch(`${this.apiURL}/share/applyAuthCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        access_key: this.credentials.access_key,
        secret_token: this.credentials.secret_token,
      },
      agent: this.agent,
    });
    let codePayload =
      (await authCodeResponse.json()) as Result<AuthorizationCode>;
    if (codePayload.success === false) {
      return Promise.reject(new Error(codePayload.message));
    }
    let response = await fetch(`${this.apiURL}/share/applyAccessToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization_code: codePayload.data.authorization_code,
      },
      body: new URLSearchParams({
        username: this.credentials.username,
        password: this.credentials.password,
      }),
      agent: this.agent,
    });
    let payload = (await response.json()) as Result<TokenPayload>;
    if (payload.success === false) {
      return Promise.reject(new Error(payload.message));
    }
    if (payload && payload && payload.data.expireTime) {
      try {
        let parts = payload.data.access_token.split(".");
        let decoded = Buffer.from(parts[1], "base64").toString();
        let accessToken = {
          payload: JSON.parse(decoded),
          access_token: payload.data.access_token,
          refresh_token: payload.data.refresh_token,
          expireTime: new Date(payload.data.expireTime),
          refresh_expireTime: new Date(payload.data.refresh_expireTime),
            Date.now() + payload.data.refresh_expireTime * 1000
          ),
        };
        return accessToken;
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(new Error("Unknown payload"));
  }
}
